"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from '@mui/material';
import axios from "axios";
import Cookies from "js-cookie";
import {useState} from 'react';

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
    marginTop: '35vh', // 수직 가운데 정렬
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginTop: '5vh' }}>
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          posts.title
        )}
      </h1>
      <div style={containerStyle}>
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          posts.content
        )}
      </div>
      {isEditing ? (
        <Button onClick={handleModifyPush} variant="contained">
          저장
        </Button>
      ) : (
        <>
          <Button onClick={handleModify} variant="contained">
            수정
          </Button>
          <Button onClick={handleDeletePush} variant="contained">
            삭제
          </Button>
        </>
      )}
    </div>
  );
}
