import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { useParams } from "react-router-dom";
import { getTimeTrackingInfo } from "../store/slices/employee";
import TimeTrackingList from "../components/timetrackingList";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const TimeTracking = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { employeeId } = useParams();
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const timeTracking = useSelector(
    (state: RootState) => state.employee.timeTracking
  );

  const onDateSelect = (value: dayjs.Dayjs | null) => {
    if (value) {
      setMonth(value.month());
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
      <Stack sx={{ flexDirection: "row", alignItems: "center", mb: 5 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={date}
            views={["month", "year"]}
            openTo="month"
            onChange={(newValue) => onDateSelect(newValue)}
            sx={{ width: 400 }}
          />
        </LocalizationProvider>
        <Typography sx={{ mx: 5 }} component="p">
          totalWorkedHours: {timeTracking?.totalWorkedHours}
        </Typography>
        <Typography sx={{ mx: 5 }} component="p">
          salaryForHours: {timeTracking?.salaryForHours}
        </Typography>
        <Typography sx={{ ml: 5 }} component="p">
          salaryForMonth: {timeTracking?.salaryForMonth}
        </Typography>
      </Stack>
      <TimeTrackingList timeTracking={timeTracking} date={date} />
    </div>
  );
};

export default TimeTracking;
