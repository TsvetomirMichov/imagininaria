import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Avatar, Drawer, Tooltip } from '@mui/material'
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageIcon from '@mui/icons-material/Language';
import { auth, firestore } from '../../pages/lib/firebase';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect } from 'react';
import ImagianariaLogo from '../../images/imaginaria-bw.png'

import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 1),
    color: alpha(theme.palette.common.black, 0.60),
    border: '1px solid  lightgray',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    borderRadius: '1.5em',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '40%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    textAlign: 'center',
    justifyContent: 'center',
    '& .MuiInputBase-input': {
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%', // Set width to 100% to make it full width
        [theme.breakpoints.up('md')]: {
            width: '100%', // Adjust this value to control the width on larger screens if needed
        },
    },
}));

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        minWidth: 100,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const CustomLink = styled(Link)(({ theme }) => ({
    color: alpha(theme.palette.common.black, 0.60),
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '1em',
    alignItems: 'center',
    display: 'flex',
    padding: theme.spacing(0, 2),

}));

const CustomEmailIcon = styled(EmailOutlinedIcon)(({ theme }) => ({
    width: '0.8em',
    height: '0.8em',
    marginRight: theme.spacing(3),
    color: theme.palette.common.white,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Black background with 80% opacity
    borderRadius: '10em',
    padding: '0.4em',

}));


const linkStyles = {
    color: 'white',
    textDecoration: 'none',
    py: 2,
};

export default function Navbar() {

    const [open, setOpen] = useState(false);

    const [ifUser, setIfUser] = useState('')
    const [loggedUser, setLoggedUser] = useState([{}])

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const auth = getAuth()
    let user = auth.currentUser

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    React.useEffect(() => {
        const getData = async () => {
            if (user) {
                try {
                    const q = query(collection(firestore, "users"), where("userId", "==", user.uid));
                    const querySnapshot = await getDocs(q);

                    if (querySnapshot.empty) {
                        // console.log("No matching posts found.");
                        return null; // Return null if no matching posts are found
                    }

                    querySnapshot.forEach((doc) => {
                        const res = doc.data()
                        // console.log('res data', res)
                        setLoggedUser(res);
                    });

                } catch (error) {
                    console.error("Error getting post:", error);
                    return null;
                }
            }
        };
        getData();

    }, []);

    React.useEffect(() => {
        const unsubscribe = () => {
            if (!localStorage.getItem("userId")) {
                setIfUser('')
            } else if (localStorage.getItem("userId")) {
                const userUid = localStorage.getItem("userId");
                setIfUser(userUid);
            }
        };

        unsubscribe();
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // Function to handle scroll event

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openCategory = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        signOut(auth).then(() => {
            setAllert('success')
            setOpenAllert(true);
            localStorage.removeItem('userId')
        }).catch((error) => {
            setAllert('error')
        });
    }

    const [searchKeywords, setSearchKeywords] = useState('');
    // console.log('searched key words ', searchKeywords)

    let navigate = useNavigate()

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && searchKeywords !== '') {
            navigate(`/filter/${searchKeywords}`); // Navigate to the FilterGallery with keywords
        } else if (event.key === 'Enter' && searchKeywords == '') {
            navigate(`/filter/${'all'}`); // Navigate to the FilterGallery with keywords

        }
    };
    console.log(loggedUser);
    return (
        <Box sx={{ flexGrow: 1, zIndex: 100, width: '100%' }}>
            <AppBar position="static" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
                <Toolbar  >
                    <Link to='/' style={{ textDecoration: 'none', width: '10em', height: '2em', }}>

                        <img src={ImagianariaLogo} alt="logo" style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover'
                        }} />

                    </Link>
                    <Search sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search by style,medium or artist"
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchKeywords}
                                onChange={(e) => setSearchKeywords(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                        </Box>
                
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="My Account">
                            <IconButton onClick={handleOpenUserMenu} sx={{ px: 5, display: { xs: 'none', sm: 'block' } }}>
                                <Avatar alt="Remy Sharp" src={loggedUser?.profileImage} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '3em' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                {
                                    loggedUser ?
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Link to={`/user/:${ifUser}`} style={{
                                                textDecoration: 'none',
                                                color: 'black'
                                            }} >
                                                My Account
                                            </Link>
                                            <Button onClick={handleLogout} sx={{
                                                color: 'black',
                                                fontWeight: 500,
                                                alignItems: 'center',
                                                backgroundColor: 'white',
                                                mt: '1em',
                                            }}>
                                                Log out
                                            </Button>
                                        </Box>
                                        :
                                        <Link to="/becomeACreator" sx={{
                                            px: '1em',
                                            color: 'white',
                                            fontWeight: 600,
                                            fontSize: '0.9em',
                                            alignItems: 'center',
                                            textDecoration: 'none', // Add this to remove underline
                                        }}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'black'

                                            }}>
                                            Log in
                                        </Link>
                                }
                            </MenuItem>
                        </Menu>
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                        <IconButton edge="start" aria-label="menu" onClick={handleDrawerOpen} sx={{ display: { xs: 'flex', md: 'flex' }, mr: 2, p: 0, color: 'black' }}>
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    <Drawer
                        anchor="right"
                        open={open}
                        onClose={handleDrawerClose}
                        sx={{
                            display: { xs: 'flex', sm: 'flex' },
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-end',
                                width: '90vw',
                                height: '100%',
                                py: 5,
                                px: 3,
                                backgroundColor: 'white',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-end',
                                    width: '100%',
                                    height: '2em',
                                    alignItems: 'center',
                                    mb: 4,
                                }}
                            >
                                <Link to='/' style={{ textDecoration: 'none', width: '15em', height: '3em' }}>
                                    <img
                                        src={ImagianariaLogo}
                                        alt="logo"
                                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                    />
                                </Link>
                                <IconButton onClick={handleDrawerClose} sx={{ color: 'black' }}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                            <Link
                                to="/"
                                style={{
                                    color: 'black',
                                    textDecoration: 'none',
                                    fontSize: '2em',
                                    padding: '0.5em',
                                    fontWeight: 'bold'
                                }}
                            >
                                Home
                            </Link>
                            <Link
                                to="/about"
                                style={{
                                    color: 'black',
                                    textDecoration: 'none',
                                    fontSize: '2em',
                                    padding: '0.5em',
                                    fontWeight: 'bold'
                                }}
                            >
                                About Us
                            </Link>
                            <Link
                                to="/newPost"
                                style={{
                                    color: 'black',
                                    textDecoration: 'none',
                                    fontSize: '2em',
                                    padding: '0.5em',
                                    fontWeight: 'bold'
                                }}
                            >
                                Create Post
                            </Link>
                            <Link
                                to="/contact"
                                style={{
                                    color: 'black',
                                    textDecoration: 'none',
                                    fontSize: '2em',
                                    padding: '0.5em',
                                    fontWeight: 'bold'
                                }}
                            >
                                Contact Us
                            </Link>
                            {
                                loggedUser?.profileImage ?
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Link to={`/user/:${ifUser}`} style={{
                                            color: 'black',
                                            textDecoration: 'none',
                                            fontSize: '2em',
                                            padding: '0.5em',
                                            fontWeight: 'bold'
                                        }} >
                                            My Account
                                        </Link>
                                    </Box>
                                    :
                                    <Link to="/becomeACreator" sx={{
                                        px: '1em',
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: '0.9em',
                                        alignItems: 'center',
                                        textDecoration: 'none', // Add this to remove underline
                                    }}
                                    style={{
                                        color: 'black',
                                        textDecoration: 'none',
                                        fontSize: '2em',
                                        padding: '0.5em',
                                        fontWeight: 'bold'
                                    }}>
                                        Log in
                                    </Link>
                            }
                            <Link to="/signup" sx={{
                                px: '1em',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.9em',
                                alignItems: 'center',
                                textDecoration: 'none', // Add this to remove underline
                            }}
                            style={{
                                color: 'black',
                                textDecoration: 'none',
                                fontSize: '2em',
                                padding: '0.5em',
                                fontWeight: 'bold'
                            }}>
                                Register
                            </Link>
                            {/* Instagram Link */}
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                mt: 'auto'
                            }}>
                                <Link
                                    to="https://www.instagram.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: 'black',
                                        textDecoration: 'none',
                                        fontSize: '1.5em',
                                        padding: '0.5em'
                                    }}
                                >
                                    <InstagramIcon sx={{ fontSize: '2em', mr: '0.5em' }} />

                                </Link>
                                {/* Twitter Link */}
                                <Link
                                    to="https://twitter.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: 'black',
                                        textDecoration: 'none',
                                        fontSize: '1.5em',
                                        padding: '0.5em'
                                    }}
                                >
                                    <TwitterIcon sx={{ fontSize: '2em', mr: '0.5em' }} />
                                </Link>
                            </Box>
                        </Box>
                    </Drawer>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
