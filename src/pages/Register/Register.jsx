import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Box, Typography, Link } from '@mui/material'
import TopImageLeft1 from '../../images/about/image.webp'
import TopImageLeft2 from '../../images/about/top_left.webp'
import TopImageRight1 from '../../images/about/top_right.webp'
import TopImageRight2 from '../../images/about/bottom_right.webp'
import styled from '@emotion/styled'


import { useState } from 'react';
import { createNewUser, storage } from '../lib/firebase';
import { auth } from '../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { TextField, Button } from '@mui/material';
import UploadIcon from '../../images/upload-icon-3.png'

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { TransitionGroup } from 'react-transition-group';

import Instagram from './instagram.png'
import Twitter from './twitter.png'
import Mail from './mail.png'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

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



const SignupPage = () => {
    const SOCIALS = [
        { icon: Instagram, text: 'Instagram', url: '' },
        { icon: Twitter, text: 'Twitter', url: '' },
        { icon: Mail, text: 'Email', url: '' },
    ];

    const [socialLinks, setSocialLinks] = useState(SOCIALS.map((item) => ({ ...item, url: '' })));
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [file, setFile] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [perc, setPerc] = useState(null)

    const handleAddSocialLink = (social) => {

        // const existingItemIndex = updatedLinks.findIndex((link) => link.text === social.text);
        const nextHiddenItem = SOCIALS.find((link) => !socialLinks.some((item) => item.text === link.text))

        // if (existingItemIndex !== -1) {
        //     updatedLinks[existingItemIndex].url = '';
        //     setSocialLinks(updatedLinks);
        // }

        // const nextHiddenItem = SOCIALS.find((i) => !fruitsInBasket.some((item) => item.text === i.text));
        if (nextHiddenItem) {
            setSocialLinks((prev) => [nextHiddenItem, ...prev]);
        }
    };
    console.log(socialLinks)

    const handleRemoveSocialLink = (item) => {
        const updatedLinks = socialLinks.filter((link) => link.text !== item.text);
        setSocialLinks(updatedLinks);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        try {

            const uploadImage = () => {
                const name = file.name;
                console.log("name : ", name)
                const storageRef = ref(storage, name);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        setPerc(progress)
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                            default:
                                break;
                        }
                    },
                    (error) => {
                        console.log(error)
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setImageUrl(downloadURL)

                        });
                    }
                );
            }
            uploadImage()
            console.log(perc)
            if (perc == 100) {
                console.log('creating user')
                // Collect social links that are not empty
                const validSocialLinks = socialLinks.filter((link) => link.url.trim() !== '');

                // Create a new user and store data in the Firebase database
                const res = await createNewUser(auth, email, password);
                console.log('response', res)
                await addDoc(collection(firestore, 'users'), {
                    userId: res.user.uid,
                    email: email,
                    password: password,
                    profileImage: imageUrl,
                    socialLinks: validSocialLinks,
                    name: name,
                    bio: bio,
                    country: country
                });

                // Clear input fields
                setFile('');
                setBio('');
                setName('');
                setEmail('');
                setCountry('');
                setPassword('');
                setSocialLinks(SOCIALS.map((item) => ({ ...item, url: '' })));

            }
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing up:', errorCode, ' ', errorMessage);
            setError('An error occurred while signing up');
        }
    };

    return (
        <div>
            <Box sx={{
                position: 'relative',
            }}>
                <Navbar />
                <Box sx={{
                    backgroundColor: '#171717',
                    color: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    position: 'relative',
                }}>

                    <Box display="flex" alignItems="center" mr={10} sx={{
                        widths: '100%',
                        height: '100%',
                        position: 'relative',
                        my: '5em',
                        mx: 'auto'
                    }}>
                        <form onSubmit={handleSubmit} style={{ width: '100%', height: '100%', display: 'flex' }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' }
                            }}>
                                <Box gap={10} mr={15}>
                                    <Typography variant="h4" align="left" gutterBottom>
                                        Register to  Become a creator
                                    </Typography>
                                    <Box className="left" sx={{ mb: { xs: '2em', sm: 0 }, width: '15em', height: '9em', display: 'block' }}>
                                        <img width={'full'} style={{ objectFit: 'cover' }} height={150} src={file ? URL.createObjectURL(file) : UploadIcon} alt="" />
                                        <Box className="formInput" sx={{ my: '2em' }}>                                           
                                            <label htmlFor="file">Click to upload Profile Image</label>
                                            <input type="file" id="file" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                                        </Box>

                                    </Box>

                                    <div>
                                        <Button
                                            variant="contained"
                                            disabled={socialLinks.length >= SOCIALS.length}

                                            onClick={() => handleAddSocialLink(SOCIALS[socialLinks.length])}
                                        >
                                            Add Social Link
                                        </Button>
                                        <Box sx={{ mt: 5 }}>
                                            <List>
                                                <TransitionGroup>
                                                    {socialLinks.map((item) => (
                                                        <Collapse key={item.text}>
                                                            <ListItem
                                                                secondaryAction={
                                                                    <IconButton
                                                                        edge="end"
                                                                        aria-label="delete"
                                                                        title="Delete"
                                                                        onClick={() => handleRemoveSocialLink(item)}
                                                                    >
                                                                        <DeleteIcon sx={{ color: 'white' }} />
                                                                    </IconButton>
                                                                }
                                                            >
                                                                <ListItemText
                                                                    primary={
                                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                            <img src={item.icon} alt={item.text} style={{ marginRight: '8px', width: '20px', height: '20px' }} />
                                                                            {item.text}
                                                                        </Box>
                                                                    }
                                                                />
                                                                <TextField
                                                                    sx={{
                                                                        color: 'white'
                                                                    }}
                                                                    placeholder="Social Link"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    value={item.url}
                                                                    onChange={(e) => {
                                                                        const updatedLinks = [...socialLinks];
                                                                        const currentItemIndex = updatedLinks.findIndex((link) => link.text === item.text);
                                                                        updatedLinks[currentItemIndex].url = e.target.value;
                                                                        setSocialLinks(updatedLinks);
                                                                    }}
                                                                    InputProps={{
                                                                        style: { color: 'white', marginLeft: '2em', border: 'white' }, // Set the text color

                                                                    }}
                                                                    InputLabelProps={{
                                                                        style: { color: 'white' }, // Set the label color
                                                                    }}
                                                                />
                                                            </ListItem>
                                                        </Collapse>
                                                    ))}
                                                </TransitionGroup>
                                            </List>
                                        </Box>
                                    </div>
                                </Box>

                                <Box position={'relative'}>
                                    <div style={{ marginBottom: '16px', display: 'block', marginTop: '3em' }}>
                                        <Typography variant="body1" fontWeight="bold">
                                            Email:
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            style={{ backgroundColor: '#262626', minWidth: '20em' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '16px', display: 'block', marginTop: '1em' }}>
                                        <Typography variant="body1" fontWeight="bold">
                                            Name:
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            style={{ backgroundColor: '#262626', minWidth: '20em' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '16px', display: 'block', marginTop: '1em' }}>
                                        <Typography variant="body1" fontWeight="bold">
                                            Bio:
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            style={{ backgroundColor: '#262626', minWidth: '20em' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '16px', display: 'block', marginTop: '1em' }}>
                                        <Typography variant="body1" fontWeight="bold">
                                            Country:
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            style={{ backgroundColor: '#262626', minWidth: '20em' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '1.5em' }}>
                                        <Typography variant="body1" fontWeight="bold">
                                            Password:
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            variant="outlined"
                                            style={{ backgroundColor: '#262626' }}
                                        />
                                    </div>
                                    <Button variant="contained" color="warning" type="submit" fullWidth>
                                        Sign Up
                                    </Button>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
                                        <Typography variant="body1" fontWeight="bold" sx={{ paddingRight: '8px' }}>
                                            Already a member?
                                        </Typography>
                                        <Link sx={{
                                            color: 'white',
                                        }} href="/becomeACreator">Sign in now</Link>
                                    </div>

                                </Box>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
            <Footer />

        </div>
    )
}

export default SignupPage