import React, { useState } from 'react';
import {
  Flex,
} from '@chakra-ui/react';
import FormCancellation from '../components/FormCancellation';
import TitleArea from '../components/TitleArea';

function Cancellation() {

  return (
    <Flex w="100vw" h="100vh" fontSize={{base: "12px", lg: "15px"}}>
      <TitleArea />
      {/* FormMain画面 */}
      <Flex w={{base: "100%", lg: "50%"}} h="100%" flexDirection="column">
        <FormCancellation />
      </Flex>
    </Flex>
  );
}

export default Cancellation;