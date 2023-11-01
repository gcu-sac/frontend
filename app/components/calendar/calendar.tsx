// "use client";
// import Calendar from "react-calendar";
// import { useState, useEffect } from "react";
// import "react-calendar/dist/Calendar.css";
// import axios from 'axios';

// const CalendarComponent = () => {
//   const [value, setValue] = useState<Date>(new Date());
//   const [data, setData] = useState(null); // API 응답 데이터를 저장할 상태

//   const onChange = (date: Date | Date[]) => {
//     if (Array.isArray(date)) {
//       return;
//     }
//     setValue(date as Date);
//   };

//   useEffect(() => {
//     console.log("렌더링 될때 작동")
//     console.log("value: ", value)

//     // 백엔드 API에서 데이터 가져오기
//     const fetchData = async ( date: Date ) => {
//       try {
//         // const response = await axios.get("api endpoint");
//         // setData(response.data);
//         // console.log(data);

//         // date를 기반으로 해당 월에 대한 데이터를 요청
//         console.log("Month: ", date.getMonth() + 1);
//         console.log("Year: ", date.getFullYear());
//         const response = await axios.get(`api endpoint?month=${date.getMonth() + 1}&year=${date.getFullYear()}`); //date객체에서 year, month를 추출
//         setData(response.data);
//         console.log(data);

//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData(value); // 페이지 렌더링 시 데이터 가져오기

//   }, [value]); //value가 바뀔때마다 실행 

//   return (
//     <Calendar
//       locale="ko"
//       onChange={(value, event) => onChange(value as Date)}
//       value={value}
//     />
//   );
// };

// export default CalendarComponent;

"use client";
import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import axios from 'axios';

const CalendarComponent = () => {
  const [value, setValue] = useState<Date>(new Date());
  const [data, setData] = useState(null);

  const onChange = (date: Date | Date[]) => {
    if (Array.isArray(date)) {
      return;
    }
    setValue(date as Date);
  };

  const onMonthChange = (date: Date) => {
    fetchData(date);
  };

  useEffect(() => {
    fetchData(value);
  }, []);

  const fetchData = async (date: Date) => {
    try {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      
      console.log("year: ", year);
      console.log("month: ", month);

      const endpoint = `api endpoint?month=${month}&year=${year}`;
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Calendar
        locale="ko"
        onChange={(value, event) => onChange(value as Date)}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate instanceof Date) { // 타입 가드를 사용하여 null 체크
            onMonthChange(activeStartDate);
          }
        }}
        value={value}
      />
    </div>
  );
};

export default CalendarComponent;

