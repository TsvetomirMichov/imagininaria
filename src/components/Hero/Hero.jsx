import { Box, Link, Typography, alpha, styled, Drawer, ListItem, ListItemIcon, ListItemText, List, IconButton, Alert, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import HeroImage from '../../images/heroImage.png'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageIcon from '@mui/icons-material/Language';
import { auth } from '../../pages/lib/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

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
        minWidth: 180,
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

const BoxContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyItems: 'center',
    marginTop: '1.5em',
    [theme.breakpoints.down('sm')]: {
        alignItems: 'start',
        justifyItems: 'flex-start',
        marginTop: '-2em',
    },
    pt: '4.7em',

}))


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '0.5em',
    backgroundColor: alpha(theme.palette.common.white, 0.95),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.95),
    },

    marginLeft: "0.5em",
    width: '95%',
    height: '3.5em',
    padding: 2,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '50%',
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
    width: '100%',
    height: '100%',
    fontSize: '1.2em',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
       width: '20em', // Set width to 100% to make it full width
        [theme.breakpoints.up('md')]: {
         width: '20em', // Adjust this value to control the width on larger screens if needed
        },
    },
}));


const StyledList = styled(List)({
});

const StyledLink = styled(Link)({
    textDecoration: "none",
});


const Hero = () => {

      // Input base 
      const [searchKeywords, setSearchKeywords] = useState('');
    //   console.log('searched key words ', searchKeywords)
  
      let navigate = useNavigate()
  
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openCategory = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const auth = getAuth();
    let user = auth.currentUser

    const [alert, setAllert] = useState('')
    const [openAlert, setOpenAllert] = useState(false)


    const handleLogout = () => {
        signOut(auth).then(() => {
            setAllert('success')
            setOpenAllert(true);
            localStorage.removeItem('userId')
        }).catch((error) => {
            setAllert('error')
        });
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAllert(false);
    };

  
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && searchKeywords !== '') {
            navigate(`/filter/${searchKeywords}`); // Navigate to the FilterGallery with keywords
        } else if(event.key === 'Enter' && searchKeywords == '') {
            navigate(`/filter/${'all'}`); // Navigate to the FilterGallery with keywords

        }
    };

    // Input base 

    return (
        <Box sx={{
            width: '100%', height: { xs: '25vh', sm: '40vh', md: '60vh' }, backgroundImage: `url(${HeroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            backgroundColor: alpha('#000', 1),

        }}>

            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                pt: '4em',
                alignItems: 'center',
                alignContent: 'center',

            }}>
                <IconButton edge="start" aria-label="menu" onClick={handleDrawerOpen} sx={{ display: { xs: 'flex', md: 'none' }, ml: 0, p: 0, zIndex: 1000, color: '#fce4ec' }}>
                    <MenuIcon />
                </IconButton>

                <Link href="/about" sx={{
                    color: 'white',
                    fontWeight: 500,
                    fontSize: '0.9em',
                    alignItems: 'center',
                    display: { xs: 'none', md: 'flex' }

                }}>
                    About Imaginaria
                </Link>
                {/* Login in or not */}
                {
                    user ?
                        <Button onClick={handleLogout} sx={{
                            px: '1em',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.9em',
                            alignItems: 'center',
                            display: { xs: 'none', md: 'flex' }
                        }}>
                            Log out
                        </Button>
                        :
                        <Link href="/becomeACreator" sx={{
                            px: '1em',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.9em',
                            alignItems: 'center',
                            display: { xs: 'none', md: 'flex' }
                        }}>
                            Log in
                        </Link>
                }
                {/* Login in or not */}
                <Link href="/contact">
                    <EmailOutlinedIcon sx={{
                        width: '0.8em',
                        height: '0.8em',
                        mr: '3em',
                        color: 'white',
                        backgroundColor: 'black',
                        borderRadius: '10em',
                        padding: '0.4em',
                        ":hover": {
                            backgroundColor: 'gray'
                        },
                        display: { xs: 'none', md: 'flex' }
                    }} />
                </Link>
            </Box>
            <BoxContainer >
                <Typography sx={{ fontSize: '2.3em', color: 'white' }}>imaginaria</Typography>
                <Typography sx={{ fontSize: '1.2em', mb: '2em', color: 'white', display: { xs: 'none', sm: 'flex' } }}>Free, curated AI images and prompts for creative projects</Typography>
                <Search sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search AI generated images"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchKeywords}
                            onChange={(e) => setSearchKeywords(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </Box>
                    {/* Category */}
                    <Button
                        id="demo-customized-button"
                        aria-controls={openCategory ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openCategory ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon s />}
                        sx={{
                            bgcolor: 'white',
                            border: '1px solid lightgray',
                            borderRadius: '0.9em',
                            color: 'black',
                            padding: '0.5em',
                            ":hover": {
                                bgcolor: 'white',
                            }
                        }}
                    >
                        <LanguageIcon sx={{ color: 'black' }} />    All
                    </Button>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={openCategory}
                        onClose={handleClose}
                    >
                      <MenuItem onClick={()=>navigate(`/filter/${'all'}`)} disableRipple>
                            <EditIcon />
                                All
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={()=>navigate(`/filter/${'Ilustations'}`)} disableRipple>
                            <AddAPhotoIcon />
                            Phototgraphy
                        </MenuItem>
                        <MenuItem onClick={()=>navigate(`/filter/${'Ilustations'}`)} disableRipple>
                            <FileCopyIcon />
                            Illustrations
                        </MenuItem>
                        <MenuItem onClick={()=>navigate(`/filter/${'Style'}`)} disableRipple>
                            <ArchiveIcon />
                            Style
                        </MenuItem>


                    </StyledMenu>


                    {/* Category */}
                </Search>

            </BoxContainer>

            <Drawer anchor="right" open={open} onClose={handleDrawerClose} sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none', width: '100vw' } }}>

                <Drawer anchor="right" open={open} onClose={handleDrawerClose} sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none', width: '100vw', bgcolor: 'black', color: 'white' } }}>

                    <Box>
                        <Typography>
                            Home
                        </Typography>
                    </Box>
                </Drawer>
            </Drawer>


            <Snackbar open={openAlert} autoHideDuration={6000}>
                <Alert onClose={handleCloseAlert} severity={alert} sx={{ width: '100%' }}>
                    {alert} output!
                </Alert>
            </Snackbar>

        </Box>
    )
}

export default Hero

