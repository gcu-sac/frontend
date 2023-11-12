"use client";
import Calendar from "react-calendar";
import { useState, useEffect, useRef } from "react";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { Button, Modal, Paper, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import {calendar_event_link} from '@/app/links';
import Cookies from 'js-cookie';

const CalendarComponent = () => {
  const [value, setValue] = useState<Date>(new Date());
  const [data, setData] = useState<Array<{ [key: string]: any }> | null>(null);

  function getCookieValue(cookieName: string) {
    const cookieValue = Cookies.get(cookieName);
    return cookieValue || '';
  }


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ //새 일정을 추가할때 필요한 정보들
    scheduleId: "",
    userId: getCookieValue('username'),
    token: getCookieValue('jwtAuthToken'),
    scheduleName: "",
    scheduleDesc: "",    
  });

  const modalRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { //새 일정 추가하는 useState에 정보 넣기
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };


  // 선택한 일정을 수정할 때 사용할 state
  const [editEvent, setEditEvent] = useState({
    scheduleId: "",
    userId: getCookieValue('username'),
    token: getCookieValue('jwtAuthToken'),
    scheduleName: "",
    scheduleDesc: "",
    startYear: 0,
    startMonth: 0,
    startDay: 0,
    startHour: 0,
    startMin: 0,
    endYear: 0,
    endMonth: 0,
    endDay: 0,
    endHour: 0,
    endMin: 0,
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 일정 수정 모달 열기
  const openEditModal = (schedule: any) => {
    const { startTime, endTime } = schedule;
    
    const startDateTime = extractDateTime(startTime);
    const endDateTime = extractDateTime(endTime);
    console.log("s: ", startDateTime);
    console.log("e: ", endDateTime);
    setEditEvent({
      scheduleId: schedule.scheduleId,
      userId: getCookieValue('username'),
      token: getCookieValue('jwtAuthToken'),
      scheduleName: schedule.scheduleName,
      scheduleDesc: schedule.scheduleDesc,
      startYear: startDateTime.year,
      startMonth: startDateTime.month,
      startDay: startDateTime.day,
      startHour: startDateTime.hours,
      startMin: startDateTime.minutes,
      endYear: endDateTime.year,
      endMonth: endDateTime.month,
      endDay: endDateTime.day,
      endHour: endDateTime.hours,
      endMin: endDateTime.minutes,
    });
    setIsEditModalOpen(true);
  };
  const extractDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
  
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    return { year, month, day, hours, minutes };
  };

  // 일정 수정 모달 닫기
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  

  // 일정 수정 로직
  const handleEditEvent = (schedule: any) => {
    // 백엔드로 수정할 일정 정보 보내기
    console.log("schedule: ", schedule);
    console.log("editEvent: ", editEvent);
    axios
      .put(calendar_event_link+`/${editEvent.scheduleId}`, {
        headers: {
          "token": editEvent.token,
        },
        "scheduleID": editEvent.scheduleId,
        "userID": editEvent.userId,
        "scheduleName": editEvent.scheduleName,
        "scheduleDesc": editEvent.scheduleDesc,
        "time": {
          "StartYear": editEvent.startYear,
          "StartMonth": editEvent.startMonth,
          "StartDay": editEvent.startDay,
          "StartHour": editEvent.startHour,
          "StartMin": editEvent.startMin,
          "EndYear": editEvent.endYear,
          "EndMonth": editEvent.endMonth,
          "EndDay": editEvent.endDay,
          "EndHour": editEvent.endHour,
          "EndMin": editEvent.endMin,
        }
      })
      .then((response) => {
        // 수정 성공 시
        console.log("Event edited successfully:", response.data);
        closeEditModal();
        fetchData(value); // 캘린더 업데이트
      })
      .catch((error) => {
        console.error("Error editing event:", error);
      });
  };

  //일정 추가.
  const handleAddEvent = () => {
    //새 일정 추가 백엔드로 전송하는 부분
   
    axios
      .post(calendar_event_link, {
        headers: {
          "token": newEvent.token,
        },
        "scheduleID": newEvent.scheduleId,
        "userID": newEvent.userId,
        "scheduleName": newEvent.scheduleName,
        "scheduleDesc": newEvent.scheduleDesc,
        "time": {
          "StartYear": form.startYear,
          "StartMonth": form.startMonth,
          "StartDay": form.startDay,
          "StartHour": form.startHour,
          "StartMin": form.startMin,
          "EndYear": endform.endYear,
          "EndMonth": endform.endMonth,
          "EndDay": endform.endDay,
          "EndHour": endform.endHour,
          "EndMin": endform.endMin,
        }
      })
      .then((response) => {
        // Handle success
        console.log("Event added successfully:", response.data);
        // Close the modal
        closeModal();
        // You might want to refetch data to update the calendar
        fetchData(value);
      })
      .catch((error) => {
        console.log(newEvent);
        // Handle error
        console.error("Error adding event:", error);
      });
  };

  //일정 삭제
  const handleDeleteEvent = (scheduleId: number) => {
    // 백엔드로 일정 삭제 요청 보내기
    //scheduleId를 백엔드로 넘김. 백엔드에서는 Id조회해서 해당 데이터 지우면 될듯
    console.log("scheduleId: " + scheduleId);
    axios
      .delete(calendar_event_link+`/${scheduleId}`, {
        headers: {
          "token": getCookieValue('jwtAuthToken')
        },
      })
      .then((response) => {
        // Handle success
        console.log("Event deleted successfully:", response.data);

        fetchData(value);
      })
      .catch((error) => {
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
      scheduleId: 12,
      scheduleName: "Event 12",
      startTime: "2023-12-12T09:05:00",
      endTime: "2023-12-12T10:30:00",
      scheduleDesc: "Description 12",
    },
    {
      scheduleId: 13,
      scheduleName: "Event 13",
      startTime: "2023-12-13T09:00:00",
      endTime: "2023-12-13T10:00:00",
      scheduleDesc: "Description 13",
    },
    {
      scheduleId: 14,
      scheduleName: "Event 14",
      startTime: "2023-12-12T09:00:00",
      endTime: "2023-12-12T10:00:00",
      scheduleDesc: "Description 14",
    },
  ];

  useEffect(() => {
    fetchData(value);
  }, [value]);

  const fetchData = async (date: Date) => {
    try {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const endpoint = calendar_event_link + `?month=${month}&year=${year}`; //월 마다의 일정을 받아옴
      const response = await axios.get(endpoint, {
        headers: {
          "token": getCookieValue('jwtAuthToken')
        }
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const selectedDate = value;
  const selectedDay = selectedDate.getDate();
  const selectedSchedules = data ? data.filter(schedule => {
    const scheduleDate = new Date(schedule.startTime);
    return scheduleDate.getDate() === selectedDay;
  }) : [];
  // const selectedSchedules = responseExample.filter((schedule) => {
  //   //우선 test데이터 쓸 때 이거로 쓰는 중
  //   const scheduleDate = new Date(schedule.startTime);
  //   return scheduleDate.getDate() === selectedDay;
  // });

  const now = new Date();
  const nowYear = now.getFullYear();

  const [form, setForm] = useState({ //일정 시작 날짜 입력 시 사용 할 useState
    startYear: nowYear,
    startMonth: "01",
    startDay: "01",
    startHour: "01",
    startMin: "01",
  });

  const [endform, setEndForm] = useState({ //일정 종료 날짜 입력 시 사용 할 useState
    endYear: nowYear,
    endMonth: "01",
    endDay: "01",
    endHour: "01",
    endMin: "01",
  });
  
  let years = []; //year list
  for (let y = now.getFullYear(); y >= 1930; y -= 1) {
    years.push(y);
  }

  let month = []; //month list
  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 월에 0을 붙혀준다
      month.push("0" + m.toString());
    } else {
      month.push(m.toString());
    }
  }
  let days = []; //day list
  let date = new Date(form.startYear, parseInt(form.startMonth), 0).getDate();
  for (let d = 1; d <= date; d += 1) {
    if (d < 10) {
     // 날짜가 2자리로 나타나야 했기 때문에 1자리 일에 0을 붙혀준다
      days.push("0" + d.toString());
    } else {
      days.push(d.toString());
    }
  }
  
  let hour = []; //hour list
  for(let i = 1; i<=24; i++){
    if (i < 10) {
      //시간이 2자리로 나타나야 했기 때문에 1자리 시간 앞에 0을 붙혀준다
      hour.push("0" + i.toString());
    } else {
      hour.push(i.toString());
    }
  }

  let min = []; //min list
  for(let j = 0; j<=59; j++){
    if (j < 10) {
      //'분'이 2자리로 나타나야 했기 때문에 1자리 시간 앞에 0을 붙혀준다
      min.push("0" + j.toString());
    } else {
      min.push(j.toString());
    }
  }

  return (
    <div>
      <Calendar
        locale="ko"
        onChange={(value, event) => onChange(value as Date)}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate instanceof Date) {
            onMonthChange(activeStartDate);
          }
        }}
        value={value}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button
          variant="contained"
          onClick={openModal}
          style={{ margin: "20px" }}
        >
          새 일정
        </Button>
        <h2>{selectedDay}일 일정</h2>
        {selectedSchedules.length > 0 ? (
          selectedSchedules.map((schedule, index) => (
            <div
              key={index}
              style={{
                margin: "5px 0px",
                borderBottom: "1px solid gray",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p style={{ margin: "8px 0px 0px 0px" }}>
                  {"scheduleName: " + schedule.scheduleName}
                </p>
                <p style={{ margin: "16px 0px 0px 0px" }}>
                  {"scheduleDesc: " + schedule.scheduleDesc}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Button onClick={() => openEditModal(schedule)}>수정</Button>
                <Button onClick={() => handleDeleteEvent(schedule.scheduleId)}>
                  삭제
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>일정이 없습니다.</p>
        )}
      </div>
      
      {/* 추가 modal 부분 */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          style={{
            width: "500px",
            margin: "50px auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div ref={modalRef}>
            <div
              className="modal-content"
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "30px",
              }}
            >
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>새 일정 추가</h2>
              <TextField
                id="scheduleName"
                label="일정 이름"
                variant="standard"
                name="scheduleName"
                value={newEvent.scheduleName}
                onChange={handleInputChange}
              />
              <FormControl fullWidth style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                
                <NativeSelect
                  defaultValue={form.startYear}
                  inputProps={{
                    name: 'year',
                    id: 'year',
                  }}
                  onChange={(e) => setForm({ ...form, startYear: parseInt(e.target.value) })}
                >
                  {years.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
                
                <NativeSelect
                  defaultValue={form.startMonth}
                  inputProps={{
                    name: 'month',
                    id: 'month',
                  }}
                  onChange={(e) => setForm({ ...form, startMonth: e.target.value })}
                >
                  {month.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
                
                <NativeSelect
                  defaultValue={form.startDay}
                  inputProps={{
                    name: 'day',
                    id: 'day',
                  }}
                  onChange={(e) => setForm({ ...form, startDay: e.target.value })}
                >
                  {days.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
                
                <NativeSelect
                  defaultValue={form.startHour}
                  inputProps={{
                    name: 'hour',
                    id: 'hour',
                  }}
                  onChange={(e) => setForm({ ...form, startHour: e.target.value })}
                >
                  {hour.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
                
                <NativeSelect
                  defaultValue={form.startMin}
                  inputProps={{
                    name: 'min',
                    id: 'min',
                  }}
                  onChange={(e) => setForm({ ...form, startMin: e.target.value })}
                >
                  {min.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
              <FormControl fullWidth style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                
                <NativeSelect
                  defaultValue={endform.endYear}
                  inputProps={{
                    name: 'year',
                    id: 'year',
                  }}
                  onChange={(e) => setEndForm({ ...endform, endYear: parseInt(e.target.value) })}
                >
                  {years.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
                
                <NativeSelect
                  defaultValue={endform.endMonth}
                  inputProps={{
                    name: 'month',
                    id: 'month',
                  }}
                  onChange={(e) => setEndForm({ ...endform, endMonth: e.target.value })}
                >
                  {month.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
                
                <NativeSelect
                  defaultValue={endform.endDay}
                  inputProps={{
                    name: 'day',
                    id: 'day',
                  }}
                  onChange={(e) => setEndForm({ ...endform, endDay: e.target.value })}
                >
                  {days.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
                
                <NativeSelect
                  defaultValue={endform.endHour}
                  inputProps={{
                    name: 'hour',
                    id: 'hour',
                  }}
                  onChange={(e) => setEndForm({ ...endform, endHour: e.target.value })}
                >
                  {hour.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
                
                <NativeSelect
                  defaultValue={endform.endMin}
                  inputProps={{
                    name: 'min',
                    id: 'min',
                  }}
                  onChange={(e) => setEndForm({ ...endform, endMin: e.target.value })}
                >
                  {min.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
              <TextField
                id="scheduleDesc"
                label="내용"
                variant="standard"
                name="scheduleDesc"
                value={newEvent.scheduleDesc}
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddEvent}
                style={{
                  marginTop: "40px",
                }}
              >
                일정 추가
              </Button>
            </div>
          </div>
        </Paper>
      </Modal>
      
      {/* 수정 modal 부분 */}
      <Modal
        open={isEditModalOpen}
        onClose={closeEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          style={{
            width: "500px",
            margin: "50px auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="modal" ref={modalRef}>
            <div
              className="modal-content"
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "30px",
              }}
            >
              <span className="close" onClick={closeEditModal}>
                &times;
              </span>
              <h2>일정 수정</h2>
              <TextField
                id="scheduleName"
                label="일정 이름"
                variant="standard"
                name="scheduleName"
                value={editEvent.scheduleName}
                onChange={(e) =>
                  setEditEvent({ ...editEvent, scheduleName: e.target.value })
                }
              />
              <FormControl fullWidth style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                
                <NativeSelect
                  defaultValue={String(editEvent.startYear)}
                  inputProps={{
                    name: 'year',
                    id: 'year',
                  }}
                  onChange={(e) => setEditEvent({ ...editEvent, startYear: parseInt(e.target.value) })}
                >
                  {years.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
                
                <NativeSelect
                  defaultValue={String(editEvent.startMonth)}
                  inputProps={{
                    name: 'month',
                    id: 'month',
                  }}
                  onChange={(e) => setEditEvent({ ...editEvent, startMonth: parseInt(e.target.value) })}
                >
                  {month.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
                
                <NativeSelect
                  defaultValue={String(editEvent.startDay)}
                  inputProps={{
                    name: 'day',
                    id: 'day',
                  }}
                  onChange={(e) => setEditEvent({ ...editEvent, startDay: parseInt(e.target.value) })}
                >
                  {days.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
                <NativeSelect
                  defaultValue={String(editEvent.startHour)}
                  inputProps={{
                    name: 'hour',
                    id: 'hour',
                  }}
                  onChange={(e) => setEditEvent({ ...editEvent, startHour: parseInt(e.target.value) })}
                >
                  {hour.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
                
                <NativeSelect
                  defaultValue={String(editEvent.startMin)}
                  inputProps={{
                    name: 'min',
                    id: 'min',
                  }}
                  onChange={(e) => setEditEvent({ ...editEvent, startMin: parseInt(e.target.value) })}
                >
                  {min.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
              <FormControl fullWidth style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                
                <NativeSelect
                  defaultValue={String(editEvent.endYear)}
                  inputProps={{
                    name: 'year',
                    id: 'year',
                  }}
                  onChange={(e) => setEditEvent({ ...editEvent, endYear: parseInt(e.target.value) })}
                >
                  {years.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
                
                <NativeSelect
                  defaultValue={String(editEvent.endMonth)}
                  inputProps={{
                    name: 'month',
                    id: 'month',
                  }}
                  onChange={(e) => setEditEvent({ ...editEvent, endMonth: parseInt(e.target.value) })}
                >
                  {month.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
                
                <NativeSelect
                  defaultValue={String(editEvent.endDay)}
                  inputProps={{
                    name: 'day',
                    id: 'day',
                  }}
                  onChange={(e) => setEditEvent({ ...editEvent, endDay: parseInt(e.target.value) })}
                >
                  {days.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
                
                <NativeSelect
                  defaultValue={String(editEvent.endHour)}
                  inputProps={{
                    name: 'hour',
                    id: 'hour',
                  }}
                  onChange={(e) => setEditEvent({ ...editEvent, endHour: parseInt(e.target.value) })}
                >
                  {hour.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
                
                <NativeSelect
                  defaultValue={String(editEvent.endMin)}
                  inputProps={{
                    name: 'min',
                    id: 'min',
                  }}
                  onChange={(e) => setEditEvent({ ...editEvent, endMin: parseInt(e.target.value) })}
                >
                  {min.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
              <TextField
                id="scheduleDesc"
                label="내용"
                variant="standard"
                name="scheduleDesc"
                value={editEvent.scheduleDesc}
                onChange={(e) =>
                  setEditEvent({ ...editEvent, scheduleDesc: e.target.value })
                }
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditEvent}
                style={{
                  marginTop: "40px",
                }}
              >
                일정 수정
              </Button>
            </div>
          </div>
        </Paper>
      </Modal>
    </div>
  );
};

export default CalendarComponent;
