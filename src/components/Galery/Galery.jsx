import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Avatar, Button, Menu, MenuItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import { listAll } from 'firebase/storage';
import { firestore, storage } from "../../pages/lib/firebase"
import { ref, getDownloadURL } from "firebase/storage";
import { useState } from 'react';
import { useEffect } from 'react';
import TransparentBackdrop from '../TransparentBackdrop/TransparentBackdrop';
import './galery.css'; // Import your custom CSS file
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import styled from '@emotion/styled';
import Collapse from '@mui/material/Collapse';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Galery() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is small (less than or equal to 'sm' breakpoint)
  const [dataImg, setDataImg] = useState([])
  const [imgUrl, setImageUrl] = useState('')
  const [imgTitle, setImageTitle] = useState('')

  const [checked, setChecked] = React.useState(false);
  const [state, setState] = React.useState(false); // This is to fix menu bug
  const [checkedSecond, setCheckedSecond] = React.useState(false);

  const handleMouseEnterImage = () => {
    setChecked(true);
  };

  const handleMouseLeaveImage = () => {
    setChecked(false);
  };

  const handleMouseEnterImageSecond = () => {
    setCheckedSecond(true)
  };

  const handleMouseLeaveImageSecond = () => {
    setCheckedSecond(false);
  };

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={state}
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

  const [isBackdropOpen, setIsBackdropOpen] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleCloseBackdrop = () => {
    setIsBackdropOpen(false);
  };

  const handleOpen = (url, title) => {
    setIsBackdropOpen(true);
    setImageUrl(url)
    setImageTitle(title)
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openCategory = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseButton = () => {
    setAnchorEl(null);
  };

  const columns = isSmallScreen ? 1 : 3; // Set the number of columns based on the screen size

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(firestore, "posts"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("No matching posts found.");
          return;
        }

        const imageItems = querySnapshot.docs.map((doc) => doc.data());
        // console.log('image items : ', imageItems)

        setDataImg(imageItems);
      } catch (error) {
        console.error("Error getting posts:", error);
      }
    };

    fetchData();
  }, []);

  // console.log('data img',dataImg);

  const [hoveredUser, setHoveredUser] = useState([{}]);

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const q = query(collection(firestore, "users"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("No matching posts found.");
          return null; // Return null if no matching posts are found
        }

        querySnapshot.forEach((doc) => {
          const res = doc.data()
          // console.log('doc found :', res)

          setHoveredUser(res);
          // console.log('hover user', hoveredUser.bio)
          // console.log("logeed ;", loggedUser)
        });

      } catch (error) {
        console.error("Error getting user data:", error);
      }
    };

    if (hoveredIndex !== null && hoveredIndex >= 0 && hoveredIndex < dataImg.length) {
      const userId = dataImg[hoveredIndex].userId;
      // console.log('userId', userId);
      fetchUserData(userId);
    }
  }, [hoveredIndex, dataImg]);

  // console.log(dataImg)

  const handleCopyText = () => {
    // Copy the prompt text to the clipboard
    navigator.clipboard.writeText(dataPost.prompt);
};
  

  return (

    <Box sx={{ maxWidth: '100vw', height: '100vh', p: { xs: 0, sm: 10 } }} className="image-list-container">
      <TransparentBackdrop open={isBackdropOpen} onClose={handleCloseBackdrop} url={imgUrl} title={imgTitle} />

      <ImageList variant="masonry" cols={columns} gap={8}>
        {dataImg.map((item, index) => (
          <div
            key={index}
            className="image-list-item"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <ImageListItem>
              <img
                src={`${item.imageData}?w=148&fit=crop&auto=format`}
                srcSet={`${item.imageData}?w=148&fit=crop&auto=format&dpr=2 2x`}
                alt={item.prompt}
                loading="lazy"
                onClick={() => handleOpen(item.imageData, item.prompt)}
              />
            </ImageListItem>

            {hoveredIndex === index && (
              <div className="hovered-element" style={{ margin: '0.5em', width: '90%', justifyContent: 'space-between', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                {/* User  */}
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',

                }} gap={3}>
                  <Avatar alt='acount image' sx={{
                    width: '2em',
                    height:'2em',
                    ml:'1em'
                  }} src={hoveredUser.profileImage} />
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'

                  }} >
                    <Link to={`/user/:${hoveredUser.userId}`} style={{
                      textDecoration: 'none',
                      color: 'black',
                      
                    }} >
                   <Typography variant='h6' sx={{
                        color: 'white',

                      }}>
                        {hoveredUser.name}
                      </Typography>
                    </Link>
                  </Box>
                </Box>
                {/* User  */}

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Box
                    onMouseEnter={handleMouseEnterImage}
                    onMouseLeave={handleMouseLeaveImage}
                    px={1.5}

                  >
                    <Collapse orientation="horizontal" in={checked} collapsedSize={25}>
                      <Box sx={{
                        width: '8em',
                        display: 'flex',
                        backgroundColor: 'black',
                        color: 'white',
                        borderRadius: '0.2em',
                        ":hover": {
                          bgcolor: 'black', // Keep the background black on hover
                          color: 'white',
                        }
                      }}>
                        <Box>
                          <Button
                            sx={{
                              width: '9.6em',
                              fontSize: '0.6em',
                              bgcolor: 'black',
                              color: 'white',
                              ":hover": {
                                bgcolor: 'black', // Keep the background black on hover
                                color: 'white',
                              }
                            }}
                          >
                            <ArrowCircleDownIcon sx={{ width: '2.9em' }} /> <Typography fontSize={'0.9em'} pr={'1.6em'}>  Download</Typography>
                          </Button>
                        </Box>
                      </Box>
                    </Collapse>
                  </Box>
                  <Collapse  orientation="horizontal" in={checkedSecond} collapsedSize={30} sx={{ borderRadius: '0.2em',zIndex:1 }}>
                    <Box onMouseEnter={handleMouseEnterImageSecond}
                      onMouseLeave={handleMouseLeaveImageSecond}>
                      <Button
                        sx={{
                          width: '15em',
                          backgroundColor: 'black',
                          color: 'white',
                          fontSize: '0.6em',
                          ml: '-0.9em',
                          ":hover": {
                            bgcolor: 'black', // Keep the background black on hover
                            color: 'white',
                          }
                        }}
                        endIcon={<KeyboardArrowDownIcon />}
                        onClick={handleClick}
                      >
                        <ContentCopyIcon sx={{ width: '0.9em', pr: 2 }} /> <Typography fontSize={'0.9em'}>  Get prompt </Typography>
                      </Button>
                      <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                          'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={openCategory && Boolean(anchorEl)} // Check if anchorEl is truthy
                        onClose={handleCloseButton}
                      >
                        <MenuItem onClick={handleCopyText} sx={{ width: 'auto', height: '100%' }}>
                          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              fontSize: '0.7em',
                              maxWidth: '10em',
                            }}>
                            {item.prompt}
                            </Typography>
                          </div>
                        </MenuItem>
                      </StyledMenu>
                    </Box>
                    {/* End */}
                  </Collapse>
                </Box>
              </div>
            )}
          </div>
        ))}
      </ImageList>
    </Box>
  );
}
