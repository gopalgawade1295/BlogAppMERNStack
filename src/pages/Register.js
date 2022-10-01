import React, { useState, useEffect } from 'react'
import { Toolbar, Typography, Button, Card, CardContent, TextField } from '@mui/material'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/actions/userActions'

const SCard = styled(Card)({
  minWidth: '275px',
  maxWidth: '500px',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '16px'
})

const SButton = styled(Button)({
  backgroundImage: 'linear-gradient(to right, #F39C12, #F1C40F)',
  color: '#FFFFFF',
  textTransform: 'none',
  borderRadius: '8px',
  margin: '8px',
  padding: '12px',
  '&:hover': {
    backgroundImage: 'linear-gradient(to right, #F39C12, #F1C40F)',
    color: '#FFFFFF'
  }
})

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const userRegister = useSelector(state => state.userRegister)
  const { error, loading, userInfo } = userRegister
  const navigate = useNavigate()

  const Register = (e) => {
    e.preventDefault()
    dispatch(register(name, email, password))
    console.log(name, email, password);
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, dispatch, userInfo])

  return (
    <div>
      <Toolbar sx={{ mb: 3 }} />
      <SCard>
        <CardContent>
          <Typography variant='h3' sx={{ color: '#E67E22', fontFamily: 'Staatliches', m: 2 }}>
            SIGN UP
          </Typography>

          {loading && <Typography variant='caption'>Loading</Typography>}
          {error && <Typography variant='caption' sx={{ color: '#FF0000' }}>{error}</Typography>}
          <br />

          <TextField fullWidth
            id='outlined-size-small'
            label='Name'
            type='text'
            size='small'
            value={name}
            sx={{ mb: 2 }}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField fullWidth
            id='outlined-size-small'
            label='Email'
            type='email'
            size='small'
            value={email}
            sx={{ mb: 2 }}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField fullWidth
            id='outlined-size-small'
            label='Password'
            type='password'
            size='small'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <SButton onClick={Register}>
            <Typography variant='body1'>
              Sign up
            </Typography>
          </SButton>
        </CardContent>
      </SCard>
    </div>
  )
}

export default Register
