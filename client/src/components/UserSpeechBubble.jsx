import React, { useState, useEffect, useContext } from 'react';
import {
  Flex,
  Text,
} from '@chakra-ui/react';


const UserSpeechBubble = ( props ) => {

  return (
    <Flex h="3rem" px="5" align="center" bg="#E1E300" borderRadius="20px">
        <Text as="b">
          {props.children}
        </Text>
    </Flex>
  );
}

export default UserSpeechBubble;
