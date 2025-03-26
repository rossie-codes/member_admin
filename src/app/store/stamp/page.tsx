// src/app/store/stamp/page.tsx

"use client";
import { Button, Card, Modal } from "antd";
import NumPad from "@/components/NumPad";
import { QrcodeOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useState } from "react";

const StampPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [action, setAction] = useState("");

  const showConfirm = (type: string) => {
    setAction(type);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="flex flex-col justify-center items-center bg-white min-h-screen p-6">
      <div className="w-full max-w-md">
        <Card className="w-full p-6 shadow-lg rounded-lg">
          <Button
            type="default"
            className="text-lg w-full flex items-center justify-center mb-4 py-4 rounded-lg bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-all font-bold text-xl"
          >
            <QrcodeOutlined className="mr-2  text-xl" /> 掃描二維碼
          </Button>

          <NumPad onInput={() => {}} onLogin={() => {}} />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button
              type="primary"
              className="text-lg w-full py-3 rounded-lg bg-blue-500 text-white shadow-md hover:bg-blue-500 transition-all flex items-center justify-center gap-1"
              onClick={() => showConfirm("增加")}
            >
              <PlusOutlined /> 增加印花
            </Button>
            <Button
              type="default"
              className="text-lg w-full py-3 rounded-lg border border-blue-500 text-blue-400 shadow-md hover:bg-blue-100 transition-all flex items-center justify-center gap-1"
              onClick={() => showConfirm("減少")}
            >
              <MinusOutlined /> 減少印花
            </Button>
          </div>
        </Card>
      </div>

      <Modal
        title={`確認${action}印花？`}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        centered
      ></Modal>
    </div>
  );
};

export default StampPage;
