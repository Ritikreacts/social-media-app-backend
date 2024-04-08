const userModel = require("../models/users.model");
const yup = require("yup");
const HttpError = require("../utils/HttpError");
const fs = require("fs");
const path = require("path");
const { firstname, lastname, username } = require("../utils/validations");
const postModal = require("../models/posts.modal");

const getUser = async (req, res, next) => {
  try {
    const userJson = await userModel.findById(req.user._id, {
      password: 0,
      isVerified: 0,
    });
    return res.status(200).json({
      status: "success",
      data: userJson,
    });
  } catch (e) {
    next(e);
  }
};

const UPDATE_USER_SCHEMA = yup.object({
  firstname,
  lastname,
  username,
  profilePhoto: yup.string(),
});

const updateUser = async (req, res, next) => {
  try {
    delete req.body.password;
    delete req.body.isVerified;

    await UPDATE_USER_SCHEMA.validate(req.body);
    const { _id } = req.user;
    const newUserData = await userModel.findByIdAndUpdate(_id, req.body, {
      new: true,
      select: "-password",
    });

    if (!newUserData) {
      throw new HttpError(404, "User not found.");
    }
    return res.status(200).json({ status: "success", data: newUserData });
  } catch (e) {
    next(e);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      throw new HttpError(400, "User id not provided.");
    }
    const getUserProfile = await userModel.findById(userId);
    if (!getUserProfile) {
      throw new HttpError(404, "User not found.");
    }
    const { firstname, lastname, username, isPrivate } = getUserProfile;
    return res.send({
      status: "success",
      data: { firstname, lastname, username, isPrivate },
    });
  } catch (e) {
    next(e);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    let { page, perPage, search } = req.query;

    page = page && page > 0 ? Number(page) - 1 : 0;
    perPage = perPage && perPage > 0 ? perPage : 5;

    let searchQuery = { isVerified: true };

    if (search) {
      searchQuery.$or = [
        { firstname: { $regex: req.query.searchText, $options: "i" } },
        { lastname: { $regex: req.query.searchText, $options: "i" } },
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ["$firstname", " ", "$lastname"] },
              regex: req.query.searchText,
              options: "i",
            },
          },
        },
      ];
    }

    const users = await userModel
      .find(searchQuery, {
        _id: 1,
        firstname: 1,
        lastname: 1,
        username: 1,
        email: 1,
        isPrivate: 1,
      })
      .skip(page * perPage)
      .limit(perPage)
      .sort({ created_at: "desc" });

    return res.status(200).send({
      status: "success",
      data: users,
    });
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (fs.existsSync(path.resolve(__dirname, `../uploads/${req.user._id}`))) {
      await fs.rmSync(path.resolve(__dirname, `../uploads/${req.user._id}`), {
        recursive: true,
      });
    }
    await postModal.deleteMany({ userId: req.user._id });
    await userModel.findByIdAndDelete(req.user._id);
    res
      .status(200)
      .json({ status: "success", message: "User deleted successfully." });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUser,
  updateUser,
  getUserProfile,
  getAllUsers,
  deleteUser,
};
