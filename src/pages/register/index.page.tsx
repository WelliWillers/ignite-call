import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { Container, Form, FormError, Header } from './styles'
import { ArrowRight } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { NextSeo } from 'next-seo'

const RegisterZodSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Deve ter ao menos 3 caracteres' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Apenas letras e hifens' })
    .transform((value) => value.toLowerCase()),
  name: z.string().min(3, { message: 'Deve ter ao menos 3 caracteres' }),
})

type RegisterFormProps = z.infer<typeof RegisterZodSchema>

export default function register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormProps>({
    resolver: zodResolver(RegisterZodSchema),
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterFormProps) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      await router.push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response?.data.message)
        return
      }

      console.error(err)
    }
  }

  return (
    <>
      <NextSeo title="Crie uma conta | Ignite call" />
      <Container>
        <Header>
          <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>

          <MultiStep size={4} currentStep={1} />
        </Header>

        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size={'sm'}> Nome de usuário</Text>
            <TextInput
              prefix="ignite.com/"
              placeholder="seu-usuário"
              {...register('username')}
            />
            {errors.username && (
              <FormError size={'sm'}>{errors.username.message}</FormError>
            )}
          </label>
          <label>
            <Text size={'sm'}> Nome completo</Text>
            <TextInput placeholder="Seu nome" {...register('name')} />
          </label>
          {errors.name && (
            <FormError size={'sm'}>{errors.name.message}</FormError>
          )}

          <Button type="submit" size={'sm'} disabled={isSubmitting}>
            {' '}
            Próximo passo <ArrowRight />{' '}
          </Button>
        </Form>
      </Container>
    </>
  )
}
