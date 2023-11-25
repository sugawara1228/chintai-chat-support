import React, { useState, useEffect, useRef} from 'react';
import { 
    Flex,
    Button,
    Heading,
    Text,
    Center,
    Input,
    Box,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Icon,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';

const ChatAreaHeader = ( props ) => {
    const { clickResetBtn, clickPrevBtn, historyNone } = props;
    const addModal = useDisclosure();
    const leaveModal = useDisclosure();
    const cancelRef = useRef(null);

    const clickYBtn = () => {
        clickResetBtn();
        addModal.onClose();
    }

    return (
        <Flex w="100%" h={{base: "10%", lg: "8%"}} borderBottom="1px solid #ddd" align="center" justify="flex-end">
          <Button bg="white" w={{base: "5rem", lg: "auto"}} h="70%" border='2px solid #E1E300' _hover={{opacity: "0.6"}}  fontSize={{base: "10px", lg: "sm"}} onClick={clickPrevBtn} isDisabled={historyNone}>
            1つ前に戻る
          </Button>
          <Button bg='#E1E300' w={{base: "5.5rem", lg: "auto"}} h="70%" _hover={{opacity: "0.6"}} mx={{base: "2", lg: "4"}} fontSize={{base: "10px", lg: "sm"}} onClick={addModal.onOpen}>
            <Icon as={RepeatIcon} mr="2" />
            最初に戻る
          </Button>
          <AlertDialog
            isOpen={addModal.isOpen}
            leastDestructiveRef={cancelRef}
            onClose={addModal.onClose}
            >
                <AlertDialogOverlay>
                <AlertDialogContent h="30%">
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    会話をリセットしてよろしいですか？
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        会話を最初からやり直したい場合は「はい」を<br />
                        戻る場合は「いいえ」を
                        押してください。
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button bg="#E1E300" _hover={{opacity: 0.8}} onClick={clickYBtn} mr="3"  w="6rem">
                        はい
                    </Button>
                    <Button ref={cancelRef} onClick={addModal.onClose} w="5rem">
                        いいえ
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Flex>
    );
}

export default ChatAreaHeader;
