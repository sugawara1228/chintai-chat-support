import React, { useState, useEffect } from 'react';
import {
  Flex,
  FormLabel,
  Badge,
  Text,
  Box,
  Input,
  Select,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { prefectures } from '../../constant/constant';
import axios from 'axios';

const AddressFormControl = (props) => {
    const { 
        labelName, 
        badge, 
        isSubmit, 
        errors, 
        register, 
        getValues,
        setValue,
    } = props;

    const [pref, setPref] = useState("");
    const [city, setCity] = useState("");
    const [town, setTown] = useState("");

    /** 住所自動入力 */
    const handleZipcode = async (e) => {
        const res = await axios.get('https://api.zipaddress.net/?zipcode=' + e.target.value);
        if(res.data.code === 200) {
          setValue("prefecture", res.data.data.pref);
          setValue("city", res.data.data.city);
          setValue("town", res.data.data.town);
        }
    }
  
    /** style  */ 
    const inputStyle = { border: "1px solid #d5d5d5", fontSize: "14px", borderRadius: "4px" };
    const formLabelStyle = { letterSpacing: "1px", color: "#444", fontSize: "15px" };
    const placeholderStyle = { opacity: "1", color: 'gray.400' };
    const subTextStyle = { fontSize: "12px", color: "#999", display: "inline-block", marginBottom: "4px", marginTop: "0" };
    const confirmText = { borderBottom: "1px", solid: "#ccc", paddingBottom: ".5rem"}
  
    return (
        <>
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
        <Flex mb=".9rem">
            <Box w="48%" mr="4">
                <FormControl>
                    <FormLabel style={formLabelStyle} >
                        <Text as="span" fontSize={{base: "12px", lg: "14px"}}>
                            郵便番号
                        </Text>
                    </FormLabel>
                    {!isSubmit ? (
                        <Input
                        id="zipcode"
                        type="text"
                        maxLength={7}
                        fontSize={{base: "12px", lg: "14px"}}
                        height={{base: "2.7rem", lg: "2.7rem"}}
                        placeholder=""
                        _placeholder={placeholderStyle}
                        style={inputStyle}
                        {...register("zipcode",
                            {
                                required: '入力が必須の項目です。',
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: '半角数字のみで入力してください。',
                                }
                            }
                        )}
                        onChange={handleZipcode}
                        />
                    ) : (
                        <Text bg="gray.200" pl="4" pt="2" style={confirmText}>
                            {getValues("zipcode")}
                        </Text>
                    )}
                    <Text as="span" color="red" fontSize={{base: "12px", lg: "14px"}}>
                        {errors.zipcode && errors.zipcode.message}
                    </Text>
                </FormControl>
            </Box>
            <Box w="48%">
                <FormControl>
                    <FormLabel style={formLabelStyle} >
                        <Text as="span" fontSize={{base: "12px", lg: "14px"}}>
                            都道府県
                        </Text>                  
                    </FormLabel>
                    {!isSubmit ? (
                        <Select
                            id="prefecture"
                            type="text"
                            fontSize={{base: "12px", lg: "14px"}}
                            height={{base: "2.7rem", lg: "2.7rem"}}
                            placeholder="選択してください"
                            _placeholder={placeholderStyle}
                            style={inputStyle}
                            {...register("prefecture", 
                                {
                                    required: '入力が必須の項目です。',
                                }
                            )}
                            onChange={(e) => setPref(e.target.value)}
                        >
                            {prefectures.map((prefecture) => (
                                <option key={prefecture.code} value={prefecture.name}>
                                    {prefecture.name}
                                </option>
                            ))}
                        </Select>
                    ) : (
                        <Text bg="gray.200" pl="4" pt="2" style={confirmText}>
                            {getValues("prefecture")}
                        </Text>
                    )}
                    <Text as="span" color="red" fontSize={{base: "12px", lg: "14px"}}>
                        {errors["prefecture"] && errors["prefecture"].message}
                    </Text>
                </FormControl>
            </Box>
        </Flex>
        <FormControl mb=".9rem">
            <FormLabel style={formLabelStyle} >
                <Text as="span" fontSize={{base: "12px", lg: "14px"}}>
                    市区町村
                </Text>                  
            </FormLabel>
            {!isSubmit ? (
                <Input
                id="city"
                type="text"
                fontSize={{base: "12px", lg: "14px"}}
                height={{base: "2.7rem", lg: "2.7rem"}}
                placeholder=""
                _placeholder={placeholderStyle}
                style={inputStyle}
                {...register("city",
                    {
                        required: '入力が必須の項目です。',
                    }
                )}
                onChange={(e) => setCity(e.target.value)}
                />
            ) : (
                <Text bg="gray.200" pl="4" pt="2" style={confirmText}>
                    {getValues("city")}
                </Text>
            )}
            <Text as="span" color="red" fontSize={{base: "12px", lg: "14px"}}>
                {errors.city && errors.city.message}
            </Text>
        </FormControl>
        <FormControl mb=".9rem">
            <FormLabel style={formLabelStyle} >
                <Text as="span" fontSize={{base: "12px", lg: "14px"}}>
                    番地
                </Text>                  
            </FormLabel>
            {!isSubmit ? (
                <Input
                id="town"
                type="text"
                fontSize={{base: "12px", lg: "14px"}}
                height={{base: "2.7rem", lg: "2.7rem"}}
                placeholder=""
                _placeholder={placeholderStyle}
                style={inputStyle}
                {...register("town",
                    {
                        required: '入力が必須の項目です。',
                    }
                )}
                onChange={(e) => setTown(e.target.value)}
                />
            ) : (
                <Text bg="gray.200" pl="4" pt="2" style={confirmText}>
                    {getValues("town")}
                </Text>
            )}
            <Text as="span" color="red" fontSize={{base: "12px", lg: "14px"}}>
                {errors.town && errors.town.message}
            </Text>
        </FormControl>
        <FormControl mb=".9rem">
            <FormLabel style={formLabelStyle} >
                <Text as="span" fontSize={{base: "12px", lg: "14px"}}>
                    建物名・部屋番号
                </Text>                  
            </FormLabel>
            {!isSubmit ? (
                <Input
                id="build"
                type="text"
                fontSize={{base: "12px", lg: "14px"}}
                height={{base: "2.7rem", lg: "2.7rem"}}
                placeholder=""
                _placeholder={placeholderStyle}
                style={inputStyle}
                {...register("build")}
                />
            ) : (
                <Text bg="gray.200" pl="4" pt="2" minH="2.4rem" style={confirmText}>
                    {getValues("build")}
                </Text>
            )}
        </FormControl>
      </>
    );
  };
  
  export default AddressFormControl;
  