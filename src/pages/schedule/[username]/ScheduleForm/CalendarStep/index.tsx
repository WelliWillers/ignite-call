import { Calendar } from "@/components/Calendar";
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./styles";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import { api } from "@/lib/axios";

interface Availability {
    possibleTimes: number[];
    availableTimes: number[];
}

export default function CalendarStep(){
    const [ selectedDate, setSelectedDate ] = useState<Date | null>(null)
    const [ availability, setAvailability ] = useState<Availability | null>(null)

    const route = useRouter()
    const isDaySelected = !!selectedDate
    
    const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
    const dayDescription= selectedDate ? dayjs(selectedDate).format('DD[ de ]MMMM') : null

    useEffect(() => {
        if(!selectedDate){
            return
        }

        api.get(`users/${String(route.query.username)}/availability`, {
            params: {
                date: dayjs(selectedDate).format('YYYY-MM-DD'),
            }
        }).then(response => {
            console.log(response.data)
            setAvailability(response.data)
        })
    },[selectedDate])
    
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