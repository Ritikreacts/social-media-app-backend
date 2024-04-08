const { GridFsStorage } = require("multer-gridfs-storage");
const connection = require("./dbConnection");

const storage = new GridFsStorage({
  db: connection,
  file: (request, file) => {
    const filename = file.originalname;
    return {
      bucketName: "uploads",
      filename: `${request.user._id}/${filename}`,
    };
  },
});

module.exports = storage;
