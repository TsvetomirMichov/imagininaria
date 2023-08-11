import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import logo_about from '../../images/imaginaria-white.png'

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          width: '100%',
          backgroundColor: 'black',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Box
          p={1}
          ml={5}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '7em',
          }}
        >
          <img src={logo_about} width={'100%'}  alt="Import image" />
          
        </Box>
        <Box p={2} mr={15}>
          <Link href={'https://twitter.com/freeflo_ai'}>
            <TwitterIcon sx={{
              color: 'white',
              marginRight: '1em'
            }} />
          </Link>
          <Link href={'https://www.instagram.com/freeflo_ai/'}>
            <InstagramIcon sx={{
              color: 'white',
            }} />
          </Link>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
