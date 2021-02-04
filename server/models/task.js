import mongoose from 'mongoose'

const taskSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    isCompletd:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
// let task = mongoose.model('Task', postSchema);
export default  mongoose.model('Task',taskSchema)