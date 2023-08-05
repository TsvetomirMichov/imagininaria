import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import { listAll } from 'firebase/storage';
import { storage } from "../../pages/lib/firebase"
import { ref, getDownloadURL } from "firebase/storage";
import { useState } from 'react';
import { useEffect } from 'react';
import TransparentBackdrop from '../TransparentBackdrop/TransparentBackdrop';

export default function Galery() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen is small (less than or equal to 'sm' breakpoint)
  const [dataImg, setDataImg] = useState([])
  const [imgUrl, setImageUrl] = useState('')
  const [imgTitle, setImageTitle] = useState('')

  const [isBackdropOpen, setIsBackdropOpen] = useState(false);

  const handleClose = () => {
    setIsBackdropOpen(false);
  };

  const handleOpen = (url,title) => {
    setIsBackdropOpen(true);
    setImageUrl(url)
    setImageTitle(title)
    // console.log(imgUrl);
    // console.log(imgTitle);
  };


  const columns = isSmallScreen ? 1 : 3; // Set the number of columns based on the screen size


  useEffect(() => {
    const fetchImages = async () => {
      const storageRef = storage;
      const imagesFolderRef = ref(storageRef, 'gs://appointment-scheduler-ap-d67bd.appspot.com/'); // Replace 'images' with your folder path

      try {
        const listResult = await listAll(imagesFolderRef);
        const imageItems = await Promise.all(
          listResult.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return {
              name: item.name,
              url,
            };
          })
        );

        // Now you have the array of all images and their details in 'imageItems'
        setDataImg(imageItems)
        console.log(imageItems)
      } catch (error) {
        console.error('Error fetching images from Firebase Storage:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <Box sx={{ maxWidth: '100%', height: '100%', p: { xs: 0, sm: 10 } }}>
      <TransparentBackdrop open={isBackdropOpen} onClose={handleClose} url={imgUrl} title={imgTitle}/>

      <ImageList variant="masonry" cols={columns} gap={8}>
        {dataImg.map((item,index) => (
            <ImageListItem key={index}>
              <img
                src={`${item.url}?w=248&fit=crop&auto=format`}
                srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.name}
                loading="lazy"
                onClick={()=>handleOpen(item.url,item.name)}
              />
            </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
