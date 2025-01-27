import { useState } from "react";
import SetInfo from "../components/settings/SetInfo.jsx";
import SetAcc from "../components/settings/SetAcc.jsx";

export default function SettingPage() {
    // 用于存储当前显示的内容
    const [activeTab, setActiveTab] = useState("info");

    // 渲染对应的组件
    const renderContent = () => {
        switch (activeTab) {
            case "info":
                return <SetInfo />;
            case "account":
                return <SetAcc />;
            default:
                return <div>Select an option from the left menu</div>;
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* 左侧菜单 */}
            <div className="w-1/4 bg-gray-200 p-4">
                <h2 className="text-lg font-bold mb-4">Settings</h2>
                <button
                    className={`block w-full text-left px-4 py-2 mb-2 rounded ${
                        activeTab === "info" ? "bg-blue-500 text-white" : "bg-white"
                    }`}
                    onClick={() => setActiveTab("info")}
                >
                    Personal Info
                </button>
                <button
                    className={`block w-full text-left px-4 py-2 rounded ${
                        activeTab === "account" ? "bg-blue-500 text-white" : "bg-white"
                    }`}
                    onClick={() => setActiveTab("account")}
                >
                    Account Settings
                </button>
            </div>

            {/* 右侧内容 */}
            <div className="w-3/4 bg-white p-6">{renderContent()}</div>
        </div>
    );
}
