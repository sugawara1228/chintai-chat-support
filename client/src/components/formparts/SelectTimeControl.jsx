import React, { useState, useEffect } from 'react';
import {
  FormLabel,
  Badge,
  Text,
  Select,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';

const SelectTimeControl = (props) => {

  const { 
    labelName, 
    badge, 
    list,
    id, 
    validation, 
    isSubmit, 
    errors, 
    register, 
    getValues, 
    placeholder
  } = props;

  /** style  */ 
  const inputStyle = { border: "1px solid #d5d5d5", fontSize: "14px", borderRadius: "4px" };
  const selectStyle = { border: "1px solid #d5d5d5", fontSize: "14px" };
  const placeholderStyle = { opacity: "1", color: 'gray.400' };
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

        {!isSubmit ? (
            <Select
                id={id}
                fontSize={{ base: "12px", lg: "14px" }}
                height={{ base: "2.7rem", lg: "2.7rem" }}
                placeholder={placeholder}
                _placeholder={placeholderStyle}
                style={inputStyle}
                defaultValue={"10:00~"}
                {...register(id, validation)}
            >
                {list.map((value, index) => (
                    <option key={index} value={value.time}>
                      {value.time}
                    </option>
                ))}
            </Select>
        ) : (
            <Text bg="gray.200" pl="4" pt="2" minH="2.4rem"  style={confirmText}>
                {getValues(id)}
            </Text>
        )}
        <FormErrorMessage>
            <Text as="span" fontSize={{ base: "12px", lg: "14px" }}>
                {errors[id] && errors[id].message}
            </Text>
        </FormErrorMessage>
    </FormControl>
  );
};

export default SelectTimeControl;
