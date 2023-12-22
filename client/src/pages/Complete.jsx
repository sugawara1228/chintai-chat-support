import React, { useState } from 'react';
import {
  Flex,
} from '@chakra-ui/react';
import FormComplete from '../components/FormComplete';
import TitleArea from '../components/TitleArea';

function Complete(props) {

    const { formType } = props.location.state;

  return (
    <Flex w="100vw" h="100vh" fontSize={{base: "12px", lg: "15px"}}>
      <TitleArea />
      <Flex w={{base: "100%", lg: "50%"}} h="100%" flexDirection="column">
        <FormComplete formType={formType}/>
      </Flex>
    </Flex>
  );
}

export default Complete;