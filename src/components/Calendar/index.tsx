import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from "./styles";
import { getWeekDays } from "@/utils/get-week-days";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

interface CalendarProps {
  selectedDate?: Date | null
  onDateSelected: (date: Date) => void
}

interface BlockedDates {
  blockedWeekDays: number[]
  blockedDates: number[]
}

export function Calendar({selectedDate, onDateSelected}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set("date", 1);
  });

  const route = useRouter()

  const currentMonth = currentDate.format("MMMM");
  const currentYear = currentDate.format("YYYY");

  const weekdays = getWeekDays({ short: true });

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, "month");
    setCurrentDate(previousMonth);
  }

  function handleNextMonth() {
    const nextMonth = currentDate.add(1, "month");
    setCurrentDate(nextMonth);
  }

  const { data: blockedDates } = useQuery<BlockedDates>(
    ["blocked-dates", currentDate.get("year"), currentDate.get("month")],
    async () => {
      const response = await api.get(
        `users/${String(route.query.username)}/blocked-dates`,
        {
          params: {
            year: currentDate.get("year"),
            month: currentDate.get("month") + 1,
          },
        }
      );

      return response.data;
    }
  );

  const calendarWeeks = useMemo(() => {

    if(!blockedDates){
      return []
    }

    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth()
    }).map((_, index) => {
      return currentDate.set('date', index + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const previousMonthWeekDays = Array.from({
      length: firstWeekDay
    }).map((_, i) => {
      return currentDate.subtract(i + 1, 'day')
    }).reverse()

    const lastDayInCurrentMonth = currentDate.set('date', currentDate.daysInMonth())
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1)
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })
    
    const calendarDays = [
      ...previousMonthWeekDays.map(date => {
        return { date, disabled: true}
      }),
      ...daysInMonthArray.map(date => {
        return { 
          date, 
          disabled: 
            date.endOf('day').isBefore(new Date()) ||
            blockedDates.blockedWeekDays.includes(date.get('day')) ||
            blockedDates.blockedDates.includes(date.get('date')),
        };
      }),
      ...nextMonthFillArray.map(date => {
        return { date, disabled: true}
      })
    ]

    const calendarWeeksDates = calendarDays.reduce<CalendarWeeks>((weeks, _, i, original) => {
      const isNewWeek = i % 7 === 0

      if(isNewWeek) {
        weeks.push({
          week: i / 7 + 1,
          days: original.slice(i, i + 7)
        })
      }

      return weeks
    }, [])
    
    return calendarWeeksDates
  }, [currentDate, blockedDates])

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>
        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Previous month">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="Next month">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {weekdays.map((weekday) => (
              <th key={weekday}>{weekday}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            calendarWeeks.map(week => {
              return (
                <tr key={week.week}>
                  {week.days.map(({ date, disabled }) => {
                    return (
                      <td key={date.toString()}>
                        <CalendarDay onClick={() => onDateSelected(date.toDate())} disabled={disabled}>
                          {date.get("date")}
                        </CalendarDay>
                      </td>
                    );
                  })}
                </tr>
              );
            })
          }
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
}
