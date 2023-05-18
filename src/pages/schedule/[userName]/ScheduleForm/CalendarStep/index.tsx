import { Calendar } from "@/components/Calendar";
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./styles";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

export default function CalendarStep(){
    const [ selectedDate, setSelectedDate ] = useState<Date | null>(null)

    const isDaySelected = !!selectedDate
    
    const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
    const dayDescription= selectedDate ? dayjs(selectedDate).format('DD[ de ]MMMM') : null

    return (
        <Container isTimePickerOpen={isDaySelected}>
            <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate}  />

            {
                isDaySelected && (
                    <TimePicker >
                        <TimePickerHeader>
                            {weekDay}, <span>{dayDescription} </span>
                        </TimePickerHeader>
                        <TimePickerList>
                            <TimePickerItem>08:00h</TimePickerItem>
                            <TimePickerItem>08:00h</TimePickerItem>
                            <TimePickerItem>08:00h</TimePickerItem>
                            <TimePickerItem>08:00h</TimePickerItem>
                            <TimePickerItem>08:00h</TimePickerItem>
                            <TimePickerItem>08:00h</TimePickerItem>
                            <TimePickerItem>08:00h</TimePickerItem>
                            <TimePickerItem>08:00h</TimePickerItem>
                            <TimePickerItem>08:00h</TimePickerItem>
                            <TimePickerItem>08:00h</TimePickerItem>
                            <TimePickerItem>08:00h</TimePickerItem>
                            <TimePickerItem>08:00h</TimePickerItem>
                            <TimePickerItem>08:00h</TimePickerItem>
                            <TimePickerItem>08:00h</TimePickerItem>
                            <TimePickerItem>08:00h</TimePickerItem>
                        </TimePickerList>
                    </TimePicker>
                )
            }
        </Container>
    );
}