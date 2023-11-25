import React, { useState, useEffect, useContext } from 'react';
import {
  Flex,
} from '@chakra-ui/react';


const CLPSpeechBubble = ( props ) => {

  return (
    <Flex w="fit-content" maxW={{base: "90%", lg: "100%"}} minH="3rem" py={{base: "3", lg: "3"}} ml={{base: "2", lg: "0"}} px="5" align="center" bg="#f0f0f0" borderRadius="20px" mb={{base: "1rem", lg: "1.5rem"}}>
        {props.children}
    </Flex>
  );
}

export default CLPSpeechBubble;
