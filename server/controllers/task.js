import mongoose from 'mongoose'
import Task from '../models/task.js'

// @desc get all tasks
// @route GET/tasks
// @access Public
export const allTask = async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json({ success: true, tasks })
  } catch (error) {
    console.log(error)
  }
}

// @desc get single task
// @route GET/tasks/:id
// @access Public
export const singleTask = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: `this task ${id} not fount` })
  try {
    const tasks = await Task.findById(id)
    res.status(200).json({ success: true, tasks })
  } catch (error) {
    console.log(error)
  }
}
// @desc update the task
// @route patch/tasks/:id
// @access Public
export const updateTask = async (req, res) => {
  const { id } = req.params
  const task = req.body
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: `this task ${id} not fount` })
  try {
    const tasks = await Task.findByIdAndUpdate(
      id,
      { ...task, id },
      { new: true }
    )
    res.status(200).json({ success: true, tasks })
  } catch (error) {
    console.log(error)
  }
}
// @desc delete the task
// @route delete/tasks/:id
// @access Public
export const deleteTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: `this task ${id} not fount` })
  try {
    const tasks = await Task.findByIdAndDelete(id)
    res.status(200).json({ success: true, tasks })
  } catch (error) {
    console.log(error)
  }
}
