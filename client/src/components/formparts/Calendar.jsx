import React, { useState } from 'react';
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const generateTimeSlots = () => {
  const timeSlots = [];
  const startTime = new Date();
  startTime.setHours(10, 0, 0, 0); // 開始時間 10:00

  for (let i = 0; i < 17; i++) {
    const slotTime = new Date(startTime.getTime() + i * 30 * 60 * 1000);
    timeSlots.push(slotTime);
  }

  return timeSlots;
};

const formatYearMonth = (date) => {
  return new Date(date).toLocaleDateString('ja-JP', { month: '2-digit', year: 'numeric' });
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ja-JP', { day: '2-digit' });
};

const formatTime = (time) => {
  return `${time.getHours()}:${('0' + time.getMinutes()).slice(-2)}`;
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
    setSelectedSlot(null); // 週が切り替わると選択もリセット
  };

  const prevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
    setSelectedSlot(null); // 週が切り替わると選択もリセット
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedSlot(null); // 今日に切り替わると選択もリセット
  };

  const handleSlotClick = (index, selectedDate, selectedTime) => {
    setSelectedSlot({
      index,
      selectedDate,
      selectedTime,
    });
    console.log(selectedDate, selectedTime);
  };

  const timeSlots = generateTimeSlots();

  return (
    <Box>
      <div>
        <Button onClick={prevWeek}>前の週</Button>
        <Button onClick={goToToday}>今日</Button>
        <Button onClick={nextWeek}>次の週</Button>
      </div>
      <Table maxW="100%">
        <Thead>
          <Tr>
            <Th border="1px solid #ddd" colSpan={8} textAlign="center">
              {formatYearMonth(currentDate)}
            </Th>
          </Tr>
          <Tr>
            <Th border="1px solid #ddd" textAlign="center">
              月
            </Th>
            <Th border="1px solid #ddd" colSpan={7} textAlign="center">
              日付
            </Th>
          </Tr>
          <Tr>
            <Th border="1px solid #ddd" textAlign="center">
              日付
            </Th>
            {Array.from({ length: 7 }, (_, i) => i).map((day) => {
              const currentDateForDay = new Date(currentDate);
              currentDateForDay.setDate(currentDate.getDate() + day);
              const startOfMonth = new Date(currentDateForDay.getFullYear(), currentDateForDay.getMonth(), 1);
              const endOfMonth = new Date(currentDateForDay.getFullYear(), currentDateForDay.getMonth() + 1, 0);
              const isStartOfMonth = currentDateForDay.getDate() === startOfMonth.getDate();
              const isEndOfMonth = currentDateForDay.getDate() === endOfMonth.getDate();
              const isSameMonth = currentDateForDay.getMonth() === currentDate.getMonth();
              return (
                <Th key={day} paddingX=".5rem" border="1px solid #ddd" textAlign="center">
                  {isStartOfMonth && isSameMonth && formatYearMonth(currentDateForDay)}
                  {isEndOfMonth && isSameMonth ? ` ~ ${formatYearMonth(currentDateForDay)}` : ''}
                  <br />
                  {formatDate(currentDateForDay)}({currentDateForDay.toLocaleDateString('ja-JP', { weekday: 'narrow' })})
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {timeSlots.map((timeSlot, index) => (
            <Tr key={index}>
              <Td fontSize="13px" paddingY=".6rem" paddingX=".5rem" textAlign="center" border="1px solid #ddd">
                {`${formatTime(timeSlot)}~`}
              </Td>
              {Array.from({ length: 7 }, (_, i) => i).map((day) => {
                const currentDateForCell = new Date(currentDate);
                currentDateForCell.setDate(currentDate.getDate() + day);
                const uniqueDate = formatDate(currentDateForCell);
                const uniqueTime = formatTime(timeSlot);
                return (
                  <Td
                    key={day}
                    onClick={() => handleSlotClick(index, uniqueDate, uniqueTime)}
                    bgColor={
                      selectedSlot !== null &&
                      selectedSlot.index === index &&
                      selectedSlot.selectedDate === uniqueDate &&
                      selectedSlot.selectedTime === uniqueTime
                        ? 'blue.200'
                        : 'white'
                    }
                    border="1px solid #ddd"
                  >
                    {/* 選択時に表示を変えないように何も表示しない */}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Calendar;
