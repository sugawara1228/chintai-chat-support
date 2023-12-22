import React, { useState, useEffect } from 'react';
import {
  Flex,
  FormLabel,
  Badge,
  Text,
  Checkbox,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';

const CheckBoxFormControl = (props) => {
    const { 
      labelName, 
      text,
      badge,
      id, 
      validation, 
      isSubmit, 
      errors, 
      register, 
      getValues, 
    } = props;
  
    /** style  */ 
    const inputStyle = { border: "1px solid #d5d5d5", fontSize: "14px", borderRadius: "4px" };
    const formLabelStyle = { letterSpacing: "1px", color: "#444", fontSize: "15px" };
    const subTextStyle = { fontSize: "12px", color: "#999", display: "inline-block", marginBottom: "4px", marginTop: "0" };
    const confirmText = { borderBottom: "1px", solid: "#ccc", paddingBottom: ".5rem"}
  
    return (
      <FormControl isInvalid={errors[id]} mb=".9rem">
        <FormLabel style={formLabelStyle}>
          <Text as="span" fontSize={{ base: "12px", lg: "14px" }}>
            {labelName}
          </Text>
          {badge ? (
            <Badge variant="solid" colorScheme="red" ml="2">
              必須
            </Badge>
          ) : null}
        </FormLabel>
        {text.map((line, index) => (
              <Text fontSize="14px" key={index}>
                {line}
              </Text>
            ))}
        {!isSubmit ? (
            <Checkbox
                id={id}
                mt="3"
                {...register(id, validation)}
            >
                <Text as="span" fontSize={{ base: "12px", lg: "14px" }}>
                    確認しました
                </Text>
            </Checkbox>
        ) : (
          <Text style={confirmText}>{getValues(id) ? '選択済み' : '未選択'}</Text>
        )}
        <FormErrorMessage>
          <Text as="span" fontSize={{ base: "12px", lg: "14px" }}>
            {errors[id] && errors[id].message}
          </Text>
        </FormErrorMessage>
      </FormControl>
    );
  };
  
  export default CheckBoxFormControl;
  