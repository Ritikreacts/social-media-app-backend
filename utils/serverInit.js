const fs = require("fs");
const path = require("path");

const serverInit = async () => {
  const folderPath = path.resolve(__dirname, "../uploads");
  if (!fs.existsSync(folderPath)) {
    await fs.mkdirSync(folderPath);
  }
};

module.exports = {
  serverInit,
};
