const express = require("express");
const routes = express.Router();
const {
  createUser,
  getUsers,
  getUsersById,
  updateUsersById,
  deleteUsersById,
  searchUser
} = require("./../controllers/users");

routes.post("/user", createUser);

routes.get("/users", getUsers);

routes.get("/user/:id", getUsersById);

routes.put("/user/:id", updateUsersById);

routes.delete("/user/:id", deleteUsersById);

routes.get("/typeahead/:input", searchUser);

module.exports = routes;
