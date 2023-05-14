import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { buildNextAuthOptions } from '../auth/[...nextauth].api';
import { z } from 'zod';

const timeIntervalsFormSchema = z.object({
  intervals: z.array(z.object({
    weekDay: z.number(),
    startTimeInMinutes: z.number(),
    endTimeInMinutes: z.number()
  }))
})

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
){
  if(req.method != 'POST'){
    return res.status(400).end()
  }


  const session = await getServerSession(req, res, buildNextAuthOptions(req, res))
  console.log(session)

  if(!session){
    return res.status(401).end()
  }

  const { intervals } = timeIntervalsFormSchema.parse(req.body)

  await Promise.all(intervals.map(interval => {
    return prisma.userTimeInterval.create({
      data: {
        week_day: interval.weekDay,
        time_start_in_minuts: interval.startTimeInMinutes,
        time_end_in_minuts: interval.endTimeInMinutes,
        user_id: session.user?.id
      }
    })
  }))
  

  return res.status(201).end()
}