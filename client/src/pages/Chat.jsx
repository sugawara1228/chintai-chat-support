import React, { useState } from 'react';
import {
  Flex,
} from '@chakra-ui/react';
import ChatArea from '../components/ChatArea';
import ChatInputArea from '../components/ChatInputArea.jsx';
import TitleArea from '../components/TitleArea';

function Chat() {

  return (
    <Flex w="100vw" h="100vh" fontSize={{base: "12px", lg: "15px"}}>
      <TitleArea />
      {/* ChatMain画面 */}
      <Flex w={{base: "100%", lg: "50%"}} h="100%" flexDirection="column">
        <ChatArea />
      </Flex>
    </Flex>
  );
}

export default Chat;