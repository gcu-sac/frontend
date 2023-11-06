"use client";
import React, { useState } from 'react';
import axios from 'axios';

function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState(''); // setLoginMessage 상태 정의

  const handleLogin = async () => { //로그인 처리를 수행
    try {
        
        const response = await onGetUser(); // 서버로 로그인 요청을 보내는 부분
        
        if (response.status === 200) {
          setLoginMessage('로그인 성공!');
        }
      } catch (error) {
        setLoginMessage('로그인 실패: ' + error);
      }
  };

  const onGetUser = async () => { //jwt서버로 로그인 토큰 정보 보냄
    try{
        const res = await axios.get('/user/login', {
            headers: {
                'jwt-auth-token': localStorage.jwtAuthToken, // localStorage에 저장되어 있던 토큰을 header에 담아서 전송
            },
        });
        return res; //Axios로 실제 서버로부터 응답을 반환
    }catch(error){
        throw error;
    }
  };

  const loginContainerStyle: React.CSSProperties = {
    width: '300px',
    height: '300px',
    margin: '0 auto',
    marginTop: '50vh', // 수직 가운데 정렬
    transform: 'translateY(-50%)', // 박스를 수직으로 중앙 정렬
    padding: '20px',
    border: '1px solid #ccc',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
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
      <button
        onClick={handleLogin}
        style={buttonStyle}
        onMouseEnter={() => buttonStyle.backgroundColor = buttonHoverStyle.backgroundColor}
        onMouseLeave={() => buttonStyle.backgroundColor = buttonStyle.backgroundColor}
      >
        Log In
      </button>
    </div>
  );
}

export default Page;