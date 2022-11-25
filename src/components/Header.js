import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Avatar, Tooltip, Menu, MenuItem } from '@mui/material'
import WebIcon from '@mui/icons-material/Web'
import LoginIcon from '@mui/icons-material/Login'
import EditIcon from '@mui/icons-material/Edit'
import styled from '@emotion/styled'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions/userActions'

const SLink = styled(Link)({
    textDecoration: 'none',
    color: '#FFFFFF'
})

const SIconButton = styled(IconButton)({
    background: '#000000',
    color: '#FFFFFF',
    '&:hover': {
        backgroundImage: '#000000',
        color: '#FFFFFF'
    }
})

const SAvatar = styled(Avatar)({
    background: '#1B4F72',
    border: '5px solid #D35400'
})

function Header() {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const Logout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <div>
            <AppBar elevation={0} sx={{ background: '#000000' }}>
                <Toolbar>
                    <SLink to='/'>
                        <Typography variant='h6'>
                            <SIconButton>
                                <WebIcon />
                            </SIconButton>
                            Blog App
                        </Typography>
                    </SLink>

                    {userInfo ?
                        <Toolbar sx={{ ml: 'auto' }}>
                            <SLink to='/myblogs'>
                                <Typography variant='body1' sx={{ p: 2 }}>
                                    My blogs
                                </Typography>
                            </SLink>

                            <IconButton
                                onClick={handleClick}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <SAvatar>
                                    {userInfo.name[0]}
                                </SAvatar>
                            </IconButton>
                        </Toolbar> :
                        <Toolbar sx={{ ml: 'auto' }}>
                            <SLink to='/login'>
                                <Typography variant='body1' sx={{ p: 2 }}>
                                    Log in
                                    <IconButton sx={{ color: '#FFFFFF' }}>
                                        <LoginIcon />
                                    </IconButton>
                                </Typography>
                            </SLink>

                            <SLink to='/register'>
                                <Typography variant='body1'>
                                    Sign up
                                    <IconButton sx={{ color: '#FFFFFF' }}>
                                        <EditIcon />
                                    </IconButton>
                                </Typography>
                            </SLink>
                        </Toolbar>
                    }
                </Toolbar>
            </AppBar>

            <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 2px #BDC3C7)',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={Logout}>
                    Log out
                </MenuItem>
            </Menu>
        </div>
    )
}

export default Header
