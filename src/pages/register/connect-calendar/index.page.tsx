import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Header } from "../styles";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { ConnectItem, ConnectBox, AuthError } from "./styles";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ConnectCalendar(){

  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }
  
  // async function handleNavigateToNextStep(){
  //   await router.push('/register/time-intervals')
  // }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox as="form">
        <ConnectItem>
          <Text>
            Google Agenda
          </Text>
          {
            isSignedIn ? (
              <Button type="button" size={"sm"} disabled>
                Conectado
                <Check />
              </Button>
            ) : (
              <Button type="button" variant={'secondary'} size={"sm"} onClick={handleConnectCalendar}>
                Conectar
                <ArrowRight />
              </Button>
            )
          }
        </ConnectItem>

        {
          hasAuthError && (
            <AuthError size={"sm"}>
              Falha ao se conectar com o Google, verifique se você concedeu as permições de acesso ao Google Calendar.
            </AuthError>
          )
        }
        
        {/* @ts-ignore */}
        <Button 
          as={Link}
          href="/register/time-intervals"
          type="submit" 
          size={"sm"} 
          disabled={!isSignedIn}
        >
          Próximo passo 
          <ArrowRight />
        </Button>
      </ConnectBox>

    </Container>
  );
}