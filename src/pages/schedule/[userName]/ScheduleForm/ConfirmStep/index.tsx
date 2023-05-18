import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { ConfirmForm, ConfirmFormActions, ConfirmFormError, ConfirmFormHeader } from "./styles";
import { CalendarBlank, Clock } from "@phosphor-icons/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";

const confirmStepSchema = z.object({
  name: z.string().min(3, {message: 'Deve ter ao menos 3 caracteres'}),
  email: z.string().email({message: 'Deve ser um e-mail válido'}),
  observations: z.string().nullable()
})

type ConfirmStepFormData = z.infer<typeof confirmStepSchema>

export default function ConfirmStep(){

  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting, 
      errors
    }
  } = useForm<ConfirmStepFormData>({
    resolver: zodResolver(confirmStepSchema)
  })

  function handleConfirmScheduling(data: ConfirmStepFormData){

  }

    return (
      <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
        <ConfirmFormHeader>
          <Text>
            <CalendarBlank />
            22 de Setembro de 2023
          </Text>
          <Text>
            <Clock />
            18:00h
          </Text>
        </ConfirmFormHeader>

        <label>
          <Text size={"sm"}>Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register("name")} />
          {errors.name && (
            <ConfirmFormError size={'sm'}>{errors.name?.message}</ConfirmFormError>
          )}
        </label>

        <label>
          <Text size={"sm"}>Endereço de e-mail</Text>
          <TextInput
            placeholder="jonhdoe@example.com"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <ConfirmFormError size={'sm'}>{errors.email?.message}</ConfirmFormError>
          )}
        </label>

        <label>
          <Text size={"sm"}>Observações</Text>
          <TextArea {...register("observations")} />
        </label>

        <ConfirmFormActions>
          <Button type="button" variant={"tertiary"}>
            Cancelar
          </Button>
          <Button type="submit">Confirmar</Button>
        </ConfirmFormActions>
      </ConfirmForm>
    );
}