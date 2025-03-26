"use client";
// import { useState } from "react";
import { Card, Button, DatePicker } from "antd";
import {
  Stamp,
  DollarSign,
  TrendingUp,
  Users,
  Ticket,
  BarChart,
  TicketCheck,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const sampleData = [
  { name: "週一", value: 40 },
  { name: "週二", value: 60 },
  { name: "週三", value: 50 },
  { name: "週四", value: 80 },
  { name: "週五", value: 100 },
  { name: "週六", value: 30 },
  { name: "週日", value: 70 },
];

const DashboardPage = () => {
  return (
    <div className="flex flex-col items-center p-4 gap-2 w-full max-w-md mx-auto min-h-screen pb-32">
      <div className="fixed top-0 left-0 right-0 bg-[#eef1f6] z-30 flex flex-col items-center shadow-md">
        <div className="h-14 flex items-center justify-center text-2xl font-bold text-gray-800 w-full">
          主頁
        </div>
        <div className="flex w-full gap-2 px-4 pb-2 max-w-md">
          <DatePicker className="flex-1" placeholder="選擇日期範圍" />
          <Button type="default">快速選擇日期</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full pt-24">
      <Card className="flex flex-col items-center justify-center h-28 rounded-lg text-center shadow-md border border-gray-300">          <div className="text-gray-500 text-base flex items-center gap-2 min-w-[140px] whitespace-nowrap justify-center">
            <Stamp size={20} className="flex-shrink-0" />
            <span>發出印花數量</span>
          </div>
          <div className="text-3xl font-bold text-blue-600 mt-2 flex justify-center items-baseline gap-1">
            <span>3500</span>
          </div>
        </Card>

        <Card className="flex flex-col items-center justify-center h-28 rounded-lg text-center shadow-md border border-gray-300">          <div className="text-gray-500 text-base flex items-center gap-2 min-w-[140px] whitespace-nowrap justify-center">
            <DollarSign size={20} className="flex-shrink-0" />
            <span>平均訂單價格</span>
          </div>
          <div className="text-3xl font-bold text-green-600 mt-2 flex justify-center items-baseline gap-1">
            <span>HK$</span>
            <span>120.5</span>
          </div>
        </Card>
      </div>



      <div className="grid grid-cols-2 gap-2 w-full">

      <Card className="flex flex-col items-center justify-center h-28 rounded-lg text-center shadow-md border border-gray-300 col-span-2">
        <div className="text-gray-500 text-base flex items-center justify-center gap-2">
          <TrendingUp size={20} /> 營業額
        </div>
        <div className="text-3xl font-bold text-orange-500 mt-2">
          HK$ 58,400
        </div>
      </Card>
        <Card className="flex flex-col items-center justify-center h-28 rounded-lg text-center shadow-md border border-gray-300">
          <div className="text-gray-500 text-base flex items-center gap-2">
            <Users size={20} /> 新登記人數
          </div>
          <div className="text-4xl font-bold mt-2">120</div>
        </Card>
        <Card className="flex flex-col items-center justify-center h-28 rounded-lg text-center shadow-md border border-gray-300">
          <div className="text-gray-500 text-base flex items-center gap-2">
            <Ticket size={20} /> 兌換數量
          </div>
          <div className="text-4xl font-bold mt-2">850</div>
        </Card>
        <Card className="flex flex-col items-center justify-center h-28 rounded-lg text-center shadow-md border border-gray-300 col-span-2">
          <div className="text-gray-500 text-base flex items-center gap-2">
            <TicketCheck size={20} /> 在外可兌換數量
          </div>
          <div className="text-4xl font-bold mt-2">300</div>
        </Card>
      </div>


      <Card 
  className="w-full h-56 text-center shadow-md rounded-lg bg-white"
  styles={{ body: { paddingTop: "20px", paddingBottom: "20px" } }}
>
  <div className="text-gray-500 text-base flex items-center justify-center gap-1">
    <BarChart size={20} /> 印花卡成效追蹤
  </div>

  <div className="h-40 w-full mt-2 flex items-center justify-center">
    <ResponsiveContainer width="100%" height={160}> 
      <LineChart 
        data={sampleData} 
        margin={{ top: 15, right: 30, left: 10, bottom: 20 }}
      >
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12, fill: "#4B5563", fontWeight: "500" }} 
          tickLine={false} 
          axisLine={false} 
          dy={5} 
        />
        <YAxis 
          tick={{ fontSize: 12, fill: "#4B5563", fontWeight: "500" }} 
          width={40} 
          axisLine={false} 
          tickLine={false}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "none", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }} 
          itemStyle={{ color: "#2563eb", fontWeight: "500" }} 
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#2563eb" 
          strokeWidth={3} 
          dot={{ r: 5, fill: "#2563eb" }} 
          activeDot={{ r: 7, strokeWidth: 2, stroke: "#2563eb" }} 
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</Card>













    </div>
  );
};

export default DashboardPage;
