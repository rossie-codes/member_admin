"use client";
import { useState, useRef } from "react";
import { Card, Button, Input, Upload, Modal } from "antd";
import {
  UploadOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";

const AdminSettingPage = () => {
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginCode, setLoginCode] = useState("");
  const [logo, setLogo] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropModalVisible, setIsCropModalVisible] = useState(false);

  // Handle file upload
  const handleUpload = (info: any) => {
    const file = info.file; // Use info.file directly

    if (!file) {
      console.error("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        setImageSrc(e.target.result as string);
        setIsCropModalVisible(true);
      }
    };
    reader.readAsDataURL(file);
  };
  // Save cropped image
  const handleCropComplete = async () => {
    if (imageSrc && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        600,
        600
      );
      setLogo(croppedImage);
      setIsCropModalVisible(false);
    }
  };

  // 檢查是否所有欄位都已填寫
  const isFormValid = companyName && password && confirmPassword && loginCode;

  return (
    <div className="flex flex-col items-center p-4 gap-4 w-full max-w-sm mx-auto min-h-screen">
      <div className="w-full text-center text-2xl font-bold text-gray-800 pb-2 border-b">
        設定
      </div>

      <Input
        placeholder="公司名稱"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className="py-2 px-4 rounded-lg shadow-sm border border-gray-300"
      />

      <div className="flex w-full gap-3 items-center justify-between bg-white p-3 rounded-lg shadow">
        <Upload
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleUpload}
        >
          <Button icon={<UploadOutlined />}>公司 Logo</Button>
        </Upload>
        {logo ? (
          <img
            src={logo}
            alt="Company Logo"
            className="w-auto max-h-24 object-contain border rounded-md"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
            無 Logo
          </div>
        )}
      </div>

      <Modal
        title="調整 Logo 尺寸"
        open={isCropModalVisible}
        onCancel={() => setIsCropModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsCropModalVisible(false)}>
            取消
          </Button>,
          <Button key="crop" type="primary" onClick={handleCropComplete}>
            確認裁剪
          </Button>,
        ]}
      >
        <div className="relative w-full h-72 bg-gray-200">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, croppedAreaPixels) =>
                setCroppedAreaPixels(croppedAreaPixels)
              }
            />
          )}
        </div>
      </Modal>

      <Input.Password
        placeholder="設定密碼"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        iconRender={(visible) =>
          visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
        }
        className="py-2 px-4 rounded-lg shadow-sm border border-gray-300"
      />
      <Input.Password
        placeholder="確認密碼"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        iconRender={(visible) =>
          visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
        }
        className="py-2 px-4 rounded-lg shadow-sm border border-gray-300"
      />

      <Input
        placeholder="設定登入碼"
        value={loginCode}
        onChange={(e) => setLoginCode(e.target.value)}
        className="py-2 px-4 rounded-lg shadow-sm border border-gray-300"
      />

      <Button
        type="primary"
        className={`w-full py-3 text-lg rounded-lg ${
          isFormValid
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!isFormValid}
      >
        保存設定
      </Button>
    </div>
  );
};

export default AdminSettingPage;
