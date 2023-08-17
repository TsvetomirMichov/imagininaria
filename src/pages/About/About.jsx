import Imaginaria1 from '../../images/about/Imaginaria-about-1.jpg'
import Imaginaria2 from '../../images/about/Imaginaria-about-2.jpg'
import Imaginaria3 from '../../images/about/Imaginaria-about-3.jpg'
import Imaginaria4 from '../../images/about/Imaginaria-about-4.jpg'

import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer'

const Container = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
});


const BoxTop = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
}));

const BoxCenter = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'flex-center',
    justifyContent: 'space-around',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    marginRight: 51
}));

const ImageContainer = styled(Box)({
    position: 'relative',
    maxWidth: '25em',
    '& img': {
        display: 'block',
    }
});

const ImageContainerCenterLeft = styled('div')({
    position: 'absolute',
    left: '-10em', // Push the image 3em outside the screen to the right
    top: 0,
});

const ImageContainerCenterRight = styled('div')({
    position: 'absolute',
    right: '-6em', // Push the image 3em outside the screen to the right
    top: 0,
});

const ImageStyled = styled('img')({
    width: '100%',
    height: '60em',
    objectFit: 'cover',
})



const ImageStyledAuto = styled('img')(({ theme }) => ({
    width: '80%',
    height: '20em',
    objectFit: 'cover',
    overflow: 'hidden',
    padding: '3.5em',
    [theme.breakpoints.down('md')]: {
        padding: '2.5em',
        height: '10em',

    }
}));

const About = () => {
    return (
        <div>
            <Container>
                <Navbar />
                {/* BoxTop */}
                <BoxTop sx={{ mt: '10em', padding: '1.5em' }}>
                    <Box sx={{ width: { xs: '90%', sm: '30em', md: '35em' }, mb: '5.5em' }}>

                        <Typography variant='h4' fontWeight={600} py={1}>Welcome to Imaginaria</Typography>
                        <Typography variant='h6' fontWeight={400} py={1}><i>Where Imagination Meets Innovation</i></Typography>
                        <Typography variant='body1' py={1}>
                            Taking inspiration from visionaries like Walt Disney, who dared to dream and brought those dreams to life, we too champion the power of imagination. Just as Disney transformed hand-drawn art into animated works of art, we celebrate the imaginative power in all of us. At Imaginaria, we curate and showcase a collection of AI-generated images, created by transforming text-based prompts into stunning visuals.
                        </Typography>
                        <Typography variant='body1 ' py={5}>
                            Our platform is more than an image library—it's a creative playground and a vibrant community. Here, you can explore the extraordinary capabilities of AI and spark your own creativity.
                        </Typography>
                        <Typography variant='body1' py={1}>

                            Imaginaria serves as a hub for sharing and collaboration. We connect imagemakers from all corners of the globe, fostering a space where they can share their creations, exchange ideas, and engage in the evolution of art and storytelling in this digital era.

                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: '-1em', ml: '1em' }}>
                        <Box gap={5} mt={2} p={{ xs: 4, sm: 5 }} position={'relative'} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ImageContainer>
                                <img src={Imaginaria1} width={'100%'} height={'100%'} alt="Image 5" />
                            </ImageContainer>

                        </Box>
                    </Box>
                </BoxTop>
                {/* BoxTop */}


                {/* BoxCenter */}
                <BoxCenter sx={{ my: '10em', width: '100%', height: '100%', overflow: 'hidden' }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        alignItems: { xs: 'center', sm: 'flex-end' }
                    }}>
                        <Box sx={{
                            display: 'flex', flexDirection: 'row', mt: '-1em', ml: '1em', position: 'relative',
                            width: '100%',
                            height: { xs: '40%', sm: '25%' }
                        }}>
                            <Box position={'relative'} p={3} sx={{ display: 'flex', flexDirection: 'column', width: '15em', height: '15em' }}>
                                <ImageContainer sx={{
                                    width: { xs: '100%', sm: '15em' },
                                }}>
                                    <img src={Imaginaria2} width={'100%'} height={'100%'} alt="Image 5" />
                                </ImageContainer>
                            </Box>
                            <Box position={'relative'} p={3} mt={4} sx={{ display: 'flex', flexDirection: 'column', width: '15em', height: '5em' }}>
                                <ImageContainer sx={{
                                    width: { xs: '100%', sm: '15em' },
                                }}>
                                    <img src={Imaginaria3} width={'100%'} height={'100%'} alt="Image 5" />
                                </ImageContainer>

                            </Box>
                        </Box>
                        <Box position={'relative'} p={3} >
                            <ImageContainer sx={{
                                width: { xs: '100%', sm: '30em' },
                                height: '20em',

                            }}>
                                <img src={Imaginaria4} width={'100%'} height={'100%'} style={{ objectFit: 'cover' }} alt="Image 5" />
                            </ImageContainer>
                        </Box>
                    </Box>
                    <Box sx={{ width: { xs: '90%', sm: '30em', md: '30em' }, mb: '5.5em' }}>

                        <Typography variant='h4' fontWeight={600} py={3}>Unlock Your Creativity with AI</Typography>
                        <Typography variant='body1'>
                            Imaginaria is a complimentary service committed to inspiring creativity through AI-generated imagery. Unlock the remarkable creative potential of AI with our extensive image library, crafted by advanced text-to-image tools including Midjourney AI, DALL-E, Leonardo, Night Café, Stable Diffusion, and many others.
                        </Typography>
                        <Typography variant='body1' py={2}>
                            Each image in our collection stands as a testament to the extraordinary capabilities of AI, serving as a dynamic co-pilot in the realm of creativity. We offer this service not only as a source of inspiration, but also as a community platform to share stunning images and prompts from imagemakers worldwide.
                        </Typography>
                        <Typography variant='body1'>

                            Here, you're invited to not just appreciate art but interact with it. Download an image that catches your eye or seize a prompt from any image to craft your very own version using whichever AI platform you want to use.
                        </Typography>
                    </Box>
                </BoxCenter>

                {/* BoxCenter */}
                <Footer />
            </Container>
        </div >
    );
};

export default About;
