import TopBar from '../component/Topbar';
import React from 'react';



const CalendarPage = () => {

  const containerStyle = {
    marginTop: '35px' // 상단 10px 여백 설정
  };

  return (
    <>    
        <TopBar />

        <form style={containerStyle}>
            <h2>Calendar</h2>
        </form>
      
    </>
  )
}

export default CalendarPage;

