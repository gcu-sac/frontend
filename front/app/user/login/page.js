import TopBar from '../../component/Topbar';
import React from 'react';

const LoginPage = () => {

  const containerStyle = {
    marginTop: '10%', // 상단 여백 설정
    textAlign: 'center',
  };

  const buttonStyle1 = {
    backgroundColor: 'yellow',
    border: 'none',
    borderRadius: '10px', // 모서리를 둥글게 
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: '2px solid black',
    
  };

  const buttonStyle2 = {
    backgroundColor: 'lime',
    border: 'none',
    borderRadius: '10px', // 모서리를 둥글게 
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: '2px solid black',
    
  };

  const linkStyle = {
    textDecoration: 'none', // 링크의 밑줄을 없앰
  };

  return (
    <>    
        <TopBar />

        <form style={containerStyle}>
            <h2>Login</h2>
        </form>

        <div style={{textAlign: 'center', marginTop: '5%', paddingTop: '5%', paddingBottom: '5%', border: '2px solid black', marginLeft: '35%', marginRight: '35%', borderRadius: '30px'}}>
          <a href="카카오톡으로 로그인 할 수 있도록 sso로그인 URL 입력" style={linkStyle}>
            <button style={buttonStyle1}>카카오톡으로 로그인</button>
          </a>
          <br />
          <br />
          <a href="네이버로 로그인 할 수 있도록 sso로그인 URL 입력" style={linkStyle}>
            <button style={buttonStyle2}>네이버로 로그인</button>
          </a>
        </div>
    </>
  )
}

export default LoginPage;
