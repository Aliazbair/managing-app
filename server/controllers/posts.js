import mongoose from 'mongoose'
import Posts from '../models/postMessage.js'

// @ desc  GET/ get all posts
// @ route  GET/posts
// @ access Public
export const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find()
    res.status(200).json(posts)
  } catch (error) {
    res.status(404).json({ message: 'error.message' })
  }
}
// @ desc  GET/ get single post
// @ route  GET/posts/:id
// @ access Public
export const getPost = async (req, res) => {
  const { id } = req.params
  try {
    const post = await Posts.findById(id)
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({ message: 'error.message' })
  }
}

// @ desc  POST/ create new post
// @ route  POST/posts
// @ access Public
export const createPost = async (req, res) => {
  const post = req.body
  // const newpost= new Posts(post)
  // await newpost.save()
  // const { title, message, selectedFile, creator, tags } = req.body
  const newPost = new Posts({ ...post, creator:req.userId,createAt:new Date().toISOString()})
  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(404).json({ message: 'error.message' })
  }
}

// @ desc  put/ update the post
// @ route  PUT/posts/:id
// @ access Public
export const updatePost = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`no post with id: ${id}`)
  try {
    const post = req.body
    const updatePost = await Posts.findByIdAndUpdate(
      id,
      { ...post, id },
      { new: true }
    )

    res.status(201).json(updatePost)
  } catch (error) {
    res.status(404).json({ message: 'error.message' })
  }
}

// @ desc  delete/ delete post
// @ route  Delete/posts
// @ access Public
export const deletePosts = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)
  await Posts.findByIdAndDelete(id)
  res.status(201).json({ message: 'post deleted succesfully' })
  try {
    const posts = await Posts.find()
    res.status(200).json(posts)
  } catch (error) {
    res.status(404).json({ message: 'error.message' })
  }
}

// @ desc  post/ like the post
// @ route  post/posts/:id/like
// @ access Public
export const likePost = async (req, res) => {
  const { id } = req.params

  // check the user signin
  if (!req.userId) return res.json({ message: 'Unauthenticated' })
  // check the id object
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)

  // get the post with id
  const post = await Posts.findById(id)

  // get the index
  const index = post.likes.findIndex((id) => id === String(req.userId))

  if(index === -1){
    // like the post
    post.likes.push(req.userId)
  }
  else{
    // dislike a post
    post.likes= post.likes.filter((id)=> id !== String(req.userId))
  }

  const updatedPost = await Posts.findByIdAndUpdate(
    id,
    { post},
    { new: true }
  )

  res.json(updatedPost)
}
