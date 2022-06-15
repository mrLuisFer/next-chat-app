import express from "express"
import createUser from "../utils/createUser"

const router = express.Router()

router.get("/test", (_req, res) => {
  res.send("Its working")
})

router.post("/user", (req, res) => {
  const userObj = req.body
  if (!userObj) {
    res.status(500).json({ ok: false, status: 500 })
    return
  }

  const user = createUser({
    username: userObj.username,
    password: userObj.password,
  })
  console.log(user)
  res.status(200).json({ ok: true, status: 200, user })
})

router.get("/user/:username", (req, res) => {
  const username = req.params.username
  res.send(username)
})

export default router
