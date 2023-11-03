"use client";
import Calendar from "react-calendar";
import { useState, useEffect, useRef } from "react";
import "react-calendar/dist/Calendar.css";
import axios from 'axios';

const CalendarComponent = () => {
  const [value, setValue] = useState<Date>(new Date());
  const [data, setData] = useState<Array<{ [key: string]: any }> | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    scheduleId: "",
    scheduleName: "",
    startTime: "",
    endTime: "",
    schedulDesc: "",
    groupId: ""
  });

  const modalRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  } 

  //일정 추가.
  const handleAddEvent = () => { //새 일정 추가 백엔드로 전송하는 부분
    axios.post('todo_endpoint', newEvent)
      .then(response => {
        // Handle success
        console.log("Event added successfully:", response.data);
        // Close the modal
        closeModal();
        // You might want to refetch data to update the calendar
        fetchData(value);
      })
      .catch(error => {
        console.log(newEvent);
        // Handle error
        console.error("Error adding event:", error);
      });
  }

  //일정 삭제
  const handleDeleteEvent = (scheduleId: number) => {
    // 백엔드로 일정 삭제 요청 보내기
    //scheduleId를 백엔드로 넘김. 백엔드에서는 Id조회해서 해당 데이터 지우면 될듯
    console.log("scheduleId: " + scheduleId);
    axios.delete(`delete_endpoint/${scheduleId}`)
      .then(response => {
        // Handle success
        console.log("Event deleted successfully:", response.data);
  
        fetchData(value);
      })
      .catch(error => {
        console.error("Error deleting event:", error);
      });
  };
  

  const onChange = (date: Date | Date[]) => {
    if (Array.isArray(date)) {
      return;
    }
    setValue(date as Date);
   
  };

  const onMonthChange = (date: Date) => {
    fetchData(date);
  };

  // 예제 데이터
  const responseExample = [
    {
      "scheduleId": 12,
      "scheduleName": "Event 12",
      "startTime": "2023-12-12T09:00:00",
      "endTime": "2023-12-12T10:00:00",
      "schedulDesc": "Description 12",
      "groupId": "GroupL"
    },
    {
      "scheduleId": 13,
      "scheduleName": "Event 13",
      "startTime": "2023-12-13T09:00:00",
      "endTime": "2023-12-13T10:00:00",
      "schedulDesc": "Description 13",
      "groupId": "GroupL"
    },
    {
      "scheduleId": 14,
      "scheduleName": "Event 14",
      "startTime": "2023-12-12T09:00:00",
      "endTime": "2023-12-12T10:00:00",
      "schedulDesc": "Description 14",
      "groupId": "GroupL"
    }
  ];

  useEffect(() => {
    fetchData(value);
  }, [value]);

  const fetchData = async (date: Date) => {
    try {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      
      console.log("year: ", year);
      console.log("month: ", month);
      console.log("selected date: ", value); //일자 나오는것 확인 완료. 아래 url을 통해 일정목록 받아오면 이 날짜와 비교해서 화면에 띄우면 될듯.

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
      <button onClick={openModal}>새 일정</button>
      <div style={{ display: "flex" }}>
        <ScheduleDisplay selectedDate={value} data={responseExample} handleDeleteEvent={handleDeleteEvent}/>{/*민기 쪽에서 넘어오는거 가능해지면 이거 responseExample을 data로 바꾸면 됨.*/}
      </div>
    
      {isModalOpen && (
        <div className="modal" ref={modalRef}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>새 일정 추가</h2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ width: '100px' }}>월:
                <input
                  type="text"
                  name="scheduleId"
                  value={newEvent.scheduleId}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ width: '100px' }}>일정 이름:
                <input
                  type="text"
                  name="scheduleName"
                  value={newEvent.scheduleName}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ width: '100px' }}>시작 시간:
                <input
                  type="text"
                  name="startTime"
                  value={newEvent.startTime}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ width: '100px' }}>끝나는 시간:
                <input
                  type="text"
                  name="endTime"
                  value={newEvent.endTime}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ width: '100px' }}>내용:
                <input
                  type="text"
                  name="schedulDesc"
                  value={newEvent.schedulDesc}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ width: '100px' }}>그룹 ID:
                <input
                  type="text"
                  name="groupId"
                  value={newEvent.groupId}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <button onClick={handleAddEvent}>일정 추가</button>
          </div>
        </div>
      )}

    </div>
  );
};

const ScheduleDisplay = ({ selectedDate, data, handleDeleteEvent }: { selectedDate: Date | null; data: Array<{ [key: string]: any }> | null; handleDeleteEvent: (scheduleId: number) => void }) => {
  if (!selectedDate || !data) {
    return null;
  }

  const selectedDay = selectedDate.getDate(); //유저가 화면에서 고른 '날짜'를 저장.
  // 해당 일자와 일치하는 일정 찾기
  const selectedSchedules = data.filter(schedule => {
    const scheduleDate = new Date(schedule.startTime);
    return scheduleDate.getDate() === selectedDay;
  });

  return (
    <div>
      <h2>{selectedDay}일 일정</h2> {/* 일자 출력 */}
      {selectedSchedules.length > 0 ? (
        <ul>
          {selectedSchedules.map((schedule, index) => (
            <li key={index}>
            {"scheduleName: " + schedule.scheduleName}<br />
            {"schedulDesc: " + schedule.schedulDesc}
            <button onClick={() => handleDeleteEvent(schedule.scheduleId)}>삭제</button>
          </li>
          ))}
        </ul>
      ) : (
        <p>일정이 없습니다.</p>
      )}
    </div>
  );
};

export default CalendarComponent;

