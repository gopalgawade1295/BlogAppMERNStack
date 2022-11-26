import axios from 'axios'
import { BLOGS_REQUEST, BLOGS_SUCCESS, BLOGS_FAIL, ADD_BLOG, EDIT_BLOG, DELETE_BLOG } from "../constants/blogConstants";

export const bloglist = () => async (dispatch) => {
    try {
        dispatch({
            type: BLOGS_REQUEST
        })

        const data = await axios.get('https://localhost:5000/blog')

        dispatch({
            type: BLOGS_SUCCESS,
            payload: data.data.blogs
        })

    } catch (error) {
        dispatch({
            type: BLOGS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const addBlog = (user, title, article) => async (dispatch) => {
    const data = await axios.post('https://localhost:5000/blog/add', { 'user': user, 'title': title, 'article': article })

    dispatch({
        type: ADD_BLOG,
        payload: data.data.blog
    })

}

export const editBlog = (id, title, article) => async (dispatch) => {
    const data = await axios.put(`https://localhost:5000/blog/update/${id}`, { 'title': title, 'article': article })

    dispatch({
        type: EDIT_BLOG,
        payload: data.data.blog
    })
}

export const deleteBlog = (id) => async (dispatch) => {
    const data = await axios.delete(`https://localhost:5000/blog/delete/${id}`)

    dispatch({
        type: DELETE_BLOG,
        payload: data.data.message
    })
}
