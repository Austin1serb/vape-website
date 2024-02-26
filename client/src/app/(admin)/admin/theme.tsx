'use client'
import { deepPurple } from '@mui/material/colors';
import { createTheme } from "@mui/material";
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ weight: ["100", '200', '400', '500', '700'], subsets: ['latin'], display:'swap' });




const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        secondary:deepPurple
    },
    typography: {
        fontFamily: montserrat.style.fontFamily
    },
});


export default darkTheme