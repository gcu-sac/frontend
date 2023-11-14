"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import axios from "axios";
import Cookies from "js-cookie";
import {useState, useEffect} from 'react';
import { TextField } from "@mui/material";
import { BASE_URL_COMMUNITY } from "@/app/links";

export default function Page({ params }: { params: { id: number } }) {
  function getCookieValue(cookieName: string) {
    const cookieValue = Cookies.get(cookieName);
    return cookieValue || "";
  }
   // 토큰 복호화 함수
   const decodeToken = (token: any) => {
    try {
      let payload = token.substring(token.indexOf('.')+1,token.lastIndexOf('.'));
      // Payload의 base64 디코딩
      const dec = Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64' as BufferEncoding);
      let decJson = JSON.parse(dec);
      return decJson;
    } catch (error) {
      console.error('토큰 복호화 에러:', error);
      return null;
    }
  };
  
  const [nick, setNick] = useState("");

  const [posts, setPosts] = useState({ //특정 게시글의 내용물이 담김
    idx: 0,
    name: "",
    title: "",
    content: "",
    date: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  // const [editedTitle, setEditedTitle] = useState(posts.title);
  // const [editedContent, setEditedContent] = useState(posts.content);

  

  const handleDeletePush = () => { //게시글 삭제
    axios.delete(`${BASE_URL_COMMUNITY}/article/${posts.idx}`, {
      headers:{
        token: getCookieValue("jwtAuthToken"),
      }
    })
    .then((response) =>{
      console.log("삭제 성공");
      window.location.href = "../../community";
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const handleModify = () => {
    setIsEditing(true);
  }

  const handleModifyPush = () => { //게시글 수정
    axios.put(`${BASE_URL_COMMUNITY}/article/${posts.idx}`, {
      title: posts.title,
      content: posts.content,
      }
    )
    .then((response) =>{
      setIsEditing(false);
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL_COMMUNITY}/article/${params.id}`); //처음 실행시 해당 id의 게시글을 불러옴
      setPosts(response.data);

      // 토큰 복호화
      const decodedToken = decodeToken(getCookieValue('jwtAuthToken'));
      if (decodedToken && typeof decodedToken === 'object' && 'user' in decodedToken) {
        setNick(decodedToken.user.nickname);
      } else {
        console.error('Invalid or expired token');
        // handle the case when the token is null or doesn't have the expected structure
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  const containerStyle: React.CSSProperties = {
    width: '500px',
    height: '400px',
    margin: '0 auto',
    // marginTop: '35vh', // 수직 가운데 정렬
    // transform: 'translateY(-50%)', // 박스를 수직으로 중앙 정렬
    padding: '20px',
    // border: '1px solid #ccc',
    textAlign: 'center',
    // backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const isAuthor = nick === posts.name; //로그인 유저와 게시글 글쓴 유저가 같은지 판별

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "space-around", margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginTop: '5vh' }}>
        {isEditing ? (
          <TextField
            type="text"
            multiline
            style={{ width: '50%' }}
            value={posts.title}
            onChange={(e) => setPosts({...posts, title: e.target.value})}
          />
        ) : (
          posts.title
        )}
      </h1>
      <div style={containerStyle}>
        {isEditing ? (
          <TextField
            value={posts.content}
            multiline
            minRows={10}
            style={{ width: '100%' }}
            onChange={(e) => setPosts({...posts, content: e.target.value})}
          />
        ) : (
          posts.content
        )}
        
      </div>
      {isEditing && ( // 수정 모드인 경우에만 '저장' 버튼 보이기
          <Button onClick={handleModifyPush} variant="text">
            저장
          </Button>
        )}
      {!isEditing && isAuthor && ( // 수정 모드가 아닌 경우, 글쓴이와 로그인 유저가 같은 경우에만 수정, 삭제 버튼 보이게.
        <div style={{ textAlign: 'center', marginTop: '2px' }}>
          <Button onClick={handleModify} variant="text" style={{ marginRight: '5px' }}>
            수정
          </Button>
          <Button onClick={handleDeletePush} variant="text">
            삭제
          </Button>
        </div>
      )}
    </div>
  );
  
}
