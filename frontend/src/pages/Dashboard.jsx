import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Cookies from "universal-cookie";

const Dashboard = () => {
  const { userDetails } = useAuth();
  const [resumeData, setResumeData] = useState(null);
  
  const cookies = new Cookies();
  const token = cookies.get("token");
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const config = {
          method: "GET",
          url: "http://localhost:8080/api/v1/resume/data",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // for OAuth2 session
        };

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await axios(config);
        setResumeData(response.data);
      } catch (error) {
        console.error("Error fetching resume data:", error.message);
      }
    };

    fetchResume();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-6 rounded shadow w-[400px] text-center">
        <img
          src={userDetails.picture || "https://randomuser.me/api/portraits/lego/5.jpg"}
          alt="profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <p className="text-xl font-semibold">{userDetails.name}</p>
        <p className="text-gray-600">{userDetails.email}</p>

        {resumeData ? (
          <div className="mt-6 text-left">
            <h3 className="font-bold text-lg">Resume Data:</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto mt-2 max-h-60">
              {JSON.stringify(JSON.parse(resumeData.contentJson), null, 2)}
            </pre>
            <p className="mt-2 text-sm text-gray-500">Template: {resumeData.templateType}</p>
          </div>
        ) : (
          <p className="mt-4 text-gray-500">No resume data found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
