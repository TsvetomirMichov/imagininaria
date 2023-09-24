
import TopImageLeft1 from '../../images/about/image.webp'
import TopImageLeft2 from '../../images/about/about2.webp'
import TopImageRight1 from '../../images/about/about1.webp'
import TopImageRight2 from '../../images/about/about4.webp'
import logo_about from '../../images/imaginaria-color.png'

import CenterImageLeft1 from '../../images/about/about_left.webp'
import CenterImageRight2 from '../../images/about/about_right.webp'
import CenterImageCenter3 from '../../images/about/about_mobile.webp'
import Flags_about from '../../images/about/flags_about.webp'

import Team_about from '../../images/about/team_about.webp'

import React from 'react';
import { Box, Link, Typography, styled } from '@mui/material';
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
    justifyContent: 'space-around',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    marginRight: 51
}));

const BoxCenter = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    [theme.breakpoints.down('lg')]: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
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
                <BoxTop sx={{ mt: '16em', padding: '1.5em' }}>
                    <Box sx={{ width: { xs: '90%', sm: '30em', md: '45em' }, mb: '5.5em' }}>
                        <Box sx={{
                            width: '16em',
                            height: '4em'
                        }}>
                            <img src={logo_about} width={'100%'} height={'100%'} alt="Image 1" />
                        </Box>
                        <Typography variant='h4' fontWeight={500} py={3}>About imaginaria</Typography>
                        <Typography variant='h6'>Imaginaria is a free service to inspire your AI image creation. You can browse our growing curated library of images to find something that would work in your next creative project. Once you’ve got something, test it out by downloading our large size, high resolution sample image. If you like the way it’s working - grab the prompt, and head to <Link color={'#000'} fontWeight={600} href={'https://www.midjourney.com/home/?callbackUrl=%2Fapp%2F'}> Midjourney </Link> to make your own unique image!</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: '-1em', mr: '1em' }}>
                        <Box gap={5} mt={2} p={{ xs: 4, sm: 5 }} position={'relative'} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ImageContainer>
                                <img src={TopImageRight1} width={190} height={230} alt="Image 5" />
                            </ImageContainer>

                            <img src={TopImageLeft2} width={190} height={230} alt="Image 3" />

                        </Box>
                        <Box gap={5} position={'relative'} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ImageContainer>
                                <img src={TopImageLeft1} width={190} height={230} alt="Image 5" />
                            </ImageContainer>

                            <img src={TopImageRight2} width={190} height={230} alt="Image 3" />
                        </Box>
                    </Box>
                </BoxTop>
                {/* BoxTop */}


                {/* BoxCenter */}
                <BoxCenter sx={{ mt: '10em', width: '100%', height: '60em', overflow: 'hidden' }}>
                    <ImageContainerCenterLeft sx={{ display: { xs: 'none', md: 'none', lg: 'flex' } }}>
                        <Box left={0} sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', mr: '20em', objectFit: 'cover' }}>
                            <ImageStyled src={CenterImageLeft1} alt="Image 5" />
                        </Box>
                    </ImageContainerCenterLeft>
                    <Box sx={{ width: { xs: '90%', sm: '45em' }, zIndex: 1000, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', textAlign: 'center' }}>
                        <img src={Flags_about} width={80} height={60} alt="Image 1" />
                        <Typography variant='h4' fontWeight={500} py={3}> Who created these images?</Typography>
                        <Typography variant='h6'>We are a small team of smart, creative people writing prompts like there’s no tomorrow. We go through the results and carefully cull and select images that are high quality, actually usable in real world creative projects, and just awesome to look at! </Typography>
                        <Typography variant='h6' fontWeight={500} py={3}> Our team is made up of people in Mexico, Uruguay and Australia! (Three of the best countries on earth ✊)</Typography>
                    </Box>
                    <ImageContainerCenterRight>
                        <Box right={0} sx={{ display: { xs: 'none', md: 'none', lg: 'flex' } }}>
                            <ImageStyled src={CenterImageRight2} width={'100%'} height={'50%'} alt="Image 5" />
                        </Box>
                    </ImageContainerCenterRight>
                    <Box right={0} sx={{ display: { xs: 'flex', lg: 'none' }, mt: '10em' }}>
                        <img src={CenterImageCenter3} height={'100%'} width={'100%'} alt="Image 5" />
                    </Box>

                </BoxCenter>

                {/* Below center */}
                <Box sx={{
                    backgroundColor: '#171717',
                    color: 'white',
                    width: '100%',
                    height: '100%',
                    textAlign: 'start',
                    p: { xs: '1em', sm: '0' }

                }}>
                    <Box sx={{
                        mt: '5em',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        justifyContent: 'flex-start',
                        maxWidth: '40em',
                        ml: { sm: '0', md: '10em' }


                    }}>
                        <Typography variant='h4' fontWeight={500} py={3} >Humans <i> plus </i> Machines
                        </Typography>
                        <Typography variant='h6'>Sure humans vs machines makes for some great movies, but our vision for the future is more of a humans plus machines. We want to find ways to move forward in a world where machines make us more productive, efficient and effective.</Typography>

                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                        <ImageStyledAuto sx={{
                            my: '1em',
                        }} src={Team_about} alt="" />
                    </Box>

                    <Box sx={{

                        width: '90%',
                        display: 'flex',
                        alignItems: 'end',
                        justifyContent: 'flex-end',


                    }}>
                        <Typography sx={{
                            maxWidth: '40em',
                            mb: '15em'
                        }} variant='h6'>Our team is made up of creative people, and we believe that even as machines bring changes to the creative processes in our industry, so too do they create new ways to be creative, new opportunities, new economic fields, and advances for humanity as a whole. This project aims to help our industry forge ahead to develop those opportunities.</Typography>

                    </Box>
                </Box>
                {/* Below center */}
                {/* BoxCenter */}
                <Box sx={{
                    backgroundColor: '#99',
                    color: 'black',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: '5em',
                    mb: '15em'

                }}>


                    <Box sx={{
                        mt: '5em',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        justifyContent: 'flex-start',
                        maxWidth: '45em',


                    }} gap={3}>
                        <Typography fontSize={'1.6em'} fontWeight={510} py={3} >Terms of Service</Typography>
                        <Typography fontSize={'1.2em'}>Images available on Freeflo are made with <Link color={'#000'} fontWeight={600} fontSize={'1em'} href={'https://www.midjourney.com/home/?callbackUrl=%2Fapp%2F'}> Midjourney </Link>, and you can read Midjourney’s <Link color={'#000'} fontWeight={600} fontSize={'1em'} href={'https://docs.midjourney.com/docs/terms-of-service'}>  terms of service here </Link>. We also follow a DMCA take-down procedure, and if you see something on Freeflo that you believe violates your copyright or trademark, please send a notice of claimed infringement to takedown@freeflo.ai with the subject “Takedown Request”, and follow the requirements set out in Midjourney’s terms.</Typography>
                        <Typography fontSize={'1.2em'}>Sample images provided on Freeflo are provided for use in a non-commercial setting, with attribution to Freeflo and Midjourney. If you plan to use the images for a commercial project, you should then use the prompts provided to create your own images on Midjourney and licence the images created, as appropriate from their service.</Typography>
                        <Typography fontSize={'1.2em'}>You may not scrape this site, or redistribute the prompts or images as a service that aims to replicate all or part of Freeflo’s intended purpose.</Typography>

                    </Box>
                </Box>


                <Footer />

            </Container>
        </div>
    );
};

export default About;

