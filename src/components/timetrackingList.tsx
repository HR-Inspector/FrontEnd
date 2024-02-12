import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { ITimeTracking } from "../types/timetracking";
import dayjs from "dayjs";
import { Calendar, Views, dayjsLocalizer } from "react-big-calendar";

interface ITimeTrackingListProps {
  timeTracking: ITimeTracking | null;
  date: dayjs.Dayjs | null;
}

const localizer = dayjsLocalizer(dayjs);

const TimeTrackingList = (props: ITimeTrackingListProps) => {
  const [date, setDate] = useState(dayjs().toDate());

  const defaultDate = useMemo(() => {
    if (props.date) {
      return dayjs().year(props.date.year()).month(props.date.month()).toDate();
    } else {
      return dayjs().toDate();
    }
  }, [props.date]);

  const max = useMemo(() => dayjs().add(2, "year").toDate(), []);
  
  const views = useMemo(() => {
    return Object.values(Views);
  }, []);

  const events = useMemo(() => {
    const dailyWorkedHours = props.timeTracking?.dailyWorkedHours ?? {};
    const eventList = [];

    for (const key in dailyWorkedHours) {
      if (dailyWorkedHours.hasOwnProperty(key)) {
        const currentDailyWorkedHours = dailyWorkedHours[key];

        if (currentDailyWorkedHours) {
          for (const item of currentDailyWorkedHours) {
            const start = dayjs(item.startTime);
            const end = dayjs(item.endTime);
            const diff = end.diff(start, "hours");

            eventList.push({
              id: item.id,
              title: `${diff}h`,
              start,
              end,
            });
          }
        }
      }
    }

    return eventList;
  }, [props.timeTracking?.dailyWorkedHours]);

  useEffect(() => {
    setDate(defaultDate);
  }, [defaultDate]);

  const handleNavigate = (newDate: Date, view: string, action: string) => {
    setDate(dayjs(newDate).toDate());
  };

  return (
    <>
      <Box sx={{ height: 550 }}>
        <Calendar
          defaultDate={defaultDate}
          date={date}
          events={events}
          localizer={localizer}
          max={max}
          views={views}
          onNavigate={handleNavigate}
        />
      </Box>
    </>
  );
};

export default TimeTrackingList;
