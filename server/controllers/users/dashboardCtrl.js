const Userss = require("../../models/User");


const userChart = async (req, res) => {
  try {
    // Fetch data from the database
    const data = await Userss.find();

    // Process the data to aggregate the number of users registered per day
    const aggregatedData = {};
    data.forEach((entry) => {
      // Extract the date part from the createdAt timestamp
      const date = new Date(entry.createdAt).toISOString().split("T")[0];
      // Increment the count for the date
      if (aggregatedData[date]) {
        aggregatedData[date]++;
      } else {
        aggregatedData[date] = 1;
      }
    });

    // Convert the aggregated data into an array of objects
    const chartData = Object.keys(aggregatedData).map((date) => ({
      date,
      count: aggregatedData[date],
    }));

    // Send the processed data as a response
    res.json(chartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Userss.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  userChart,
  getAllUsers,
};
