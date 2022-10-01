import { combineReducers } from 'redux'
import { userLoginReducer, userRegisterReducer } from './userReducer'
import { addblogReducer, bloglistReducer, editBlogReducer, deleteblogReducer } from './blogReducer'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userBlogs: bloglistReducer,
    addBlog: addblogReducer,
    editBlog: editBlogReducer,
    deleteBlog: deleteblogReducer,
})

export default reducer
