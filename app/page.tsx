import "react-calendar/dist/Calendar.css";
import CalendarComponent from "./components/calendar/calendar";

const MainPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
      }}
    >
      <h1>Calendar</h1>
      <CalendarComponent />
    </div>
  );
};

export default MainPage;
