import * as React from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";

export default function Footer() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      height: '5vh',
      backgroundColor: '#000000',
    }}>
      <Typography variant="p" noWrap component={Link} to="/faq" underline="none" sx={{
        fontSize: '0.8rem',
        fontWeight: 'bold',
        color: '#daa520',
        textDecoration: 'none',
        '&:hover': {
          color: '#daa520',
          textDecoration: 'none',
        },
      }}>Frequently Asked Questions
      </Typography>

      <Typography variant="p" noWrap underline="none" sx={{
        fontSize: '0.8rem',
        fontWeight: 'bold',
        color: '#daa520',
        textDecoration: 'none',
        '&:hover': {
          color: '#daa520',
          textDecoration: 'none',
        },
      }}>Reuse Vandy ©, 2022
      </Typography>

      <Button
   href={`mailto:test@example.com`}
   sx = {{
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: '#daa520',
    textTransform: 'none',
    textDecoration: 'none',
    '&:hover': {
      color: '#daa520',
      textDecoration: 'none',
      textTransform: 'none',
    },
   }}
>
      <Typography variant="p" noWrap underline="none" href={`mailto:udit4880@gmail.com`} sx={{
        fontSize: '0.8rem',
        fontWeight: 'bold',
        color: '#daa520',
        textDecoration: 'none',
        '&:hover': {
          color: '#daa520',
          textDecoration: 'none',
        },
      }}>
        Report a bug/leave a comment!
      </Typography>
      </Button>

    </div>
  );
}
