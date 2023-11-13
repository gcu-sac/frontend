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
  });

  const fetchData = async () => {
    try {
      console.log("테스트")
      const response = await axios.get(`${BASE_URL_COMMUNITY}/article`); //처음 실행시 모든 게시글을 불러옴.
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const columns: GridColDef[] = [
    { field: 'idx', headerName: '번호', width: 100 },
    {
      field: 'title',
      headerName: '제목',
      width: 300,
      renderCell: (params) => (
        <Link href={`/article/${params.row.idx}`} style={{ color: 'black', textDecoration: 'none' }} passHref>
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
        pageSizeOptions={[5]}
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
