import express from "express";
import createUser from "../utils/createUser";

const router = express.Router();

router.post("/createuser", (req, res) => {
  res.send("Saving user");
  const { username, password } = req.body;
  const newUser = createUser({ username, password });
  console.log(newUser);
});

export default router;
