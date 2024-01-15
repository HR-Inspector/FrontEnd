import Box from "@mui/material/Box";
import { ITimeTracking } from "../types/timetracking";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

interface ITimeTrackingListProps {
  timeTracking: ITimeTracking | null;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 90,
  height: 90,
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
  borderRadius: 0,
}));

const TimeTrackingList = (props: ITimeTrackingListProps) => {
  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <Typography component="h4">Time tracking</Typography>
        <Typography component="p">
          totalWorkedHours: {props.timeTracking?.totalWorkedHours}
        </Typography>
        <Typography component="p">
          totalWorkedHours: {props.timeTracking?.salaryForHours}
        </Typography>
        <Typography component="p">
          totalWorkedHours: {props.timeTracking?.salaryForMonth}
        </Typography>
        <Stack sx={{ flexDirection: "row" }}>
          {props.timeTracking &&
            Object.keys(props.timeTracking.dailyWorkedHours).map((key) => (
              <StyledPaper elevation={3}>
                <Typography component="p">
                  {key}:{" "}
                  {
                    props.timeTracking?.dailyWorkedHours[
                      key as unknown as number
                    ]
                  }
                </Typography>
              </StyledPaper>
            ))}
        </Stack>
      </Box>
    </>
  );
};

export default TimeTrackingList;
