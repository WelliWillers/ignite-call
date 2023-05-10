import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Header } from "../styles";
import { ArrowRight } from "@phosphor-icons/react";
import { ConnectItem, ConnectBox } from "./styles";

export default function ConnectCalendar(){
  async function handleConnect() {
    
  }

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
          <Button type="button" variant={'secondary'} size={"sm"}>
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>
        <Button type="submit" size={"sm"}>
          Próximo passo 
          <ArrowRight />
        </Button>
      </ConnectBox>
        

    </Container>
  );
}