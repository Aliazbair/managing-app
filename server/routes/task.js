import express from 'express'
const router= express.Router()
import {allTask,deleteTask,singleTask,updateTask} from '../controllers/task.js'
router.route('/').get(allTask)
router.route('/:id').get(singleTask).patch(updateTask).delete(deleteTask)
export default router