// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios"; // Import Axios library
// import {
//   Grid,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   CssBaseline,
//   Container,
//   Divider,
// } from "@mui/material";
// import { toast } from "react-toastify";

// const ForgotPassword = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     isValidEmail: true,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const validateEmail = () => {
//     const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
//     const isValidEmail = emailRegex.test(formData.email);

//     setFormData({
//       ...formData,
//       isValidEmail: isValidEmail,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
  
      
//       const response = await axios.post("http://localhost:3002/users/forget-password", {
//         email: formData.email
//       });
//       if (response.data.status === "success") {
//         toast.success("Please check your email to reset your password");
//       } else {
//         console.error("Email not sent");
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log("Failed to send email. Please try again.", error);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs" align="center">
//       <CssBaseline />
//       <Paper
//         elevation={3}
//         spacing={2}
//         align="center"
//         sx={{ padding: 2, margin: "20px auto", marginTop: "60px" }}
//       >
//         <Typography component="h1" variant="h5" align="center" marginBottom="15px">
//           Forgot Password
//         </Typography>
//         <Divider />
//         <form onSubmit={handleSubmit}>
//           <Typography sx={{ mt: 3 }}>
//             Lost your password? Please enter your username or email address. You
//             will receive a link to create a new password via email.
//           </Typography>
//           <TextField
//              margin="normal"
//              required
//              fullWidth
//              id="email"
//              label="Email Address"
//              name="email"
//              onBlur={validateEmail}
//              onChange={handleInputChange}
//              error={!formData.isValidEmail}
//              helperText={!formData.isValidEmail ? "Invalid email format" : ""}
//              autoComplete="email"
//              autoFocus
//           />

//           <Button
//             type="submit"
//             color="primary"
//             sx={{ mt: 2, mb: 1,fontWeight:"bold",backgroundColor:"#edf2ff", fontFamily:"IBM Plex Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol" }}
//           >
//             Reset Password
//           </Button>
//           <Divider sx={{ marginTop: "50px" }} />
//           <Grid container justifyContent="flex-start">
//             <Grid item sx={{marginTop:"15px"}}>
//               <Link to="/login" variant="body2">
//                 Remember your password?
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default ForgotPassword;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios library
import {
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  CssBaseline,
  Container,
  Divider,
} from "@mui/material";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "../../store/services/authServices";

const ForgotPassword = () => {

  const [sendEmail]=useForgotPasswordMutation({});
  const [formData, setFormData] = useState({
    email: "",
   
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateEmail = () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const isValidEmail = emailRegex.test(formData.email);

    setFormData({
      ...formData,
     
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
      };
      const response = await sendEmail(payload);
      if (response.data.status === "success") {
        toast.success("Click on the Link to reset your password");
      } else {
        console.error("Email not sent");
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Failed to send email. Please try again.", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" align="center">
      <CssBaseline />
      <Paper
        elevation={3}
        spacing={2}
        align="center"
        sx={{ padding: 2, margin: "20px auto", marginTop: "60px" }}
      >
        <Typography component="h1" variant="h5" align="center" marginBottom="15px">
          Forgot Password
        </Typography>
        <Divider />
        <form onSubmit={handleSubmit}>
          <Typography sx={{ mt: 3 }}>
            Lost your password? Please enter your username or email address. You
            will receive a link to create a new password via email.
          </Typography>
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
             helperText={!formData.isValidEmail ? "Invalid email format" : ""}
             autoComplete="email"
             autoFocus
          />

          <Button
            type="submit"
            color="primary"
            sx={{ mt: 2, mb: 1,fontWeight:"bold",backgroundColor:"#edf2ff", fontFamily:"IBM Plex Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol" }}
          >
            Reset Password
          </Button>
          <Divider sx={{ marginTop: "50px" }} />
          <Grid container justifyContent="flex-start">
            <Grid item sx={{marginTop:"15px"}}>
              <Link to="/login" variant="body2">
                Remember your password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;

