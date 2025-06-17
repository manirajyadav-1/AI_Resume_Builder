import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { userDetails } = useAuth();
  return <div className="flex items-center justify-center h-screen">
    <div>
        <img src={userDetails.picture || "https://randomuser.me/api/portraits/lego/5.jpg"} />
        <p>{userDetails.name}</p>
        <p>{userDetails.email}</p>
    </div>
  </div>;
};

export default Dashboard;
