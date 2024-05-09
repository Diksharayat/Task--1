const express = require("express");
const {
  userChart,
  getAllUsers,
} = require("../../controllers/users/dashboardCtrl");
const dashboardRoute = express.Router();

dashboardRoute.get("/chart-data", userChart);
dashboardRoute.get("/get-users", getAllUsers);

module.exports = dashboardRoute;
