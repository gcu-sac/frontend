// import TopBar from '../../../component/Topbar';
// import React from 'react';
// import Link from 'next/link';

// export default function Post({ post }) {
//   const containerStyle = {
//     marginTop: '50px',
//     textAlign: 'center',
//   };

//   return (
//     <>
//       <TopBar />
//       <form style={containerStyle}></form>

//         {post ? (
//           <>
//             <h1 style={{ textAlign: 'center' }}>{post.id}</h1>
//             <h2>{post.title}</h2>
//             <p>{post.content}</p>
//             <p>작성자: {post.writer}</p>
//           </>
//         ) : (
//           <p>Loading...</p>
//         )}
      
//     </>
//   );
// }

// export async function getServerSideProps(context) {

//   const apiUrl = '실제 URL 입력'; //백엔드에 URL 쏘면 json형식으로 게시글 정보 받아올 것이라 예상.

//   try {
//     const response = await fetch(apiUrl);
//     if (response.status !== 200) {
//       throw new Error('데이터 가져오기 실패');
//     }
//     const data = await response.json();

//     return {
//       props: {
//         post: data,
//       },
//     };
//   } catch (error) {
//     console.error('API 호출 중 오류 발생:', error);

//     return {
//       props: {
//         post: null, // 오류 처리를 위해 post를 null로 설정합니다.
//       },
//     };
//   }
// }
