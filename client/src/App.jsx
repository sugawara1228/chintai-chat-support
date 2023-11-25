import React, { useState } from 'react';
import {
  Flex,
  Button,
  Image,
  Text,
  Center,
  Input,
  Box,
  Heading,
} from '@chakra-ui/react';
import ChatArea from './components/ChatArea';

import ChatInputArea from './components/ChatInputArea.jsx';
import TitleArea from './components/TitleArea';

function App() {
  const [message, setMessage] = useState('');

  const fetchMessage = () => {
    // PHPサーバーからデータを取得
    fetch('./server.php')  // または実際のURLを指定
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  };

  return (
    <Flex w="100vw" h="100vh" fontSize={{base: "12px", lg: "15px"}}>
      <TitleArea />
      {/* ChatMain画面 */}
      <Flex w={{base: "100%", lg: "50%"}} h="100%" flexDirection="column">
        <ChatArea />
        {/* 後で消す */}
        <ChatInputArea />
      </Flex>
    </Flex>
  );
}

export default App;