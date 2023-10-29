"use client";

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const CommunityPage = () => {
  const posts = [
    //임시 포스트.
    {
      id: 1,
      title: "12월에 미국 감",
      content: "이것은 첫 번째 게시물의 내용입니다.",
      writer: "kim",
    },
    {
      id: 2,
      title: "국내여행 갈만한 곳",
      content: "이것은 두 번째 게시물의 내용입니다.",
      writer: "lee",
    },
    // 다른 게시물 추가
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "번호", width: 100 },
    { field: "title", headerName: "제목", width: 300 },
    { field: "writer", headerName: "작성자", width: 150 },
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
      <DataGrid
        rows={posts}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        pageSizeOptions={[5]}
      ></DataGrid>
    </div>
  );
};

export default CommunityPage;
