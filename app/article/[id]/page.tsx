"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import axios from "axios";
import Cookies from "js-cookie";
import {useState} from 'react';
import { TextField } from "@mui/material";

export default function Page({ params }: { params: { id: number } }) {
  const posts = 
    //임시 포스트.
    {
      id: 1,
      title: "12월에 미국 감",
      content: "이것은 첫 번째 게시물의 내용입니다.",
      writer: "kim",
    };

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(posts.title);
  const [editedContent, setEditedContent] = useState(posts.content);

  function getCookieValue(cookieName: string) {
    const cookieValue = Cookies.get(cookieName);
    return cookieValue || "";
  }

  const handleDeletePush = () => { //게시글 삭제
    axios.delete("delete url"+ `/${posts.id}`, {
      headers:{
        token: getCookieValue("jwtAuthToken"),
      }
    })
  };

  const handleModify = () => {
    setIsEditing(true);
  }

  const handleModifyPush = () => { //게시글 수정
    axios.put("modify url" + `/${posts.id}`, {
        headers: {
          token: getCookieValue("jwtAuthToken"),
        },
        posts: {
          title: posts.title,
          content: posts.content,
          writer: posts.writer
        }
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "space-around", margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginTop: '5vh' }}>
        {isEditing ? (
          <TextField
            type="text"
            multiline
            style={{ width: '50%' }}
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          posts.title
        )}
      </h1>
      <div style={containerStyle}>
        {isEditing ? (
          <TextField
            value={editedContent}
            multiline
            minRows={10}
            style={{ width: '100%' }}
            onChange={(e) => setEditedContent(e.target.value)}
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
      {!isEditing && ( // 수정 모드가 아닌 경우에만 버튼 보이기
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
