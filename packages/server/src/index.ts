import express from "express"

const app = express()
app.use(express.json())

const PORT = 8000
app.listen(PORT, (): void => {
  console.log(`Server running on Port: ${PORT}`)
})
