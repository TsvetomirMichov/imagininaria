import { Avatar, Backdrop, Box, Button, Menu, MenuItem, Typography, alpha } from '@mui/material';
import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { firestore } from '../../pages/lib/firebase';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styled from '@emotion/styled';

import CloseIcon from '@mui/icons-material/Close';

import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { Link } from 'react-router-dom';

const TransparentBackdrop = ({ open, onClose, url, title }) => {
    // console.log('urlk ', url)
    // console.log('title ', title)
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
        }
    }));

    const [dataPost, setDataPost] = useState({}); // Use an object instead of an array
    const [loggedUser, setLoggedUser] = useState([{}])


    const [anchorEl, setAnchorEl] = React.useState(null);
    const openCategory = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [isDownloadClicked, setIsDownloadClicked] = useState(false);

    const handleDownloadClick = async () => {
        setIsDownloadClicked(true);

        // Replace imageUrl with the actual URL of the image in Firebase Storage
        const imagePath = url;


        const storage = getStorage();
        try {
            const imageUrl = await getDownloadURL(ref(storage, imagePath));

            const downloadLink = document.createElement("a");
            downloadLink.href = imageUrl;
            downloadLink.download = imageUrl; // Set the desired download file name

            document.body.appendChild(downloadLink);
            downloadLink.click();

            document.body.removeChild(downloadLink);

            setIsDownloadClicked(false);
        } catch (error) {
            console.error("Error fetching image:", error);
            setIsDownloadClicked(false);
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const q = query(collection(firestore, "posts"), where("imageData", "==", url));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    console.log("No matching posts found.");
                    return null; // Return null if no matching posts are found
                }

                const post = querySnapshot.docs[0].data();
                setDataPost({ ...post });
                // console.log(dataPost)
            } catch (error) {
                console.error("Error getting post:", error);
                return null;
            }
        };

        getData();
    }, [url]);

    useEffect(() => {
        const getUserData = async () => {
            if (dataPost.userId) {

                try {
                    // console.log('user id : ', dataPost?.userId)
                    const q = query(collection(firestore, "users"), where("userId", "==", dataPost?.userId));
                    const querySnapshot = await getDocs(q);

                    if (querySnapshot.empty) {
                        console.log("No matching posts found.");
                        return null; // Return null if no matching posts are found
                    }

                    querySnapshot.forEach((doc) => {
                        const res = doc.data()
                        setLoggedUser(res);
                        // console.log("logeed ;", loggedUser)
                    });

                } catch (error) {
                    console.error("Error getting post:", error);
                    return null;
                }
            }
        };

        getUserData();
    }, [dataPost]);

    const handleCopyText = () => {
        // Copy the prompt text to the clipboard
        navigator.clipboard.writeText(dataPost.prompt);
    };

    return (
        <Backdrop open={open} style={{ display: 'flex', flexDirection: 'column', zIndex: 999, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <Box sx={{ width: '100%', height: '2em', display: { xs: 'column', sm: 'flex' }, justifyContent: 'space-between', p: 3 }}>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: '2em',
                    ml: '2em'

                }} gap={3}>
                    <Avatar alt='acount image' src={loggedUser.profileImage} sx={{
                        width: '2.5em',
                        height: '2.5em'
                    }} />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }} >

                        <Link to={`/user/:${loggedUser.userId}`} style={{
                            textDecoration: 'none',
                            color: 'black',

                        }} >
                            <Typography variant='h5' sx={{
                                color: 'white',
                                fontWeight: 'semibold',
                            }}>
                                {loggedUser.name}
                            </Typography>
                        </Link>


                        <Typography sx={{
                            color: '#949493',
                            fontSize: '1em'
                        }}>
                            {loggedUser.bio}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: { xs: 'column', sm: 'flex' } }}>
                    {/* Category */}
                    <Button
                        sx={{
                            width: '15em',
                            bgcolor: 'white',
                            color: 'black',
                            fontSize: '0.6em',
                            ":hover": {
                                bgcolor: 'lightgray',
                                color: 'black',
                                fontSize: '0.6em',
                            }
                        }}
                        onClick={handleClick}
                        endIcon={<KeyboardArrowDownIcon />
                        }
                    >
                        <ContentCopyIcon sx={{ width: '0.7em', height: '0.7em' }} />  Get prompt
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
                        <MenuItem onClick={handleCopyText} sx={{ width: 'auto', height: '100%', }}>
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    fontSize: '0.7em',
                                    maxWidth: '10em', // Set a higher maxWidth value
                                }}>
                                    {dataPost.prompt}
                                </Typography>
                            </div>
                        </MenuItem>

                    </StyledMenu>
                    {/* Category   */}
                    <Button
                        sx={{
                            width: '11em',
                            mx: 3,
                            color: isDownloadClicked ? 'white' : 'black', // Customize the color based on the clicked state
                            bgcolor: isDownloadClicked ? 'black' : 'white', // Customize the background color based on the clicked state
                            fontSize: '0.6em',
                            ":hover": {
                                bgcolor: 'lightgray',
                                color: 'black',
                                fontSize: '0.6em',
                            }
                        }}
                        onClick={handleDownloadClick}
                    >
                        Download <ArrowCircleDownIcon />
                    </Button>
                    <Button onClick={onClose} sx={{ width: '1em' }}>
                        <CloseIcon sx={{ color: 'white' }} />
                    </Button>
                </Box>
            </Box>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={`${url}?w=448&fit=crop&auto=format`} srcSet={`${url}?w=448&fit=crop&auto=format&dpr=2 2x`} style={{ objectFit: 'cover', zIndex: 100, width: '25em', height: '25em' }} alt="" />
            </Box>
        </Backdrop>
    );
};

export default TransparentBackdrop;
