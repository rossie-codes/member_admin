"use client";

import { useState } from "react";
import { Input, Button, Card, Tabs } from "antd";
import NumPad from "@/components/NumPad";
import { UserOutlined } from "@ant-design/icons";

const LoginPage = () => {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedTab, setSelectedTab] = useState("storeStaff");

  const handleInput = (value: string) => {
    console.log("NumPad Input:", value);
    setInput(value);
  };

  const handleLogin = async () => {
    try {
      console.log("Logging in with input:", input || username);

      const payload =
        selectedTab === "storeStaff" ? { input } : { username, password };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/login_handle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        console.log("Login Success");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-b from-white to-gray-100">
      <div className="w-full max-w-sm">
        <Card className="w-full shadow-2xl p-6 rounded-2xl bg-white min-h-[500px] flex flex-col">
          <div className="flex justify-between bg-gray-200 p-1 rounded-xl mb-4 shadow-inner">
            <button
              className={`w-1/2 text-center py-2 rounded-xl transition-all duration-300 ${
                selectedTab === "storeStaff"
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedTab("storeStaff")}
            >
              員工登入
            </button>
            <button
              className={`w-1/2 text-center py-2 rounded-xl transition-all duration-300 ${
                selectedTab === "admin"
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedTab("admin")}
            >
              管理員登入
            </button>
          </div>

          <div className="flex-1 flex flex-col h-full w-full">
            {selectedTab === "storeStaff" ? (
              <div className="flex-1 flex items-center justify-center">
                <NumPad onInput={handleInput} onLogin={handleLogin} />
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center w-full">
                {/* 未來換成 客戶Logo */}
                <div className="w-24 h-24 flex items-center justify-center mt-8 mb-12">
                  <UserOutlined className="text-9xl text-gray-500" />
                </div>
                <div className="w-full flex flex-col gap-4">
                  <Input
                    placeholder="帳戶名稱"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="rounded-lg p-2"
                  />
                  <Input.Password
                    placeholder="帳戶密碼"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-lg p-2"
                  />
                  <Button
                    type="primary"
                    block
                    className="h-10 mt-3"
                    onClick={handleLogin}
                  >
                    管理員登入
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
