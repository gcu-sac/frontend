"use client";
import { UserContext, UserContextProvider } from "@/app/context/user";
import LinkButton from "../link-button/link-button";
import Image from "next/image";
import userImage from "../../public/user-profile.png";
import UserIcon from "../user-icon/user-icon";
import { useContext } from "react";
import Cookies from 'js-cookie';
import { Button } from "@mui/material";

const NavBar = () => {

  const { user } = useContext(UserContext);

  const handleLogout = () => {
    Cookies.remove('jwtAuthToken');
    window.location.href = '../../'; //로그아웃 완료 후 메인 화면으로 이동
  };

  return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "calc(100vh - 40px)",
          backgroundColor: "#f5f5f5",
          padding: "20px 50px",
          marginRight: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "200px",
          }}
        >
          {user && user.id ? ( // user.id에 값이 있나 없나로 로그인 판별
            <>
              <UserIcon />
              <LinkButton
                href="../../user/profile"
                as="../../user/profile"
                text={user.nickname}
                variant="contained"
              />
              <button onClick={handleLogout} className="contained" >
                LOGOUT
              </button>
              
            </>
          ) : (
            <>
              <UserIcon />
              <LinkButton
                href="../../user/login"
                as="../../user/login"
                text="Login"
                variant="contained"
              />
              <LinkButton
                href="../../user/signup"
                as="../../user/signup"
                text="Sign Up"
                variant="contained"
              />
            </>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "200px",
          }}
        >
          <LinkButton href="../" as="../" text="Calendar" />
          <LinkButton href="../community" as="../community" text="Community" />
        </div>
      </div>
  );
};

export default NavBar;
