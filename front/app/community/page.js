import TopBar from '../component/Topbar';
import React from 'react';
import Link from 'next/link';

const CommunityPage = () => {
  const containerStyle = {
    marginTop: '50px', // 상단 여백 설정
    textAlign: 'center', // 텍스트 가운데 정렬
  };

  const posts = [ //임시 포스트.
    { id: 1, title: "12월에 미국 감", content: "이것은 첫 번째 게시물의 내용입니다.", writer: "kim" },
    { id: 2, title: "국내여행 갈만한 곳", content: "이것은 두 번째 게시물의 내용입니다.", writer: "lee" },
    // 다른 게시물 추가
  ];

  return (
    <>    
        <TopBar />

        <form style={containerStyle}>
        </form>

        <h1 style={{textAlign: 'center'}}>게시글 목록</h1>

        <div style={{ textAlign: 'center', border: '1px solid #000', padding: '10px', marginLeft: '20%', marginRight: '20%', borderRadius: '30px'}}>
            
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {posts.map((post) => (
                <li key={post.id} style={{ margin: '10px 0' }}>
                    <p>
                        <span style={{fontWeight: 'bold'}}>제목:&nbsp;</span>
                        <Link href={`/community/article/${post.id}`} legacyBehavior>
                            <a style={{textDecoration: 'none'}}>{post.title}</a>
                        </Link>
                        
                        <span style={{fontWeight: 'bold'}}>&nbsp;&nbsp;작성자:&nbsp;</span>
                        
                        <a>{post.writer}</a>
                    </p>
                </li>
                ))}
            </ul>
        </div>
    </>
  );
}

export default CommunityPage;
