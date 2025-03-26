// src/app/store/redeem/page.tsx

"use client";
import { Button, Card, Modal } from "antd";
import NumPad from "@/components/NumPad";
import { useState } from "react";
import { QrcodeOutlined, EyeOutlined } from "@ant-design/icons";

const RedeemPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showConfirm = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="flex flex-col justify-center items-center bg-white min-h-screen p-6">
      <div className="w-full max-w-md">
        <Card className="w-full p-6 shadow-lg rounded-lg flex flex-col">
          <Button
            type="default"
            className="text-lg w-full flex items-center justify-center mb-4 py-4 rounded-lg bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-all font-bold text-xl"
          >
            <QrcodeOutlined className="mr-2 text-xl" /> 掃描二維碼
          </Button>

          <NumPad onInput={() => {}} onLogin={() => {}} />

          <div className="grid grid-cols-1 mt-4">
            <Button
              type="default"
              onClick={showConfirm}
              className="text-lg w-full py-3 rounded-lg border border-blue-500 text-blue-400 shadow-md hover:bg-blue-100 transition-all flex items-center justify-center gap-1"
            >
              <EyeOutlined className="mr-2" /> 檢視項目
            </Button>
          </div>
        </Card>
      </div>
      <Modal
        title="兌換確認"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        centered
        okText="確認兌換"
        cancelText="暫不兌換"
      >
        <p>請確認是否要兌換以下項目：</p>
        <ul className="list-disc pl-5">
          <li>兌換商品：優惠券 50 元折扣</li>
          <li>所需印花數：10 枚</li>
          <li>有效期限：2025/12/31</li>
        </ul>
      </Modal>
    </div>
  );
};

export default RedeemPage;
