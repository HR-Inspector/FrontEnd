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
  const { defaultDate, max, views, events } = useMemo(() => {
    const defaultDate = props.date
      ? dayjs().year(props.date.year()).month(props.date.month())
      : dayjs();

    return {
      defaultDate: defaultDate.toDate(),
      max: dayjs().add(2, "year").toDate(),
      views: Object.keys(Views).map(
        (k) => Views[k as unknown as keyof typeof Views]
      ),
      events: Object.keys(props.timeTracking?.dailyWorkedHours ?? {}).map(
        (key, index) => {
          const start = defaultDate.date(parseInt(key)).hour(8);
          const end = defaultDate
            .date(parseInt(key))
            .hour(
              8 + (props.timeTracking?.dailyWorkedHours[parseInt(key)] ?? 0)
            );

          return {
            id: index,
            title: `${props.timeTracking?.dailyWorkedHours[parseInt(key)]}h`,
            start,
            end,
          };
        }
      ),
    };
  }, [props.date, props.timeTracking?.dailyWorkedHours]);

  useEffect(() => {
    setDate(defaultDate);
  }, [defaultDate]);

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
          onNavigate={(newDate, view, action) =>
            setDate(dayjs(newDate).toDate())
          }
        />
      </Box>
    </>
  );
};

export default TimeTrackingList;
