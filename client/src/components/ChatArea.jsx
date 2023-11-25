import React, { useState, useEffect, useRef } from 'react';
import {
  Flex,
  Image,
  Button,
  Box,
  Spinner,
  SkeletonCircle,
} from '@chakra-ui/react';
import CLPSpeechBubble from './CLPSpeechBubble';
import UserSpeechBubble from './UserSpeechBubble';
import * as Buttons from '../scenario/choicesBtn';
import * as replyMessage from '../scenario/replyMessage';
import ChatAreaHeader from './ChatAreaHeader';
import { messageMappings, buttonMappings } from '../scenario/mappings';

const ChatArea = () => {

    const [ messageList, setMessageList ] = useState([]);
    const [ dispChoices, setDispChoices ] = useState([]);
    const [ resetTrigger, setResetTrigger ] = useState(false);
    const [ isResetLoading, setIsResetLoading ] = useState(false);
    const [ choiceHistory, setChoiceHistory ] = useState(["0"]);
    const [ historyNone, setHistoryNone ]  = useState(true);
    const messagesRef = useRef(null);

    useEffect(() => {
        setIsResetLoading(true);
        setTimeout(() => {
            setResetTrigger((prevTrigger) => !prevTrigger);
            setIsResetLoading(false);
        }, 2000);
    },[])

    useEffect(() => {

        /** 初期表示メッセージのセット */
        setMessageList((prevMessageList) => [...prevMessageList, replyMessage.firstMsg ]);

        /** 初期選択肢のセット */
        setDispChoices(Buttons.firstButtons);

        /** クリーンアップ処理 */
        return () => {
            setMessageList([]);
            setDispChoices([]);
            setChoiceHistory(["0"]);
        }
    },[resetTrigger]); 

    /** chatエリア更新時処理 */
    useEffect(() => {
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
      }, [messageList]);

    /** 選択履歴更新時処理 */
    useEffect(() => {
        console.log(`choiceHistory: ${choiceHistory}`);
        if(choiceHistory.length === 1) {
            setHistoryNone(true);
        }
        console.log(`HistoryNone: ${historyNone}`);
      }, [choiceHistory]);

    /** ユーザーの選択肢押下処理 */
    const clickChoicesBtn = ( btnId, label ) => {
        /** 前の選択肢を非表示 */
        setDispChoices([]);
        /** 選んだ選択肢を画面に反映 */
        setMessageList((prevMessageList) => [...prevMessageList, { text: [label], CLPMsg: false }]);

        /** 選択肢によって次に表示するメッセージ・選択肢をセット */
        const message = messageMappings[btnId];
        const buttons = buttonMappings[btnId];

        /* チャット入力中表示 */
        const loadingHtmlContent = (
            <>
                <SkeletonCircle size='2' mr="1"/>
                <SkeletonCircle size='2' mr="1"/>
                <SkeletonCircle size='2' mr="1"/>
            </>
        );
        setTimeout(() => {
            setMessageList((prevMessageList) => [...prevMessageList, {text: [loadingHtmlContent], CLPMsg: true }]);
        }, 500);
        
        /** ユーザーの選択による回答・次の選択肢の表示 */
        setTimeout(() => {
            setMessageList((prevMessageList) => {
                const newMessageList = [...prevMessageList];
                if (newMessageList.length > 0) {
                    newMessageList.pop();
                  }
                  return newMessageList;
            });
            setMessageList((prevMessageList) => [...prevMessageList, message ]);
            setDispChoices(buttons);
        }, 1500);

        /** 選択履歴を保存 */
        setChoiceHistory((prevChoiceHistory) => [...prevChoiceHistory, btnId]);
        console.log(`選択したid: ${btnId}`);

        setHistoryNone(false);
    }


    /** 最初に戻るボタン押下時処理 */
    const clickResetBtn = () => {
        setIsResetLoading(true);
        setTimeout(() => {
            setResetTrigger((prevTrigger) => !prevTrigger);
            setIsResetLoading(false);
        }, 1300);
       
    }

    /** 1つ前に戻るボタン押下時処理 */
    const clickPrevBtn = async () => {
        /** 前の選択肢を非表示 */
        setDispChoices([]);
        /** 前回のメッセージを削除 */
        setMessageList((prevMessageList) => {
            const newMessageList = [...prevMessageList];
            if (newMessageList.length > 0) {
                newMessageList.pop();
                newMessageList.pop();
              }
              return newMessageList;
        });

        /** setStateが非同期処理なため、先に表示する対象のIdを定義 */
        const dispHistoryId = choiceHistory[choiceHistory.length -2]

        /** 履歴を一つ前に戻す */
        setChoiceHistory((prevHistory) => {
            const newHistory = [...prevHistory];
            if (newHistory.length > 0) {
                newHistory.pop();
              }
              return newHistory;
        });
        
        setTimeout(() => {
            console.log(`選択したid: ${dispHistoryId}`);
            setDispChoices(buttonMappings[dispHistoryId]);
        }, 100) 
    }

    return (
        <>
        <ChatAreaHeader clickResetBtn={clickResetBtn} clickPrevBtn={clickPrevBtn} historyNone={historyNone} />
        <Flex w="100%" h="79%" flexDirection="column" p="1rem" overflowY="scroll" position="relative" ref={messagesRef}> 
        {isResetLoading ? (
                <Box
                    position="fixed"
                    top="0"
                    left="100%"
                    transform="translateX(-100%)"
                    width={{base: "100%", lg: "50%"}}
                    height="100vh"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bg="rgba(0, 0, 0, 0.3)"
                    zIndex="101"
                >
                    <Spinner color="white" size="xl" thickness='4px'/>
                </Box>
            ) : ( 
            <>
            {messageList.map((message, index) => (
                <>
                {message.CLPMsg ? (
                    /* CLP側　チャット */
                    <Flex mb="3">
                        <Box w={{base: "18%", lg: "80px"}}>
                            <Image 
                            src="./img/android-chrome-152x152.png"
                            boxSize={{base: "45px", lg: "50px"}}
                            objectFit="cover"
                            />
                        </Box> 
                        <Flex w={{base: "72%", lg: "auto"}} flexDirection="column" mt="1">
                        {message.text.map((msg, index) => (
                            <CLPSpeechBubble key={index}>
                                {msg}
                            </CLPSpeechBubble>
                            ))}
                        </Flex>
                        
                    </Flex>
                ) : (
                    /* ユーザー側　チャット */
                    <Flex h="4rem" align="center" mb="3" justify="flex-end">
                        <Flex>
                            {message.text.map((msg) => (
                                <UserSpeechBubble key={index}>
                                    {msg}
                                </UserSpeechBubble>
                            ))}
                        </Flex>
                    </Flex>
                )}
                </>
            ))} 
            {/* ユーザの選択肢表示エリア */}
            <Box w={{base: "80%", lg: "60%"}} position="sticky" bottom="3" left="100%" zIndex="100">
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
            </Box>
            </>
        )}
        </Flex>
        </>
    );
}

export default ChatArea;
