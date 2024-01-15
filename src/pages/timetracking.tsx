import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { useParams } from "react-router-dom";
import {
  getTimeTrackingInfo,
} from "../store/slices/employee";
import TimeTrackingList from "../components/timetrackingList";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const TimeTracking = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { employeeId } = useParams();
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const timeTracking = useSelector(
    (state: RootState) => state.employee.timeTracking
  );

  const onDateSelect = (value: dayjs.Dayjs | null) => {
    if (value) {
      setMonth(value.month() + 1);
      setYear(value.year());
    }
    setDate(value);
  };

  useEffect(() => {
    if (employeeId) {
      dispatch(getTimeTrackingInfo({ id: employeeId, year, month }));
    }
  }, [dispatch, employeeId, month, year]);

  return (
    <div>
      <h1>Time Tracking page</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select Date"
          value={date}
          views={["month", "year"]}
          openTo="month"
          onChange={(newValue) => onDateSelect(newValue)}
        />
      </LocalizationProvider>
      <TimeTrackingList timeTracking={timeTracking} />
    </div>
  );
};

export default TimeTracking;
