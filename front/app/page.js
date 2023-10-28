import Image from 'next/image';
import TopBar from './component/Topbar';
import GettyImages from './public/GettyImages.jpg';
import styles from './globals.css';

export default function Home() {
  const containerStyle = {
    marginTop: '50px', // 상단 여백 설정
    textAlign: 'center', // 텍스트 가운데 정렬
  };

  const imageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, // 이미지를 화면 뒤쪽으로 보냄
  };

  return (
    <>
      <TopBar />
      <form style={containerStyle}></form>

      <div style={imageStyle}>
        <Image src={GettyImages} alt="GettyImages" layout="fill" objectFit="cover" />
      </div>
    </>
  )
}
