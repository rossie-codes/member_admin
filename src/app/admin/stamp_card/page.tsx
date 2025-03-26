"use client";
import { useState } from "react";
import { Button, Table, Card, Select } from "antd";
import { useRouter } from "next/navigation";
import { PlusOutlined, RightOutlined, LeftOutlined } from "@ant-design/icons";

const StampCardPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("current");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // Sample Data
  const stampCards = [
    {
      key: "1",
      name: "優惠印花卡",
      holders: 120,
      issued: 500,
      stamps: 2500,
    },
    {
      key: "2",
      name: "VIP 印花卡",
      holders: 80,
      issued: 300,
      stamps: 1500,
    },
    {
      key: "3",
      name: "VIP 印花卡3",
      holders: 80,
      issued: 300,
      stamps: 1500,
    },
    {
      key: "3",
      name: "VIP 印花卡3",
      holders: 80,
      issued: 300,
      stamps: 1500,
    },
    {
      key: "4",
      name: "VIP 印花卡4",
      holders: 80,
      issued: 300,
      stamps: 1500,
    },
    {
      key: "5",
      name: "VIP 印花卡5",
      holders: 80,
      issued: 300,
      stamps: 1500,
    },
  ];

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-md mx-auto relative">
      <div className="w-full px-4 py-3 flex justify-between items-center sticky top-0 z-10">
        <div className="text-2xl font-bold text-gray-800 mx-auto">
          印花咭管理
        </div>
        {/*新增按鈕在右上角 */}
        {/* 
        <Button
          type="primary"
          className="px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-600 absolute right-4"
          onClick={() => router.push("/admin/add_new_stamp_card")}
        >
          <PlusOutlined className="text-lg" /> 新增
        </Button>
        */}
      </div>

      <div className="w-full flex shadow-md sticky top-[56px] z-10 bg-white">
        <Button
          type="text"
          className={`text-lg font-semibold py-3 flex-1 rounded-none transition-all ${
            activeTab === "current"
              ? "bg-blue-500 text-white shadow-md"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("current")}
        >
          現有印花卡
        </Button>
        <Button
          type="text"
          className={`text-lg font-semibold py-3 flex-1 rounded-none transition-all ${
            activeTab === "expired"
              ? "bg-blue-500 text-white shadow-md"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("expired")}
        >
          已過期印花卡
        </Button>
      </div>

      <div
        className="w-full overflow-y-auto space-y-3 pb-24"
        style={{ maxHeight: "80vh" }}
      >
        {stampCards.map((card) => (
          <Card
            key={card.key}
            className="w-full p-4 shadow-md rounded-lg cursor-pointer hover:shadow-lg transition-shadow border border-gray-300"
            onClick={() => router.push(`/admin/stamp_card/${card.key}`)}
          >
            <div className="text-lg font-bold text-blue-600">{card.name}</div>

            <div className="grid grid-cols-3 gap-x-4 gap-y-1 text-gray-700 text-base mt-2">
              <div className="flex flex-col items-center">
                <span className="text-gray-500">持有人數</span>
                <span className="font-semibold">{card.holders}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-gray-500">發佈數量</span>
                <span className="font-semibold">{card.issued}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-gray-500">印花數量</span>
                <span className="font-semibold">{card.stamps}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Button
        type="primary"
        className="fixed bottom-28 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-lg hover:bg-blue-600 z-50"
        onClick={() => router.push("/admin/stamp_card/add_new_stamp_card")}
      >
        <PlusOutlined />
      </Button>

      <div className="fixed bottom-0 w-full max-w-md px-4 bg-white py-4 shadow-lg flex justify-between items-center pb-20">
        <Button
          icon={<LeftOutlined />}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-2"
        />
        <Select
          value={pageSize}
          onChange={(value) => setPageSize(value)}
          options={[
            { value: 10, label: "10" },
            { value: 20, label: "20" },
            { value: 50, label: "50" },
            { value: 100, label: "100" },
          ]}
          className="w-20"
        />
        <Button
          icon={<RightOutlined />}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-2"
        />
      </div>
    </div>
  );
};

export default StampCardPage;
