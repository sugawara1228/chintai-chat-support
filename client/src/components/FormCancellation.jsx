import React, { useState, useEffect, useRef } from 'react';
import {
  Flex,
  Input,
  FormLabel,
  Badge,
  Text,
  Box,
  Select,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Icon,
} from '@chakra-ui/react';
import { mainColor, timeSlots } from '../constant/constant';
import { useForm, Controller } from 'react-hook-form';
import { prefectures } from '../constant/constant';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import { ChatIcon } from '@chakra-ui/icons';
import TextFormControl from './formparts/TextFormControl';
import DatePicker from "react-multi-date-picker";
import { addDays } from 'date-fns';
import { registerLocale } from 'react-datepicker';
// 日本語化
import ja from "date-fns/locale/ja";
import axios from 'axios';
import TextAreaFormControl from './formparts/TextAreaFormControl';
import SelectTimeControl from './formparts/SelectTimeControl';
import CheckBoxFormControl from './formparts/CheckBoxFormControl';
import AddressFormControl from './formparts/AddressFormControl';
registerLocale("ja", ja);

const FormCancellation = () => {

    const { control, register, handleSubmit, getValues, setValue, formState: { errors, isDirty }, } = useForm({
        mode: 'onBlur',
        criteriaMode: 'all',
    });

    const [isSubmit, setIsSubmit] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const scrollToRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    },[])

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isDirty) {
            setFormIsValid(true);
          } else {
            setFormIsValid(false);
          }
    },[errors, isDirty])

    /** 戻るボタン押下時処理  */ 
    const prevFromInput = (e) => {
        setIsLoading(true);
        e.preventDefault(); 
        setTimeout(() => {
            setIsSubmit(false);
            setIsLoading(false);
            scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 400)
    }

    /** 確認画面へ・送信ボタン押下時処理 */ 
    const onSubmit = async (data) => {
        setIsLoading(true);
        if(isSubmit) {
            // 送信時処理
                
                // 完了画面に遷移
                //navigate("Complete", {formType: "cancellation"});
            
        } else {
            // 確認画面へ
            setIsSubmit(true);
        }
        
        setIsLoading(false);
        scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    /** チャットサポートへ戻る */ 
    const prevChatArea = () => {
        navigate('../chintai-chat-support');
    }

    return (
        <Flex 
            w="100%" 
            h="100%" 
            flexDirection="column" 
            overflowY="scroll" 
            align="center"
            pb="4rem"
            position="relative"
         >
            {isLoading ? <Loading /> : null }
            {isSubmit ? null : (
                <Flex w="100%" h={{base: "10%", lg: "8%"}} maxH={{base: "50px", lg: "8%"}} align="center" borderBottom="1px solid #ddd" >
                    <Button  
                        onClick={prevChatArea} 
                        bg="#eee"
                        color="#333"
                        _hover={{opacity: "0.8"}} 
                        fontSize="14px" 
                        py="5" 
                        my="8"
                        mx="5"
                    >
                        <Icon as={ChatIcon} mr="2" /> 
                        チャットサポート
                        に戻る
                    </Button>
                </Flex>
            )}
            <Heading as="h2" fontSize={{base: "14px", lg: "20px"}} color="#444" mt="3rem" mb="2rem">
                {isSubmit ? "解約申込フォーム（確認画面）" :  "解約申込フォーム"}
            </Heading>
            <Box w={{base: "90%", lg: "80%"}} >
                <form style={{width: "100%"}}  onSubmit={handleSubmit(onSubmit)} method='post'>
                    <TextFormControl 
                        id="name"
                        labelName="氏名（フルネーム）"
                        badge={true}
                        register={register}
                        errors={errors}
                        validation={{ required: '入力が必須の項目です。' }}
                        isSubmit={isSubmit}
                        getValues={getValues}
                        placeholder="暮阿 太郎"
                    />
                    <TextFormControl 
                        id="propertyName"
                        labelName="物件名"
                        badge={true}
                        register={register}
                        errors={errors}
                        validation={{ required: '入力が必須の項目です。' }}
                        isSubmit={isSubmit}
                        getValues={getValues}
                    />
                    <TextFormControl 
                        id="roomNumber"
                        labelName="号室"
                        badge={true}
                        register={register}
                        errors={errors}
                        validation={{ required: '入力が必須の項目です。' }}
                        isSubmit={isSubmit}
                        getValues={getValues}
                    />
                    <TextFormControl 
                        id="tel"
                        labelName="電話番号"
                        badge={true}
                        register={register}
                        errors={errors}
                        validation={{
                            required: '入力が必須の項目です。',
                            pattern: {
                                value: /^[0-9]+$/,
                                message: '半角数字のみで入力してください。',
                            }
                        }}
                        isSubmit={isSubmit}
                        getValues={getValues}
                        placeholder="09012345678"
                    />
                    <TextFormControl 
                        id="email"
                        labelName="メールアドレス"
                        badge={true}
                        register={register}
                        errors={errors}
                        validation={{
                            required: '入力が必須の項目です。',
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: '正しいメールアドレスの形式で入力してください。',
                            }
                        }}
                        isSubmit={isSubmit}
                        getValues={getValues}
                        placeholder="example@mail.com"
                    />
                    <TextFormControl 
                        id="email2"
                        labelName="メールアドレス(確認用)"
                        badge={true}
                        register={register}
                        errors={errors}
                        validation={{
                            required: '入力が必須の項目です。',
                            validate: (value) => value === getValues('email') || 'メールアドレスが一致しません。',
                        }}
                        isSubmit={isSubmit}
                        getValues={getValues}
                        placeholder="example@mail.com"
                    />
                    <TextFormControl 
                        id="leavingDay"
                        labelName="退去希望日"
                        badge={true}
                        register={register}
                        errors={errors}
                        validation={{
                            required: '入力が必須の項目です。',
                            pattern: {
                                value: /^\d{4}\/\d{2}\/\d{2}$/,
                                message: 'yyyy/mm/ddの形式で入力してください。',
                            }
                        }}
                        isSubmit={isSubmit}
                        getValues={getValues}
                        placeholder="2023/01/01"
                    />
                    <TextFormControl 
                        id="presenceDay1"
                        labelName="立会希望日（第一希望）"
                        subText="※引っ越し後、お部屋が空の状況で行います。"
                        badge={true}
                        register={register}
                        errors={errors}
                        validation={{
                            required: '入力が必須の項目です。',
                            pattern: {
                                value: /^\d{4}\/\d{2}\/\d{2}$/,
                                message: 'yyyy/mm/ddの形式で入力してください。',
                            }
                        }}
                        isSubmit={isSubmit}
                        getValues={getValues}
                        placeholder="2023/01/01"
                    />
                    <SelectTimeControl
                        id="presenceTime1"
                        labelName=""
                        list={timeSlots}
                        badge={false}
                        register={register}
                        errors={errors}
                        validation={{
                            required: '入力が必須の項目です。',
                        }}
                        isSubmit={isSubmit}
                        getValues={getValues}
                    />
                    <TextFormControl 
                        id="presenceDay2"
                        labelName="立会希望日（第二希望）"
                        badge={true}
                        register={register}
                        errors={errors}
                        validation={{
                            required: '入力が必須の項目です。',
                            pattern: {
                                value: /^\d{4}\/\d{2}\/\d{2}$/,
                                message: 'yyyy/mm/ddの形式で入力してください。',
                            }
                        }}
                        isSubmit={isSubmit}
                        getValues={getValues}
                        placeholder="2023/01/01"
                    />
                    <SelectTimeControl
                        id="presenceTime2"
                        labelName=""
                        list={timeSlots}
                        badge={false}
                        register={register}
                        errors={errors}
                        validation={{
                            required: '入力が必須の項目です。',
                        }}
                        isSubmit={isSubmit}
                        getValues={getValues}
                    />
                    <CheckBoxFormControl
                        id="liquidation"
                        labelName="清算について"
                        text={["※賃貸借契約書に沿って精算させていただきます。",
                           "短期解約違約金が発生する場合がございますのでご確認下さいませ。"]}
                        list={timeSlots}
                        badge={true}
                        register={register}
                        errors={errors}
                        validation={{
                            required: '確認が必須の項目です。',
                        }}
                        isSubmit={isSubmit}
                        getValues={getValues}
                    />
                    <TextFormControl 
                        id="keys"
                        labelName="鍵の保有数"
                        badge={true}
                        register={register}
                        errors={errors}
                        validation={{
                            required: '入力が必須の項目です。',
                            pattern: {
                                value: /^[0-9]+$/,
                                message: '半角数字のみで入力してください。',
                            }
                        }}
                        isSubmit={isSubmit}
                        getValues={getValues}
                        placeholder="2"
                    />
                    <TextFormControl 
                        id="movingDay"
                        labelName="引越し予定日"
                        badge={true}
                        register={register}
                        errors={errors}
                        validation={{
                            required: '入力が必須の項目です。',
                            pattern: {
                                value: /^\d{4}\/\d{2}\/\d{2}$/,
                                message: 'yyyy/mm/ddの形式で入力してください。',
                            }
                        }}
                        isSubmit={isSubmit}
                        getValues={getValues}
                        placeholder="2023/01/01"
                    />
                    <AddressFormControl
                        id="movingAddress"
                        labelName="引越し先住所"
                        badge={true}
                        register={register}
                        errors={errors}
                        isSubmit={isSubmit}
                        getValues={getValues}
                        setValue={setValue}
                    />
                    <TextAreaFormControl 
                        id="other"
                        labelName="その他"
                        badge={false}
                        register={register}
                        errors={errors}
                        isSubmit={isSubmit}
                        getValues={getValues}
                    />
                    
                    <Flex w="100%" justify="center" mt="12" >
                        {isSubmit ? (
                            <>
                                <Button
                                    type="button"
                                    w="20%"
                                    h="3rem"
                                    mr="8"
                                    colorScheme='gray'
                                    onClick={ prevFromInput }
                                >
                                    戻る
                                </Button>
                                <Button
                                    type="submit"
                                    w="60%" 
                                    h="3rem"
                                    bg='teal.400' 
                                    color="white"
                                    _hover={{ background: "teal.500" }}
                                >
                                    この入力内容で送信する
                                </Button>
                            </>
                        ) : (
                            <Button
                                type="submit"
                                w="70%" 
                                h="3rem"
                                bg='teal.400' 
                                color="white"
                                _hover={{ background: "teal.500" }}
                            >
                                入力内容を確認する
                            </Button>
                        )}
                        
                    </Flex>
                </form>
            </Box>
            <Box position="absolute" top="0" ref={scrollToRef} />
        </Flex>
    );
}

export default FormCancellation;
