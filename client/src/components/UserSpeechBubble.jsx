import React, { useState, useEffect, useContext } from 'react';
import {
  Flex,
  Text,
} from '@chakra-ui/react';
import { mainColor } from '../constant/constant';


const UserSpeechBubble = ( props ) => {

  return (
    <Flex 
      h="3rem" 
      px="5" 
      align="center"
      bg={mainColor}
      borderRadius="10px"
      position="relative"
    >
        <Text as="b">
          {props.children}
          <Triangle />
        </Text>
    </Flex>
  );
}

const Triangle = () => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      right: '-10px',
      transform: 'translateY(-50%)',
      width: '0',
      height: '0',
      borderTop: '10px solid transparent',
      borderBottom: '10px solid transparent',
      borderLeft: `15px solid ${mainColor}`,
    }}
  />
);

export default UserSpeechBubble;
