import React, { useState, useEffect } from 'react'
import { Typography, TextField, Card, CardContent, Button, Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { bloglist, addBlog, editBlog, deleteBlog } from '../redux/actions/blogActions'

const SHeading = styled(Typography)({
    fontFamily: 'Staatliches',
    fontSize: '700%',
    textShadow: '3px 3px #F4D03F',
    color: '#2E86C1',
    marginTop: '96px',
    padding: '16px'
})

const SCard = styled(Card)({
    minWidth: '275px',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '16px'
})

const SButton1 = styled(Button)({
    backgroundImage: 'linear-gradient(to right, #F39C12, #F4D03F )',
    color: '#FFFFFF',
    textTransform: 'none',
    borderRadius: '8px',
    margin: '12px',
    padding: '12px',
    '&:hover': {
        backgroundImage: 'linear-gradient(to right, #F39C12, #F1C40F)',
        color: '#FFFFFF'
    }
})

const SIconButton1 = styled(IconButton)({
    background: '#2E86C1',
    color: '#FFFFFF',
    '&:hover': {
        backgroundImage: '#FFFFFF',
        color: '#2E86C1'
    }
})

const SIconButton2 = styled(IconButton)({
    background: '#FF0000',
    color: '#FFFFFF',
    marginRight: '8px',
    '&:hover': {
        backgroundImage: '#FFFFFF',
        color: '#FF0000'
    }
})

function Home() {
    const [title, setTitle] = useState('')
    const [article, setArticle] = useState('')
    const [message, setMessage] = useState('')
    const [blogID, setBlogID] = useState('')
    const [blogEdit, setBlogEdit] = useState(false)
    const [showAddBlog, setShowAddBlog] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newArticle, setNewArticle] = useState('')

    const dispatch = useDispatch()
    const blogList = useSelector(state => state.userBlogs)
    const { error, loading, blogs } = blogList
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const AddBlog = async () => {
        const user = userInfo.id
        if (!title && !article) {
            setMessage('ENTER TITLE AND ARTICLE!')
            setTimeout(() => {
                setMessage('')
            }, 1000)
        }
        else {
            await dispatch(addBlog(user, title, article))
            dispatch(bloglist())
            setTitle('')
            setArticle('')
        }
    }

    const GetBlogID = (id, title, article) => {
        setBlogEdit(true)
        setBlogID(id)
        setNewTitle(title)
        setNewArticle(article)
    }

    const EditBlog = async (e) => {
        await dispatch(editBlog(blogID, newTitle, newArticle))
        dispatch(bloglist())
        setBlogEdit(false)
    }

    useEffect(() => {
        dispatch(bloglist())
    }, [dispatch, userInfo])

    const DeleteBlog = async (id) => {
        await dispatch(deleteBlog(id))
        dispatch((bloglist()))
    }

    return (
        <div>
            <Box textAlign='left' sx={{ backgroundImage: 'linear-gradient(to right, #FFFFFF, #F4D03F, #F39C12)', height: 65 }} />
            {!userInfo ?
                <>
                    <SHeading>
                        Blog App
                    </SHeading>

                    <Typography variant='body2' sx={{ color: '#2E86C1' }}>
                        BLOG APP USING MERN STACK
                    </Typography>
                </> :
                null
            }

            {userInfo ?
                <>
                    {!showAddBlog &&
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundImage: 'linear-gradient(to right, #FFFFFF, #F4D03F, #F39C12)', p: 2 }}>
                            <Box>
                                <SButton1 onClick={() => setShowAddBlog(true)}>
                                    Add Blog
                                </SButton1>
                            </Box>

                            <Box>
                                <Typography variant='body1' sx={{ color: '#FFFFFF' }}>
                                    Hello! {userInfo.name}
                                </Typography>
                            </Box>
                        </Box>
                    }
                    {showAddBlog ?
                        <SCard>
                            <CardContent>
                                <Box textAlign='right'>
                                    <SIconButton1 onClick={() => setShowAddBlog(false)}>
                                        <CloseIcon fontSize='small' />
                                    </SIconButton1>
                                </Box>

                                {message && <Typography variant='caption' sx={{ color: '#FF0000' }}>{message}</Typography>}
                                <TextField fullWidth
                                    id='outlined-size-small'
                                    label='Title'
                                    type='text'
                                    size='small'
                                    value={title}
                                    sx={{ mt: 2, mb: 2 }}
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                                <TextField fullWidth
                                    id='outlined-multiline-static'
                                    label='Article'
                                    multiline
                                    rows={3}
                                    value={article}
                                    onChange={(e) => setArticle(e.target.value)}
                                />

                                <SButton1 onClick={AddBlog}>
                                    <Typography variant='body1'>
                                        Add Blog
                                    </Typography>
                                </SButton1>
                            </CardContent>
                        </SCard> :
                        null
                    }

                    {blogEdit ?
                        <SCard>
                            <CardContent>
                                <Box textAlign='right' sx={{ mb: 2 }}>
                                    <SIconButton1 onClick={() => setBlogEdit(false)}>
                                        <CloseIcon fontSize='small' />
                                    </SIconButton1>
                                </Box>

                                <TextField fullWidth
                                    id='outlined-size-small'
                                    label='New Title'
                                    type='text'
                                    size='small'
                                    value={newTitle}
                                    sx={{ mb: 2 }}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                />

                                <TextField fullWidth
                                    id='outlined-multiline-static'
                                    label='New Article'
                                    multiline
                                    rows={3}
                                    value={newArticle}
                                    onChange={(e) => setNewArticle(e.target.value)}
                                />

                                <SButton1 onClick={EditBlog}>
                                    <Typography variant='body1'>
                                        Save
                                    </Typography>
                                </SButton1>
                            </CardContent>
                        </SCard>
                        : null
                    }

                    {error && <Typography variant='caption' sx={{ color: '#FF0000' }}>{error}</Typography>}
                    {loading && <Typography variant='caption' sx={{ color: '#000000' }}>LOADING</Typography>}

                    {blogs.map(Blog => {
                        return (
                            <Card key={Blog._id} sx={{ m: 2 }}>
                                <CardContent sx={{ textAlign: 'left', p: 2 }}>
                                    <Box>
                                        <Typography variant='h6'>
                                            {Blog.title}
                                        </Typography>

                                        <Typography variant='body1'>
                                            {Blog.article}
                                        </Typography>

                                        <Box textAlign='right'>
                                            <Typography variant='subtitle2'>
                                                {Blog.user.name}
                                            </Typography>

                                            {Blog.user._id === userInfo.id
                                                ? <>
                                                    <SIconButton2 onClick={() => DeleteBlog(Blog._id)}>
                                                        <DeleteIcon />
                                                    </SIconButton2>

                                                    <SIconButton1 onClick={() => GetBlogID(Blog._id, Blog.title, Blog.article)}>
                                                        <EditIcon />
                                                    </SIconButton1>
                                                </>
                                                : null
                                            }
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        )
                    })}
                </>
                : null
            }
        </div>
    )
}

export default Home
