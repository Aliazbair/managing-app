import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
// import dotenv from 'dotenv';

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import tasks from './routes/task.js'

const app = express()
// dotenv.config()

// app.use(bodyParser.json({ limit: '30mb', extended: false }))
app.use(express.json())
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// Bring routers
app.use('/posts', postRoutes)
app.use('/users', userRoutes)
app.use('/tasks', tasks)

const CONNECTION_URL = 'mongodb://localhost:27017/memories'
const PORT = process.env.PORT || 5000

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`))

mongoose.set('useFindAndModify', false)
