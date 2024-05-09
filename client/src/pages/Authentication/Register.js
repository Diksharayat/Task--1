import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../../store/services/authServices";
import { toast } from "react-toastify";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";


function Register() {
  const defaultTheme = createTheme();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    isValidEmail: true,
    isValidPassword: true,
  });

  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[a-zA-Z]).{8,}$/;
    const isValidPassword = passwordRegex.test(value);

    setFormData({
      ...formData,
      [name]: value,
      isValidPassword: isValidPassword,
    });
  };

  const validateEmail = () => {
    const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const isValidEmail = emailRegex.test(formData.email);

    setFormData({
      ...formData,
      isValidEmail: isValidEmail,
    });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const isFormValid = () => {
    return (
      formData.fullname !== "" &&
      formData.email !== "" &&
      formData.password !== "" &&
      formData.isValidEmail &&
      formData.isValidPassword &&
      isChecked
    );
  };

  const [userRegister] = useRegisterMutation({});
  console.log(userRegister, "userRegister");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
      };
      const response = await userRegister(payload);
      console.log("Response:", response);

      if (response?.data?.status === "success") {

        
        navigate("/");
        toast.success("User Registered successfully");
      } else {
        console.log(response)
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",

              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 3 }}
              onSubmit={(e) => handleSubmit(e)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="fullname"
                    required
                    fullWidth
                    value={formData?.fullname}
                    id="fullname"
                    onChange={handleInputChange}
                    label="fullname"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    value={formData?.email}
                    onBlur={validateEmail}
                    onChange={handleInputChange}
                    name="email"
                    error={!formData.isValidEmail}
                    helperText={
                      !formData.isValidEmail ? "Invalid email format" : ""
                    }
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField
  margin="normal"
  required
  fullWidth
  name="password"
  value={formData.password}
  label="Password"
  onChange={handleInputChange}
  type={showPassword ? "text" : "password"}
  id="password"
  autoComplete="current-password"
  error={!formData.isValidPassword && formData.password.length > 0}
  helperText={
    !formData.isValidPassword && formData.password.length > 0
      ? "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character"
      : ""
  }
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={togglePasswordVisibility}
          edge="end"
        >
          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </InputAdornment>
    )
  }}
/>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="allowExtraEmails"
                        color="primary"
                        onChange={handleCheckboxChange}
                      />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isFormValid()}
              >
                Create Account
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Register;
