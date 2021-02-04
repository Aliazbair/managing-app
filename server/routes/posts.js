import express from 'express'
import auth from '../middlewares/auth.js'

import {
  getPosts,
  getPost,
  createPost,
  deletePosts,
  updatePost,
  likePost,
} from '../controllers/posts.js'

const router = express.Router()
router.route('/').get(getPosts).post(createPost)
// router.post('/',createPost)
router.route('/:id').get(getPost).delete(deletePosts).patch(updatePost)
router.patch('/:id/likePost', likePost)

export default router
