import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Galery from '../../components/Galery/Galery'
import Hero from '../../components/Hero/Hero'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Avatar, Button, Menu, MenuItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import { getStorage, listAll } from 'firebase/storage';
import { firestore } from '../lib/firebase';
import { ref, getDownloadURL } from "firebase/storage";
import { useState } from 'react';
import { useEffect } from 'react';
import TransparentBackdrop from '../../components/TransparentBackdrop/TransparentBackdrop';
import './galery.css'; // Import your custom CSS file
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import styled from '@emotion/styled';
import Collapse from '@mui/material/Collapse';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';

import Popover from '@mui/material/Popover';

const FilterGallery = () => {

  let { keywords } = useParams()


  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is small (less than or equal to 'sm' breakpoint)
  const [dataImg, setDataImg] = useState([])
  const [imgUrl, setImageUrl] = useState('')
  const [imgTitle, setImageTitle] = useState('')

  const [checked, setChecked] = React.useState(false);
  const [state, setState] = React.useState(false); // This is to fix menu bug
  const [checkedSecond, setCheckedSecond] = React.useState(false);

  // Pop over
  const [anchorElPopover, setAnchorElPopover] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorElPopover(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorElPopover(null);
  };
  const [popoverTimer, setPopoverTimer] = useState(null);

  const handlePopoverOpenDelayed = () => {
    // Cancel any existing popover timers
    if (popoverTimer) {
      clearTimeout(popoverTimer);
    }

    // Set a new timer to open the popover after 1 second
    const newTimer = setTimeout(() => {
    }, 2000); // 1000 milliseconds = 1 second

    setPopoverTimer(newTimer);
  };

  const handlePopoverCloseDelayed = () => {
    // Cancel the popover timer when the button is not hovered
    if (popoverTimer) {
      clearTimeout(popoverTimer);
    }

    setPopoverTimer(null);
    handlePopoverClose();
  };


  const open = Boolean(anchorElPopover);
  // Pop over

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
        if (keywords !=='all') {
          let imgDataNew = imageItems.filter(item =>
            item.prompt.toLowerCase().includes(keywords.toLowerCase())
          );
          setDataImg(imgDataNew);
        } else if(keywords == 'all') {
          setDataImg(imageItems);
        }
      } catch (error) {
        console.error("Error getting posts:", error);
      }
    };

    fetchData();
  }, [keywords]);

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

  const handleCopyText = (text) => {
    // Copy the prompt text to the clipboard
    navigator.clipboard.writeText(text);
  };

  const [isDownloadClicked, setIsDownloadClicked] = useState(false);

  const handleDownloadClick = async (url) => {
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


  return (
    <div>
      <Box sx={{ display: 'block',  zIndex: 100, width: '100%',height:'100%' }}>
        <Navbar />

        <TransparentBackdrop open={isBackdropOpen} onClose={handleCloseBackdrop} url={imgUrl} title={imgTitle} />


        <ImageList variant="masonry" cols={columns} gap={8} sx=
          {{
            mt: '10em',
            p: { xs: '0.5em', sm: '5em' }

          }}>
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
                      height: '2em',
                      ml: '1em'
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
                              onClick={() => handleDownloadClick(item.imageData)}
                            >
                              <ArrowCircleDownIcon sx={{ width: '2.9em' }} /> <Typography fontSize={'0.9em'} pr={'1.6em'}>  Download</Typography>
                            </Button>
                          </Box>
                        </Box>
                      </Collapse>
                    </Box>

                    <Collapse orientation="horizontal" in={checkedSecond} collapsedSize={40} sx={{ borderRadius: '0.2em', zIndex: 100 }}>
                      <Box onMouseEnter={handleMouseEnterImageSecond} onMouseLeave={handleMouseLeaveImageSecond} sx={{ zIndex: 10 }}>
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
                          onMouseEnter={handlePopoverOpenDelayed && handlePopoverOpen}
                          onMouseLeave={handlePopoverCloseDelayed}
                          onClick={() => handleCopyText(item.prompt)}
                        >
                          <ContentCopyIcon sx={{ width: '0.9em', pr: 2 }} /> <Typography fontSize={'0.9em'}>  Get prompt </Typography>
                        </Button>
                        <Popover
                          id="mouse-over-popover"
                          sx={{
                            pointerEvents: 'none',
                            mb: '10em',
                            color: 'white', // Set text color
                            padding: '0.5em', // Add padding
                          }}
                          open={open}
                          anchorEl={anchorElPopover}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                          onClose={handlePopoverClose}
                          disableRestoreFocus
                        >
                          <Box sx={{
                            width: 'auto',
                            backgroundColor: 'black',
                            p: 1

                          }}>
                            <Typography sx={{
                              width: 'full',
                              color: 'white',
                              p: 1
                            }}>Midjourney Prompt</Typography>


                            <Typography sx={{
                              width: '15em',
                              backgroundColor: 'gray',
                              color: 'white',
                              p: 1
                            }}>{item.prompt}</Typography>
                          </Box>
                        </Popover>
                      </Box>
                    </Collapse>
                  </Box>
                </div>
              )}
            </div>
          ))}

        </ImageList>
      </Box>
    </div>
  )
}

export default FilterGallery
