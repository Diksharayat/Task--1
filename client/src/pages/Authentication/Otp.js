import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import download from "../../assets/download.jpg";
import OTPInput from "react-otp-input";

import { useLocation, useNavigate } from "react-router";
import { useOtpVerifyMutation } from "../../store/services/authServices";
import { toast } from "react-toastify";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userEmail = location?.state?.data;
  const [userverify] = useOtpVerifyMutation({});

  console.log(location, "location");
  console.log(userEmail, "userEmail");

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      otp: otp,
      email: userEmail,
    };

    try {
      const response = await userverify({ payload });
      setLoading(false);
      if(response?.data?.status === "success") {
        navigate("/dashboard");
        toast.success("Otp verified successfully");
      }
      else {
        toast.error(response.error)
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "3rem",
    height: "3rem",
    margin: "0.5rem 1rem 0.5rem 0rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: `1px solid grey`,
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "lightgoldenrodyellow",
        padding: "0 16px",
      }}
    >
      <form onSubmit={handleVerifyOtp}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{ maxWidth: 800, width: "100%" }}
        >
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <img
              src={download}
              alt="Photograph"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "50%" }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" sx={{ color: "grey", fontWeight: "bold" }}>
              Two Factor Authentication
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "10px" }}>
              A verification code has been sent to your email. This code will be
              valid for 15 minutes.
            </Typography>

            <Grid item lg={12} sx={{ marginTop: "10px" }}>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => <input {...props} />}
                inputStyle={inputStyle}
                shouldAutoFocus={true}
                inputType="number"
              />
            </Grid>

            <Grid item lg={12} mt="45px">
              <Button
                type="submit"
                variant="contained"
                
                disabled={loading}
              >
                {loading ? "Verifying..." : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Otp;
