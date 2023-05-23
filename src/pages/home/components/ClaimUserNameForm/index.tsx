import { Button, Text, TextInput } from '@ignite-ui/react'
import { Form, FormAnotation } from './styles'
import { ArrowRight } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

const preRegisterZodSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Deve ter ao menos 3 caracteres' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Apenas letras e hifens' })
    .transform((value) => value.toLowerCase()),
})

type PreregisterFormProps = z.infer<typeof preRegisterZodSchema>

export default function ClaimUserNameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PreregisterFormProps>({
    resolver: zodResolver(preRegisterZodSchema),
  })

  const router = useRouter()

  async function handlePreRegister(data: PreregisterFormProps) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handlePreRegister)}>
        <TextInput
          size={'sm'}
          prefix="ignite.com/"
          placeholder="Seu Usuário"
          {...register('username')}
        />
        <Button type="submit" size={'sm'} disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>
      <FormAnotation>
        <Text size={'sm'}>
          {errors.username
            ? errors.username.message
            : 'Digite o nome de usuário desejado'}
        </Text>
      </FormAnotation>
    </>
  )
}
