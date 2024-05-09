import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../assets/Logo.svg";
import { useState, useEffect } from "react"; // Import useEffect
import { Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CustomAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    setEmail(email);
  }, []);
  console.log(email);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    toast.success("Logout successful");
    navigate("/");
    setEmail(""); // Clear email state
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "whitesmoke" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: -50,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Grid item xs={12} md={4} sx={{ marginTop: "10px" }}>
              <img src={Logo} alt="Photograph" style={{ maxWidth: "30%" }} />
            </Grid>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/dashboard"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography textAlign="center" sx={{ fontStyle: "italic" }}>
                    Dashboard
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/blogs"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography textAlign="center" sx={{ fontStyle: "italic" }}>
                    Blogs
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/contact"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography textAlign="center" sx={{ fontStyle: "italic" }}>
                    Contact
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Grid item xs={12} md={4} sx={{ marginTop: "10px" }}>
              <img src={Logo} alt="Photograph" style={{ maxWidth: "30%" }} />
            </Grid>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              component={Link}
              to="/dashboard"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "black",
                display: "block",
                fontStyle: "italic",
                paddingLeft: "5px",
              }}
            >
              Dashboard
            </Button>
            <Button
              component={Link}
              to="/blogs"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "black",
                display: "block",
                fontStyle: "italic",
                paddingLeft: "20px",
              }}
            >
              Blogs
            </Button>
            <Button
              component={Link}
              to="/contact"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "black",
                display: "block",
                fontStyle: "italic",
                paddingLeft: "20px",
              }}
            >
              Contact
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>{email ? email.charAt(0).toUpperCase() : ""}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={handleCloseUserMenu}
                sx={{ fontStyle: "italic" }}
              >
                <Link
                  to="/dashboard"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography textAlign="center" sx={{ fontStyle: "italic" }}>
                    Dashboard
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ fontStyle: "italic" }}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default CustomAppBar;
