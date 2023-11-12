"use client";
import { UserContext, UserContextProvider } from "@/app/context/user";
import LinkButton from "../link-button/link-button";
import Image from "next/image";
import userImage from "../../public/user-profile.png";
import UserIcon from "../user-icon/user-icon";
import { useContext } from "react";

const NavBar = () => {

  const { user } = useContext(UserContext);

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
            height: "200px",
          }}
        >
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
    </UserContextProvider>
  );
};

export default NavBar;
