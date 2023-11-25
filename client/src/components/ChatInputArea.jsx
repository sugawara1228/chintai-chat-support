import React, { useState, useEffect, useContext } from 'react';
import {
  Flex,
  Button,
  Input,
  Icon,
  Box,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const ChatInputArea = () => {
  const [ isDisabled, setIsDisabled ] = useState(true);

    return (
        <Flex w="100%" h="13%" bg="#f1f1f1" align="center" justify="center" position="relative">
            <Box position="absolute" w="100%" h="100%" bg="" zIndex="100" />
            <Input w={{base: "95%", lg: "70%"}} bg="#fff" h={{base: "2.5rem", lg: "3rem"}} border="1px solid #ccc" _focus={{border: "1px solid #999", boxShadow: "none"}} isDisabled/>
            <Button bg="none" mx="3" _hover={{opacity: 0.7}} position="absolute" right={{base: "0", lg: "14%"}} zIndex="99" isDisabled>
              <span className="material-symbols-outlined gray lg">send</span>
            </Button>
        </Flex>
    );
}

export default ChatInputArea;
