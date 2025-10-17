import express from 'express'
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ message: 'Hello world!' })
})

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})

export default app
