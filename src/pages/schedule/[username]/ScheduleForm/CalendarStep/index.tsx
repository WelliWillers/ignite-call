import { Calendar } from "@/components/Calendar";
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./styles";
import { useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface Availability {
    possibleTimes: number[];
    availableTimes: number[];
}

export default function CalendarStep(){
    const [ selectedDate, setSelectedDate ] = useState<Date | null>(null)

    const route = useRouter()
    const isDaySelected = !!selectedDate
    
    const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
    const dayDescription= selectedDate ? dayjs(selectedDate).format('DD[ de ]MMMM') : null

    const dateWithoutTime = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null

    const { data: availability } = useQuery<Availability>(['availability', dateWithoutTime], async () => {
        const response = await api.get(`users/${String(route.query.username)}/availability`, {
            params: {
                date: dateWithoutTime,
            }
        })

        return response.data
    }, {
        enabled: !!selectedDate
    })

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
                            {
                                availability?.possibleTimes.map((hour) => {
                                    return (
                                      <TimePickerItem key={hour} disabled={!availability.availableTimes.includes(hour)} >
                                        {String(hour).padStart(2, "0")}:00h
                                      </TimePickerItem>
                                    );
                                })
                            }
                        </TimePickerList>
                    </TimePicker>
                )
            }
        </Container>
    );
}