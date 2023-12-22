import React from 'react';
import { Heading, Text, Button, Flex } from '@chakra-ui/react';
import FormNavigationButton from '../components/parts/FormNavigationButton';

export const firstMsg = {
    text: ["クレア・ライフ・パートナーズ賃貸チャットサポートです。", "お客様について、当てはまるものをお選びください。"],
    CLPMsg: true,
}

export const Msg1 = {
    text: ["承知しました。以下の選択肢から確認したい内容をお選びください。"],
    CLPMsg: true,
}

export const Msg2 = {
    text: ["承知しました。以下の選択肢から確認したい内容をお選びください。"],
    CLPMsg: true,
}

export const Msg1_1 = {
    text: ["選択肢1-1を選択しました。以下からさらに選択してください。"],
    CLPMsg: true,
}

export const Msg1_2 = {
    text: ["更新についての項目一覧です。", "以下から確認したい内容をお選びください。"],
    CLPMsg: true,
}

export const Msg1_3 = {
    text: ["退去についての項目一覧です。", "以下から確認したい内容をお選びください。"],
    CLPMsg: true,
}

export const Msg1_4 = {
    text: ["修繕・トラブル関係についての項目一覧です。", "以下から確認したい内容をお選びください。"],
    CLPMsg: true,
}

export const Msg1_1_1 = {
    text: ["選択肢1-1-1を選択。"],
    CLPMsg: true,
}

export const Msg1_3_1 = {
    text: [(
        <Flex flexDirection="column">
            <Heading as="h3" fontSize="md" my="3">
                【退去の申請方法】
            </Heading>
            <Text>
                退去の申請は個人契約、法人契約問わず、下記の退去申請フォームからお願いしております。<br />
                ご契約者様が法人契約の場合、必ず法人様から申請をお願いいたします。<br /><br />
            </Text>
            <Text as="span" display="block" mb="3">退去申請フォーム</Text>
            <FormNavigationButton path="./cancellation">
                退去申請フォームはこちら
            </FormNavigationButton>
            <Text>
                ※申請後のキャンセルはできかねます。<br />
                フォーム送信前に今一度、解約条件などご確認ください。<br />
                予めご理解いただきますようお願い申し上げます。<br />
            </Text>
        </Flex>
    )],
    CLPMsg: true,
}