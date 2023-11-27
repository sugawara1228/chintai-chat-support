import React, { useState, useEffect, useContext } from 'react';
import {
  Flex,
} from '@chakra-ui/react';

const CLPSpeechBubble = ( props ) => {

  return (
    <Flex 
        w="fit-content" 
        maxW={{base: "90%", lg: "100%"}} 
        minH="3rem" 
        py={{base: "3", lg: "3"}} 
        ml={{base: "2", lg: "0"}} 
        px="5" 
        align="center" 
        bg="#f0f0f0" 
        borderRadius="10px" 
        mb={{base: "1rem", lg: "1.5rem"}}
        position="relative"
    >
        {props.children}
        <Triangle />
    </Flex>
  );
}

const Triangle = () => (
  <div
    style={{
      position: 'absolute',
      top: '20px',
      left: '-13px',
      transform: 'translateY(-40%)',
      width: '0',
      height: '0',
      borderTop: '10px solid transparent',
      borderBottom: '10px solid transparent',
      borderRight: '15px solid #f0f0f0',
    }}
  />
);

export default CLPSpeechBubble;
