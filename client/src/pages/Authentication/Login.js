import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../../store/services/authServices";
import { toast } from "react-toastify";
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";


const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [userLogin, { isLoading }] = useLoginMutation({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isValidEmail: true,
    isValidPassword: true,
  });

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
  const [showPassword, setShowPassword] = useState(false);
  // Function to validate email
  const validateEmail = () => {
    const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const isValidEmail = emailRegex.test(formData.email);

    setFormData({
      ...formData,
      isValidEmail: isValidEmail,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const isFormValid = () => {
    return (
      formData.email !== "" &&
      formData.password !== "" &&
      formData.isValidEmail &&
      formData.isValidPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
      };

      const response = await userLogin(payload);

      if (response?.data?.status === "success") {
        localStorage.setItem("email", formData.email);
              
                const token = response?.data?.token?.accessToken;
               
                localStorage.setItem('token', token);

        navigate("otp", {
          state: { data: formData?.email, password: formData?.password },
        });
        toast.success("Login successful");
      } else {
        console.error("Invalid credentials");
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Failed to login. Please try again.", error);
    }
  };

  console.log(formData);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",

              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(e) => handleSubmit(e)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onBlur={validateEmail}
                onChange={handleInputChange}
                error={!formData.isValidEmail}
                helperText={
                  !formData.isValidEmail ? "Invalid email format" : ""
                }
                autoComplete="email"
                autoFocus
              />
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isFormValid()}
              >
                Sign In
                {isLoading && (
                  <CircularProgress size={20} sx={{ ml: 2, color: "white" }} />
                )}
              </Button>
              <Grid container>
                <Grid item xs style={{cursor: "pointer"}}>
                  <Link  variant="body2" onClick={()=>{navigate("/forgot-password")}}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link  variant="body2" onClick={()=>{navigate("/register")}}>
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
