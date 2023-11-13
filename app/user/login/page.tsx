"use client";

import React, { useContext, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { BASE_URL_AUTH, login_link } from "@/app/links";
import Cookies from "js-cookie";
import { UserContext } from "@/app/context/user";

function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(UserContext);

  const handleLogin = async () => {
    //로그인 처리를 수행
    try {
      const response = await onGetUser(); // 서버로 로그인 요청을 보내는 부분

      if (response.status === 200) {
        console.log("로그인 성공!");
        // 토큰을 쿠키에 저장
        Cookies.set("jwtAuthToken", response.headers["jwt-auth-token"], {
          secure: true,
          sameSite: "strict",
        });
        // 다른 필요한 정보도 함께 저장 가능
        Cookies.set("username", username, { secure: true, sameSite: "strict" });

        axios.get(BASE_URL_AUTH, { withCredentials: true }).then((res) => {
          setUser(res.data);
          console.log(res.data);
        });

        window.location.href = "../../"; //로그인 완료 후 메인 화면으로 이동
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onGetUser = async () => {
    //jwt서버로 로그인 토큰 정보 보냄
    try {
      const res = await axios.post(login_link, {
        id: username,
        password: password,
      });
      return res; //Axios로 실제 서버로부터 응답을 반환
    } catch (error) {
      throw error;
    }
  };

  const loginContainerStyle: React.CSSProperties = {
    width: "300px",
    height: "300px",
    margin: "0 auto",
    marginTop: "50vh", // 수직 가운데 정렬
    transform: "translateY(-50%)", // 박스를 수직으로 중앙 정렬
    padding: "20px",
    border: "1px solid #ccc",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  return (
    <div style={loginContainerStyle}>
      <h1>Login</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
      </div>
      <Button onClick={handleLogin} variant="contained">
        Log In
      </Button>
    </div>
  );
}

export default Page;
