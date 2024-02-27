import express from "express";
import cors from "cors";
require("dotenv").config();
import { connect } from '../db/connection'
const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Database Connection
connect();

const roomRoutes = require("./routes/room");
const messageRoutes = require("./routes/messages");
const authRoute = require("./routes/auth");


app.use("/api", roomRoutes);
app.use("/api", messageRoutes);
app.use("/api", authRoute);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
