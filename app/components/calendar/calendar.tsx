"use client";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = () => {
  const [value, setValue] = useState<Date>(new Date());
  const onChange = (date: Date | Date[]) => {
    if (Array.isArray(date)) {
      return;
    }
    setValue(date as Date);
  };
  return (
    <Calendar
      locale="ko"
      onChange={(value, event) => onChange(value as Date)}
      value={value}
    />
  );
};

export default CalendarComponent;
