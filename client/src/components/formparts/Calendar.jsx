import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
    Flex,
    Box,
  } from '@chakra-ui/react';

const Calendar = (props) => {
  return (
    <Box fontSize="11px" w={{base: "100%", lg: "80%"}} >
      <FullCalendar
        locale="ja"
        height="23rem"
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth" // 週表示ではなく、月表示に変更
        selectable={true}
        selectLongPressDelay={0}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5], // 月曜から金曜
          startTime: '00:00',
          endTime: '24:00'
        }}
        weekends={true}
        titleFormat={{
          year: 'numeric',
          month: 'short'
        }}
        dayHeaderContent={(args) => {
            // 曜日のみ表示
            return args.date.toLocaleDateString('ja-JP', { weekday: 'narrow' });
        }}
      />
    </Box>
  );
};

export default Calendar;