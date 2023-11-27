import React, { useState, useEffect, useContext } from 'react';
import {
  Flex,
  Button,
  Grid,
  Box,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const DispChoicesArea = (props) => {
  const {dispChoices, clickChoicesBtn } = props;

  const grid2col = dispChoices.length >= 7;

    return (
        <Box w={{base: "80%", lg: grid2col ? "80%" : "60%"}} position="sticky" bottom="3" left="100%" zIndex="100">
            <Grid
                templateColumns={grid2col ? 'repeat(2, 1fr)' : '1fr'}
                columnGap="2"
            >
            {dispChoices.map((button, index) => (
                <Button
                key={index}
                w="100%"
                h={{base: "2.5rem", lg: "3rem"}}
                justify="center"
                align="center"
                border="1px solid #ccc"
                bg="white"
                _hover={{ bg: "#E1E300" }}
                mb="2"
                fontSize={{base: "12px", lg: "15px"}}
                onClick={() => clickChoicesBtn(button.btnId, button.label)}
                >
                {button.label}
                </Button>
            ))}
            </Grid>
        </Box>
    );
}

export default DispChoicesArea;
