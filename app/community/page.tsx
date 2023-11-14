"use client";

import React from "react";
import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from 'next/link';
import { BASE_URL_COMMUNITY } from "../links";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Cookies from "js-cookie";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

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

  function getCookieValue(cookieName: string) {
    const cookieValue = Cookies.get(cookieName);
    return cookieValue || "";
  }

  const handleAddPost = () => {
    setOpenDialog(true);
  }

  const handleSavePost = () => { //새 게시글 추가 요청
    
    axios.post(`${BASE_URL_COMMUNITY}/article`, {
      name: getCookieValue("username"),
      title: newPostTitle,
      content: newPostContent
    }).then((response) => {
      // 요청 성공 시
      console.log("Event add successfully:", response.data);
      setOpenDialog(false);
      fetchData(); 
    })
    .catch((error) => {
      console.error("Error editing event:", error);
    });

    
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log("요청test")
    axios.get(`${BASE_URL_COMMUNITY}/article`)
    .then((response) => {
      // 요청 성공 시
      const modifiedData = response.data.articles.map((item: any) => ({
        ...item,
        id: item.idx // idx를 id로 사용
      }));
      setPosts(modifiedData);
    })
    .catch((error) => {
      console.error("Error editing event:", error);
    });
  };
  
  const columns: GridColDef[] = [
    { field: 'id', headerName: '번호', width: 100 },
    {
      field: 'title',
      headerName: '제목',
      width: 300,
      renderCell: (params) => (
        <Link href={`/article/${params.row.id}`} style={{ color: 'black', textDecoration: 'none' }} passHref>
          <div>{params.value}</div>
        </Link>
      ),
    },
    { field: 'name', headerName: '작성자', width: 150 },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: '0 auto'
      }}
    >
      <h1 style={{ textAlign: "center" }}>게시글 목록</h1>
      <Button onClick={handleAddPost}>게시글 추가</Button>
      <DataGrid
        rows={posts}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        pageSizeOptions={[10]}
      ></DataGrid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>새로운 게시글 추가</DialogTitle>
        <DialogContent>
          <TextField
            label="게시글 제목"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="게시글 내용"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>취소</Button>
          <Button onClick={handleSavePost} color="primary">저장</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CommunityPage;
