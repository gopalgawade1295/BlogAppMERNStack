import React, { useState, useEffect } from 'react'
import { Typography, TextField, Card, CardContent, Button, Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { bloglist, addBlog, editBlog, deleteBlog } from '../redux/actions/blogActions'

const SCard = styled(Card)({
  minWidth: '275px',
  maxWidth: '500px',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '16px'
})

const SButton1 = styled(Button)({
  backgroundImage: 'linear-gradient(to right, #D35400, #E67E22)',
  color: '#FFFFFF',
  textTransform: 'none',
  borderRadius: '8px',
  margin: '12px',
  padding: '12px',
  '&:hover': {
    backgroundImage: 'linear-gradient(to right, #BA4A00, #D35400)',
    color: '#FFFFFF'
  }
})

const SIconButton1 = styled(IconButton)({
  background: '#1B4F72',
  color: '#FFFFFF',
  '&:hover': {
    background: '#FFFFFF',
    color: '#1B4F72'
  }
})

const SIconButton2 = styled(IconButton)({
  background: '#CB4335',
  color: '#FFFFFF',
  marginRight: '8px',
  '&:hover': {
    background: '#FFFFFF',
    color: '#CB4335'
  }
})

function MyBlogs() {
  const [title, setTitle] = useState('')
  const [article, setArticle] = useState('')
  const [message, setMessage] = useState('')
  const [blogID, setBlogID] = useState('')
  const [blogEdit, setBlogEdit] = useState(false)
  const [showAddBlog, setShowAddBlog] = useState(false)

  const dispatch = useDispatch()
  const blogList = useSelector(state => state.userBlogs)
  const { error, loading, blogs } = blogList
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const [newTitle, setNewTitle] = useState('')
  const [newArticle, setNewArticle] = useState('')

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

  const DeleteBlog = async (id) => {
    await dispatch(deleteBlog(id))
    dispatch(bloglist())
  }

  useEffect(() => {
    dispatch(bloglist())
  }, [dispatch, userInfo])

  return (
    <div>
      <Box textAlign='left' sx={{ backgroundImage: 'linear-gradient(to right, #F2F4F4, #F39C12, #E67E22, #D35400)', height: 65 }} />
      {userInfo ?
        <>
          {!showAddBlog &&
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundImage: 'linear-gradient(to right, #F2F4F4, #F39C12, #E67E22, #D35400)', p: 2 }}>
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

          {blogs.filter(blog => blog.user._id === userInfo.id).map(Blog => {
            return (
              <Card sx={{ m: 2 }}>
                <CardContent sx={{ textAlign: 'left', p: 2 }}>
                  <Box key={Blog._id}>
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

                      {Blog.user._id === userInfo.id ?
                        <>
                          <SIconButton2 onClick={() => DeleteBlog(Blog._id)}>
                            <DeleteIcon />
                          </SIconButton2>

                          <SIconButton1 onClick={() => GetBlogID(Blog._id, Blog.title, Blog.article)}>
                            <EditIcon />
                          </SIconButton1>
                        </> :
                        null
                      }
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            )
          })}
        </> :
        null
      }
    </div>
  )
}

export default MyBlogs
