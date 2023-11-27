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
import { mainColor } from '../constant/constant';
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
registerLocale("ja", ja);

const FormCancellation = () => {

    const { control, register, handleSubmit, getValues, formState: { errors, isDirty }, } = useForm({
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
        }, 300);
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
    const onSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            if(isSubmit) {
                    // 送信時処理
            } else {
                    // 確認画面へ
                setIsSubmit(true);
            }
            
            setIsLoading(false);
            
        }, 1000);
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
            <Heading as="h2" fontSize="22px" color="#444" mt="3rem" mb="2rem">
                {isSubmit ? "解約申込フォーム（確認画面）" :  "解約申込フォーム"}
            </Heading>
            <form style={{width: "80%"}} onSubmit={handleSubmit(onSubmit)} method='post'>
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
                />
                <label>Date:</label>
                <Controller
                    control={control}
                    name="date"
                    rules={{ required: '日付を選択してください。' }}
                    render={({ field }) => (
                    <DatePicker
                        {...field}
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                        maxDate={addDays(new Date(), 30)}
                        calendarPosition="bottom-left"
                        locale="ja"
                    />
                    )}
                />
                {errors.date && <p>{errors.date.message}</p>}

                
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
            <Box position="absolute" top="0" ref={scrollToRef} />
        </Flex>
    );
}

export default FormCancellation;
