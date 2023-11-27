import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const FormNavigationButton = (props) => {
    const { path } = props;
    const navigate = useNavigate();

    const clickFromBtn = (path) => {
        navigate(path);
    }

    return (
        <Button 
            w="50%" 
            bg="teal.400" 
            color="white" 
            _hover={{opacity: "0.8"}} 
            mb="3"
            onClick={() => clickFromBtn(path)}
        >
            {props.children}
        </Button>
    )
}

export default FormNavigationButton;