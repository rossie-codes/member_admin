"use client";
import { useState } from "react";
import { Button, Input, DatePicker, Modal, InputNumber } from "antd";
import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";
import dayjs from "dayjs";

const AddNewStampCardPage = () => {
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState<dayjs.Dayjs | null>(null);
  const [totalStamps, setTotalStamps] = useState(10);
  const [rewardCount, setRewardCount] = useState(1);
  const [terms, setTerms] = useState("");

  const [activeRewardIndex, setActiveRewardIndex] = useState<number | null>(
    null
  );

  // Store reward data (name & image) dynamically
  const [rewardData, setRewardData] = useState<
    { name: string; image: string | null }[]
  >(Array.from({ length: rewardCount }, () => ({ name: "", image: null })));

  // Temporary state for editing
  const [tempRewardData, setTempRewardData] = useState<{
    name: string;
    image: string | null;
  }>({ name: "", image: null });

  // Image Crop States
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isCropModalVisible, setIsCropModalVisible] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // Open reward modal and set temp data
  const openRewardModal = (index: number) => {
    setActiveRewardIndex(index);
    setTempRewardData({ ...rewardData[index] }); // Copy current reward data
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the selected file
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      alert("❌ 只允許上傳 PNG, JPG, JPEG, GIF 檔案！");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert("❌ 檔案大小不能超過 5MB！");
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

  // Save cropped image temporarily
  const handleCropComplete = async () => {
    if (imageSrc && croppedAreaPixels !== null) {
      const croppedImg: string | null = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        1024,
        1024
      );
      setTempRewardData((prev) => ({ ...prev, image: croppedImg }));
      setIsCropModalVisible(false);
    }
  };

  // Save changes to reward data
  const handleSaveReward = () => {
    if (activeRewardIndex !== null) {
      setRewardData((prev) => {
        const updated = [...prev];
        updated[activeRewardIndex] = tempRewardData; // Save temp data to main state
        return updated;
      });

      setActiveRewardIndex(null); // Close modal
    }
    console.log("tempRewardData", tempRewardData);
    console.log("rewardData", rewardData);
  };

  // Cancel editing (reset temp data)
  const handleCancelReward = () => {
    setActiveRewardIndex(null); // Close modal without saving
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto relative">
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 flex items-center justify-between w-full px-4 py-3">
        <Button icon={<ArrowLeftOutlined />} onClick={() => history.back()}>
          返回
        </Button>
        <span className="text-lg font-bold text-gray-800">新增印花卡</span>
        <Button type="primary">發佈印花卡</Button>
      </div>

      <div className="w-full p-4 pt-20 pb-32">
        <div className="flex flex-col gap-2">
          <Input
            placeholder="印花卡名稱"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
          <DatePicker
            className="w-full"
            placeholder="到期日"
            value={expiryDate}
            onChange={(date) => setExpiryDate(date)}
          />
        </div>

        <div className="grid grid-cols-5 gap-2 p-4 border rounded-lg mt-4 bg-white shadow-md">
          {[...Array(totalStamps)].map((_, index) => (
            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded-full border text-sm font-bold ${
                index < rewardCount ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 w-full mt-4">
          <div>
            <p className="text-gray-600">滿點數量</p>
            <InputNumber
              className="w-full"
              min={1}
              max={50}
              value={totalStamps}
              onChange={(value) => value !== null && setTotalStamps(value)}
            />
          </div>
          <div>
            <p className="text-gray-600">獎勵數量</p>
            <InputNumber
              className="w-full"
              min={1}
              max={totalStamps}
              value={rewardCount}
              onChange={(value) => {
                if (value !== null) {
                  setRewardCount(value);
                  setRewardData(
                    Array.from({ length: value }, () => ({
                      name: "",
                      image: null,
                    }))
                  );
                }
              }}
            />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {rewardData.map((reward, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-white shadow-md"
            >
              <Button
                className="w-full bg-blue-500 text-white font-bold"
                onClick={() => openRewardModal(index)}
              >
                設定換領獎勵 {index + 1}
              </Button>

              <div className="flex items-center justify-between mt-2">
                <Input
                  className="flex-1 mr-2"
                  placeholder="獎勵名稱"
                  value={reward.name}
                  onChange={(e) =>
                    setRewardData((prev) => {
                      const updated = [...prev];
                      updated[index].name = e.target.value;
                      return updated;
                    })
                  }
                />

                {reward.image ? (
                  <img
                    src={reward.image}
                    alt="Reward"
                    className="w-12 h-12 rounded-md border"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 flex items-center justify-center text-gray-400 text-xs rounded-md border">
                    無圖片
                  </div>
                )}
              </div>
              <div className="mt-2">
                <Input className="w-full text-left" placeholder="印花位置" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <p className="text-gray-600">條款及細則</p>
          <Input.TextArea
            rows={4}
            placeholder="請輸入條款及細則..."
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
          />
        </div>
      </div>

      {activeRewardIndex !== null && (
        <Modal
          title={`設定獎勵 ${activeRewardIndex + 1}`}
          open={true}
          onCancel={handleCancelReward}
          centered
          footer={[
            <Button key="cancel" onClick={handleCancelReward}>
              取消
            </Button>,
            <Button key="save" type="primary" onClick={handleSaveReward}>
              保存
            </Button>,
          ]}
        >
          <p>獎勵名稱</p>
          <Input
            placeholder="輸入獎勵名稱"
            value={tempRewardData.name}
            onChange={(e) =>
              setTempRewardData((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <p className="mt-2">獎勵圖片</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            id="upload-file"
          />
          <Button
            icon={<UploadOutlined />}
            onClick={() => document.getElementById("upload-file")?.click()}
          >
            上傳圖片
          </Button>

          {tempRewardData.image && (
            <img
              src={tempRewardData.image}
              alt="Temp_Reward_Image"
              className="w-full mt-2 rounded-md"
            />
          )}
        </Modal>
      )}

      <Modal
        title="調整獎勵圖片尺寸"
        open={isCropModalVisible}
        onCancel={() => setIsCropModalVisible(false)}
        centered
        zIndex={1050}
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
    </div>
  );
};

export default AddNewStampCardPage;
