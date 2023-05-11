import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Header } from "../styles";
import { IntervalBox, IntervalDay, IntervalInputs, IntervalItem, IntervalsContainer } from "./styles";
import { ArrowRight } from "@phosphor-icons/react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getWeekDays } from "@/utils/get-week-days";

const timeIntervalsSchema = z.object({

})

export default function TimeIntervals() {

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekday: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekday: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekday: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ]
    },
    resolver: zodResolver(timeIntervalsSchema),
  })

  const weekdays = getWeekDays()

  const { fields } = useFieldArray({
    name: 'intervals',
    control
  })

  async function handleSetTimeIntervals(data: any){

  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá!</Heading>
        <Text>
          Defina os intervalos.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>

        <IntervalsContainer>
          {
            fields.map((field, index) => {
              return (
                <IntervalItem key={field.id}>
                  <IntervalDay>
                    <Checkbox checked={field.enabled} {...register(`intervals.${index}.enabled`)} />
                    <Text>{weekdays[field.weekday]}</Text>
                  </IntervalDay>
                  <IntervalInputs>
                    <TextInput defaultValue={field.startTime} size={'sm'} type="time" step={60} {...register(`intervals.${index}.startTime`)}/>
                    <TextInput defaultValue={field.endTime} size={'sm'} type="time" step={60} {...register(`intervals.${index}.endTime`)}/>
                  </IntervalInputs>
                </IntervalItem>
              )
            })
          }
        </IntervalsContainer>


        <Button type="submit" size={"sm"}>
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  );
}
