import express from "express";
import createUser from "../utils/createUser";

const router = express.Router();

router.get("/test", (_req, res) => {
  res.send("Its working");
});

router.post("/user", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  if (username === "undefined" || password === "undefined") {
    res.status(500).send("Error: Username not provide");
  }

  try {
    const newUser = createUser({ username, password });
    console.log(newUser);
    res.status(200).json({ userCreated: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
});

router.get("/user/:username", (req, res) => {
  const username = req.params.username;
  res.send(username);
});

export default router;
