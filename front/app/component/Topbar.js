import React from 'react';
import Link from 'next/link';

const TopBar = () => {
  return (
    <div style={topBarStyle}>
      <div style={buttonContainerStyle}>
        <Link href="../calendar" as="../calendar"legacyBehavior>
            <a style={buttonStyle}>Calendar</a>
        </Link>
        <Link href="../community" as="../community" legacyBehavior>
          <a style={buttonStyle}>Community</a>
        </Link>
        <Link href="../user/login" as="../user/login" legacyBehavior>
          <a style={buttonStyle}>LogIn</a>
        </Link>
        <Link href="../user/signup" as="../user/signup" legacyBehavior>
          <a style={buttonStyle}>Sign-Up</a>
        </Link>
      </div>
    </div>
  );
};

const topBarStyle = {
  backgroundColor: 'black',
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
  position: 'fixed',
  top: '0',
  width: '100%',
};

const buttonContainerStyle = {
  textAlign: 'center',
};

const buttonStyle = {
  backgroundColor: 'transparent',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '0 10px', // 각 버튼 사이의 간격을 조절
  textDecoration: 'none',
};

export default TopBar;
