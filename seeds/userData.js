const { User } = require("../models");

const userData = [
  {
    username: "kelsoreslo",
    password: "password12345",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;