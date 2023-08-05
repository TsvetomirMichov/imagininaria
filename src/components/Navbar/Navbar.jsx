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
import { Link } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Drawer, ListItem, ListItemIcon, ListItemText, List } from '@mui/material'
import { useState } from 'react';

import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageIcon from '@mui/icons-material/Language';


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
    '& .MuiInputBase-input': {
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
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



export default function Navbar() {

    const [open, setOpen] = useState(false);

    const [ifUser,setIfUser]=useState('')

    React.useEffect(() => {
        const unsubscribe = () => {
            if (!localStorage.getItem("userId")) {
                setIfUser('')
            }else if(localStorage.getItem("userId")){
              const userUid=localStorage.getItem("userId");
              setIfUser(userUid);
            }
        };
    
        unsubscribe();
      },[]);

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

    const StyledList = styled(List)({
        width: "90vw",
    });

    const StyledLink = styled(Link)({
        textDecoration: "none",
    });

    return (
        <Box sx={{ flexGrow: 1, zIndex: 100,maxWidth:'100%' }}>
            <AppBar position="static" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
                <Toolbar  >
                    <Link to='/' style={{ textDecoration: 'none' }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block', color: 'black', pr: '10em', fontWeight: 700 } }}
                        >
                        Imaginaria
                    </Typography>
                        </Link>
                    <Search sx={{display:'flex',justifyContent:'space-between'}}>
                        <Box>

                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search AI generated images"
                            inputProps={{ 'aria-label': 'search' }}
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
                            endIcon={<KeyboardArrowDownIcon  />}
                            sx={{
                                bgcolor: 'white',
                                border: '1px solid lightgray',
                                borderRadius: '0.9em',
                                color: 'black',
                                padding: '0.5em',
                                ml:'auto',
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
                            <MenuItem onClick={handleClose} disableRipple>
                                <EditIcon />
                                All
                            </MenuItem>
                            <Divider sx={{ my: 0.5 }} />
                            <MenuItem onClick={handleClose} disableRipple>
                                <FileCopyIcon />
                                Ilustations
                            </MenuItem>
                            <MenuItem onClick={handleClose} disableRipple>
                                <ArchiveIcon />
                                Archive
                            </MenuItem>
                        </StyledMenu>
                        {/* Category   */}
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <CustomLink to="/about">About Freeflo</CustomLink>
                        <CustomLink to={ifUser!=='' ? "/newPost":"/becomeACreator"}>{ifUser!=='' ? "Create post":'Become a creator'  }</CustomLink>
                        <Link href="/contact">
                            <CustomEmailIcon />
                        </Link>

                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'hidden' } }}>
                        <IconButton edge="start" aria-label="menu" onClick={handleDrawerOpen} sx={{ display: { xs: 'flex', md: 'none' }, ml: 0, p: 0, color: 'black' }}>
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    <Drawer anchor="right" open={open} onClose={handleDrawerClose} sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none', width: '100vw' } }}>

                        <StyledList>
                            <ListItem button key="Home">
                                <StyledLink to="/" >
                                    <ListItemText primary="Home" />
                                </StyledLink>
                            </ListItem>
                            <ListItem button key="About">
                                <StyledLink to="/products/men" >
                                    <ListItemText primary="Men" />
                                </StyledLink>
                            </ListItem>
                            <ListItem button key="Contact">
                                <StyledLink to="/products/women" >
                                    <ListItemText primary="Women" />
                                </StyledLink>
                            </ListItem>
                        </StyledList>
                    </Drawer>
                </Toolbar>
            </AppBar>
        </Box>
    );
}