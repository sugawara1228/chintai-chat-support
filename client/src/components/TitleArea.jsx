import React, { useState, useEffect, useContext } from 'react';
import {
  Flex,
  Heading,
  Image,
} from '@chakra-ui/react';

const TitleArea = () => {

    return (
      <Flex 
      w="50%" 
      h="100%" 
      justify="center" 
      align="center" 
      backgroundImage='url("/img/AdobeStock_647543829.jpeg")'
      bgSize="cover" 
      bgRepeat="no-repeat"
      display={{base: "none", lg: "flex"}}
    >
      <Flex w="60%" h="40%" bg="#E1E300" flexDirection="column" justify="center" align="center">
        <Image 
          src="/img/CLP_logo-03.png"
          boxSize="100px"
          w="300px"
          objectFit="cover"
        />
        <Heading as="h2" size="md" mt="8">
          賃貸チャットサポート
        </Heading>
      </Flex>
    </Flex>
    );
}

export default TitleArea;
