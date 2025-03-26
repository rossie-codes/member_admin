"use client";
import { useState } from "react";
import { Card, Button, Table, Input, Modal, Select } from "antd";
import { useRouter } from "next/navigation";
import {
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
  SearchOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const CustomerPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample Data
  const customers = [
    {
      key: "1",
      phone: "1234567890",
      stampCount: 5,
      stampCards: 2,
      redeemed: 3,
      pending: 2,
    },
    {
      key: "2",
      phone: "0987654321",
      stampCount: 10,
      stampCards: 4,
      redeemed: 6,
      pending: 4,
    },
    {
      key: "3",
      phone: "0987654323",
      stampCount: 10,
      stampCards: 4,
      redeemed: 6,
      pending: 4,
    },
    {
      key: "4",
      phone: "0987654324",
      stampCount: 10,
      stampCards: 4,
      redeemed: 6,
      pending: 4,
    },
    {
      key: "5",
      phone: "0987654325",
      stampCount: 10,
      stampCards: 4,
      redeemed: 6,
      pending: 4,
    },
    {
      key: "6",
      phone: "0987654326",
      stampCount: 10,
      stampCards: 4,
      redeemed: 6,
      pending: 4,
    },
    {
      key: "6",
      phone: "0987654326",
      stampCount: 10,
      stampCards: 4,
      redeemed: 6,
      pending: 4,
    },
    {
      key: "7",
      phone: "0987654327",
      stampCount: 10,
      stampCards: 4,
      redeemed: 6,
      pending: 4,
    },
    {
      key: "8",
      phone: "0987654328",
      stampCount: 10,
      stampCards: 4,
      redeemed: 6,
      pending: 4,
    },
    {
      key: "9",
      phone: "0987654329",
      stampCount: 10,
      stampCards: 4,
      redeemed: 6,
      pending: 4,
    },
    {
      key: "10",
      phone: "0987654330",
      stampCount: 10,
      stampCards: 4,
      redeemed: 6,
      pending: 4,
    },
    {
      key: "11",
      phone: "0987654331",
      stampCount: 10,
      stampCards: 4,
      redeemed: 6,
      pending: 4,
    },
  ];

  // Filtered Data Based on Search
  const filteredCustomers = customers.filter((customer) =>
    customer.phone.includes(searchTerm)
  );

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-md mx-auto">
      <div className="text-2xl font-bold text-gray-800 mb-2">顧客管理</div>
      <div className="flex w-full items-center gap-2">
        <Input
          placeholder="搜尋電話號碼"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<SearchOutlined className="text-gray-400" />}
          className="flex-grow py-2 px-4 rounded-lg shadow-sm border border-gray-300"
        />
        <Button
          type="primary"
          className="px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-600"
          onClick={() => setIsModalVisible(true)}
        >
          <PlusOutlined className="text-lg" /> 新增
        </Button>
      </div>
      <Modal
        title="即將推出"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            關閉
          </Button>,
        ]}
      >
        此功能即將推出，敬請期待！
      </Modal>
      <div
        className="w-full overflow-y-auto mt-4 space-y-3 pb-20"
        style={{ maxHeight: "75vh" }}
      >
        {filteredCustomers.map((customer) => (
          <Card
            key={customer.key}
            className="w-full p-3 shadow-md rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push(`/admin/customer/${customer.key}`)}
          >
            <div className="flex items-center gap-2 text-lg font-bold text-blue-600 mb-2">
              <PhoneOutlined />
              {customer.phone}
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-gray-700 text-base">
              <div className="flex justify-between">
                <span className="text-gray-500">印花數量</span>
                <span className="font-semibold">{customer.stampCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">印花卡數量</span>
                <span className="font-semibold">{customer.stampCards}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">已兌換數量</span>
                <span className="font-semibold text-green-600">
                  {customer.redeemed}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">未兌換數量</span>
                <span className="font-semibold text-red-500">
                  {customer.pending}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="fixed bottom-16 w-full max-w-md px-4 bg-white py-3 shadow-lg flex justify-between items-center">
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

export default CustomerPage;
