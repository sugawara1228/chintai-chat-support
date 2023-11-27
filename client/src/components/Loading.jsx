import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Spinner,
} from '@chakra-ui/react';

const Loading = () => {

    return (
        <Box
        position="fixed"
        top="0"
        left="100%"
        transform="translateX(-100%)"
        width={{base: "100%", lg: "50%"}}
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="rgba(0, 0, 0, 0.3)"
        zIndex="101"
        >
            <Spinner color="white" size="xl" thickness='4px'/>
        </Box>
    );
}

export default Loading;
