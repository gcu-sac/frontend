"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleSignUp = async () => { 
    try {
        console.log("id: ", username);
        console.log("password: ", password);
        console.log("email: ", email);
        console.log("nickname: ", nickname);
        
        const response = await onGetUser(); // 서버로 회원가입 요청을 보내는 부분
        
        if (response.status === 200) {
          console.log("회원가입 완료");
          setDialogOpen(true); // Open the dialog when registration is successful
        }
      } catch (error) {
        console.error(error); // 에러 처리
      }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false); // Close the dialog
    window.location.href = '../../user/login';
  };

  const onGetUser = async () => { //회원가입
    try{
        const res = await axios.post('https://sac.prod.cluster.yanychoi.site/api/auth/user/signup', {"id": username, "password": password, "email": email, "nickname": nickname});
        return res; //Axios로 실제 서버로부터 응답을 반환
    }catch(error){
        throw error;
    }
  };

  const loginContainerStyle: React.CSSProperties = {
    width: '300px',
    height: '350px',
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

  return (
    <div style={loginContainerStyle}>
      <h1>Sign Up</h1>
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
      <div>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <input
          type="nickname"
          placeholder="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={inputStyle}
        />
      </div>
      <Button
        onClick={handleSignUp}
        variant='contained'
      >
        Sign Up
      </Button>

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
      >
        <DialogTitle>회원가입 완료</DialogTitle>
        <DialogContent>
          <DialogContentText>
            회원가입 완료! 로그인 창으로 이동합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Page;