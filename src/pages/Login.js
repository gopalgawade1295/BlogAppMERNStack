import React, { useState, useEffect } from 'react'
import { Toolbar, Typography, Button, Card, CardContent, TextField } from '@mui/material'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/userActions'

const SCard = styled(Card)({
    minWidth: '275px',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '16px'
})

const SButton = styled(Button)({
    backgroundImage: 'linear-gradient(to right, #F39C12, #F4D03F )',
    color: '#FFFFFF',
    textTransform: 'none',
    borderRadius: '8px',
    margin: '8px',
    marginBottom: '16px',
    padding: '12px',
    '&:hover': {
        backgroundImage: 'linear-gradient(to right, #F39C12, #F1C40F)',
        color: '#FFFFFF'
    }
})

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const Login = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <div>
            <Toolbar sx={{ mb: 3 }} />
            <SCard>
                <CardContent>
                    <Typography variant='h3' sx={{ color: '#E67E22', fontFamily: 'Staatliches', m: 2 }}>
                        LOG IN
                    </Typography>

                    {loading && <Typography variant='caption'>LOADING</Typography>}
                    {error && <Typography variant='caption' sx={{ color: '#FF0000' }}>{error}</Typography>}

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

                    <SButton onClick={Login}>
                        <Typography variant='body1'>
                            Log in
                        </Typography>
                    </SButton>
                </CardContent>
            </SCard>
        </div>
    )
}

export default Login
