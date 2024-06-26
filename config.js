require("dotenv").config();

const environment = process.env.ENVIRONMENT || "local";

const local = {
  baseURL: "https://social-media-app-backend-rdyi.onrender.com",
  port: process.env.PORT || 5000,
  dbURL: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "superSecret",
};

const development = {
  baseURL: process.env.BASEURL || "",
  port: process.env.PORT || 5000,
  dbURL: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "superSecret",
};

const config = {
  local,
  development,
};

module.exports = config[environment];
