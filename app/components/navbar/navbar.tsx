"use client";
import { UserContextProvider } from "@/app/context/user";
import LinkButton from "../link-button/link-button";
import Image from "next/image";
import userImage from "../../public/user-profile.png";
import UserIcon from "../user-icon/user-icon";

const NavBar = () => {
  return (
    <UserContextProvider>
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
            height: "160px",
          }}
        >
          <UserIcon />
          <LinkButton
            href="../user/login"
            as="../user/login"
            text="Login "
            variant="contained"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "200px",
          }}
        >
          <LinkButton href="../calendar" as="../calendar" text="Calendar" />
          <LinkButton href="../community" as="../community" text="Community" />
        </div>
      </div>
    </UserContextProvider>
  );
};

export default NavBar;
