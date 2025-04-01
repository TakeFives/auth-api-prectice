import { User } from "../models/userModels.js";


const getUsers = async (req, res) => {
  try {
    const users = User.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = User.findOne({ username: id });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

export { getUsers, getUserById };
