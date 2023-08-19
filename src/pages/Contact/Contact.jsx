import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { Box, Button, TextField, Typography } from '@mui/material';

import Footer from '../../components/Footer/Footer'
import TopImageLeft1 from '../../images/Imaginaria-Contact-Image.jpg'
import styled from '@emotion/styled'

const BoxTop = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',

}));

const ImageContainer = styled(Box)({
    position: 'relative',
    width: '10%',
    '& img': {
        display: 'block',
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '30%',
        background: 'linear-gradient(rgba(255, 255, 255, 0.5), transparent)',
    },
});

const Contact = () => {
    // const [file, setFile] = useState("")

    const HandleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
    }

    return (

        <div>
            <Box sx={{
                position: 'relative',
            }}>
                <Navbar />
                <Box sx={{
                    backgroundColor: 'white',
                    color: 'white',
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems:'center',
                    py: 15
                }}>

                    <Box
                        className="new"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            justifyContent: 'center'
                            , alignItems: 'center'
                        }}
                    >
                        <Box
                            className="newContainer"
                            sx={{
                                maxWidth: '800px',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box
                                className="bottom"
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    justifyContent: 'center',
                                    alignItems: { xs: 'center', sm: 'flex-start' },
                                }}>


                                <Box className="right" sx={{ ml: { xs: 0, sm: '2em' },maxWidth:'40em' }}>
                                    <Box sx={{
                                        py: 3, color: 'black'
                                    }}>
                                        <Typography variant='h4' fontWeight={800}>
                                            Any questions or suggestions?
                                        </Typography>
                                        <Typography variant='h5' fontWeight={700}>
                                            We'd love to hear from you!
                                        </Typography>
                                    </Box>

                                    <form onSubmit={HandleSubmit}>
                                        <TextField fullWidth
                                            label="Name"
                                            variant="filled"
                                            InputProps={{
                                                style: { color: 'black', backgroundColor: 'white' },
                                            }}

                                            sx={{ mb: '1em' }} />



                                        <TextField
                                            fullWidth
                                            label="Email"
                                            variant="filled"
                                            InputProps={{
                                                style: { color: 'black', backgroundColor: 'white' },
                                            }}

                                            sx={{ mb: '1em' }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Message"
                                            variant="filled"
                                            InputProps={{
                                                style: { color: 'black', backgroundColor: 'white' },
                                            }}

                                            sx={{ mb: '1em' }}
                                        />
                                        <Button variant="contained" color="warning" type="submit" sx={{
                                            my:'1.5em'
                                        }} >
                                            Submit
                                        </Button>
                                    </form>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <BoxTop sx={{ mt: '1em', padding: '1.5em', display: { xs: 'none', sm: 'flex' } }}>

                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: '-1em', mr: '1em' }}>

                            <Box gap={5} position={'relative'} sx={{ display: 'flex', flexDirection: 'column',width:'100%',height:'20em' }}>
                                    <img src={TopImageLeft1} width={'100%'} height={'100%'} style={{objectFit:'cover'}} alt="Image 5" />
                            </Box>
                        </Box>
                    </BoxTop>
                </Box>
            </Box>
            <Footer />

        </div>
    )
}

export default Contact
