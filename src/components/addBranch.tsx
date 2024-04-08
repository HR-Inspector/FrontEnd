import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { BranchTrackingType, IAddBranchBody } from "../types/branch";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { IJwtDecoded } from "../types/jwt";
import { jwtDecode } from "jwt-decode";

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  background: "#34495e",
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  width: "100%",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: 480,
  height: 640,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
  margin: "auto !important",
  borderRadius: 0,
}));

interface IAddBranchProps {
  onSubmit: (companyId: string, data: IAddBranchBody) => void;
  onBack: () => void;
}

const AddBranch = (props: IAddBranchProps) => {
  const [isBluetooth, setIsBluetooth] = useState(false);
  const [bluetoothNames, setBluetoothNames] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState<string | number>(0);
  const [longitude, setLongitude] = useState<string | number>(0);
  const [radius, setRadius] = useState<string | number>(0);
  const selectedCompany = useSelector(
    (state: RootState) => state.company.selectedCompany
  );
  const token = useSelector((state: RootState) => state.auth.token);
  const [decodedToken, setDecodedToken] = useState<IJwtDecoded | null>(
    token ? (jwtDecode(token) as IJwtDecoded) : null
  );

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token) as IJwtDecoded;
      setDecodedToken(decoded);
    }
  }, [token]);

  const handleOnSubmit = () => {
    const companyId =
      (selectedCompany?.id as string) ?? decodedToken?.companyId;
    if (isBluetooth) {
      props.onSubmit(companyId, {
        trackingType: BranchTrackingType.BLUETOOTH,
        trackingBluetooth: {
          names: bluetoothNames.split(",").map((name) => name.trim()),
        },
      });
      return;
    } else {
      props.onSubmit(companyId, {
        trackingType: BranchTrackingType.LOCATION,
        trackingLocation: {
          address,
          latitude: parseFloat(latitude as string),
          longitude: parseFloat(longitude as string),
          radius: parseFloat(radius as string),
        },
      });
    }
  };

  return (
    <>
      <StyledBox sx={{ display: "flex" }}>
        <StyledStack direction="row" spacing={2}>
          <StyledPaper variant="elevation">
            <Typography variant="h5" gutterBottom>
              Create Branch
            </Typography>
            <FormControlLabel
              sx={{
                display: "block",
              }}
              control={
                <Switch
                  checked={isBluetooth}
                  onChange={() => setIsBluetooth((prev) => !prev)}
                  name="isBluetooth"
                  color="primary"
                />
              }
              label="Is Bluetooth?"
            />
            <br />
            {isBluetooth ? (
              <>
                <TextField
                  required
                  id="bluetoothNames"
                  label="bluetooth names"
                  placeholder="Comma separated names..."
                  sx={{ m: 2 }}
                  value={bluetoothNames}
                  onChange={(e) => setBluetoothNames(e.target.value)}
                />
                <br />
              </>
            ) : (
              <>
                <TextField
                  required
                  id="address"
                  label="Address"
                  placeholder="Your branch address..."
                  sx={{ m: 2 }}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <br />
                <TextField
                  required
                  id="latitude"
                  label="Latitude"
                  placeholder="Your branch latitude..."
                  sx={{ m: 2 }}
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
                <br />
                <TextField
                  required
                  id="longitude"
                  label="Longitude"
                  placeholder="Your branch longitude..."
                  sx={{ m: 2 }}
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
                <br />
                <TextField
                  required
                  id="radius"
                  label="Radius"
                  placeholder="Your branch radius..."
                  sx={{ m: 2 }}
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                />
                <br />
              </>
            )}

            <Button sx={{ m: 2 }} variant="outlined" onClick={props.onBack}>
              Back
            </Button>
            <Button sx={{ m: 2 }} variant="contained" onClick={handleOnSubmit}>
              Create
            </Button>
          </StyledPaper>
        </StyledStack>
      </StyledBox>
    </>
  );
};

export default AddBranch;
