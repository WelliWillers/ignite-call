

import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if(req.method != 'GET'){
    return res.status(405).end()
  }  

  const username = String(req.query.username)

  const { date } = req.query

  if(!date){
    return res.status(400).json({message: 'Date not provided'})
  }

  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if(!user){
    return res.status(400).json({message: 'User not found'})
  }

  const referenceDate = dayjs(String(date))

  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if(isPastDate){
    return res.status(201).json({possibleTimes: [], availableTimes: []})
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day')
    }
  })

  if(!userAvailability){
    return res.status(201).json({possibleTimes: [], availableTimes: []})
  }

  const { time_end_in_minuts, time_start_in_minuts} = userAvailability

  const startHours = time_start_in_minuts / 60
  const endHours = time_end_in_minuts / 60

  const possibleTimes = Array.from({
    length: endHours - startHours
  }).map((_, i) => {
    return startHours + i
  })

  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true
    },
    where: {
      userId: user.id,
      date: {
        gte: referenceDate.set('hour', startHours).toDate(),
        lte: referenceDate.set('hour', endHours).toDate(),
      }
    }
  })

  const availableTimes = possibleTimes.filter((time) => {
    return !blockedTimes.some((blockedTimes) => {
      blockedTimes.date.getHours() === time
    })
  })

  return res.status(201).json({possibleTimes, availableTimes})
}
