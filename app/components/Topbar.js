'use client'
import Link from "next/link";
import { UserContextProvider } from "../context/user";
import Button from '@mui/material/Button';

const TopBar = () => {
  return (
    <UserContextProvider>
      <div style={topBarStyle}>
        <div style={buttonContainerStyle}>
          <Link href="../calendar" as="../calendar" legacyBehavior>
            <Button variant="text" color="primary" style={buttonStyle}>Calendar</Button>
          </Link>
          <Link href="../community" as="../community" legacyBehavior>
            <Button variant="text" color="primary" style={buttonStyle}>Community</Button>
          </Link>
          <Link href="../user/login" as="../user/login" legacyBehavior>
            <Button variant="text" color="primary" style={buttonStyle}>Login</Button>
          </Link>
          <Link href="../user/signup" as="../user/signup" legacyBehavior>
            <Button variant="text" color="primary" style={buttonStyle}>Signup</Button>
          </Link>
        </div>
      </div>
    </UserContextProvider>
  );
};

const topBarStyle = {
  backgroundColor: "white",
  padding: "10px",
  display: "flex",
  justifyContent: "center",
  position: "fixed",
  top: "0",
  width: "100%",
};

const buttonContainerStyle = {
  textAlign: "center",
};

const buttonStyle = {
  backgroundColor: "transparent",
  color: "black",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  margin: "0 10px", // 각 버튼 사이의 간격을 조절
  // textDecoration: "none",
};

export default TopBar;
