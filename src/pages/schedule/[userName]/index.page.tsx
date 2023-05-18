import { Avatar, Heading, Text } from "@ignite-ui/react";
import { Container, UserHeader } from "./styles";
import { GetStaticPaths, GetStaticProps } from "next";
import { prisma } from "@/lib/prisma";
import ScheduleForm from "./ScheduleForm";

interface ScheduleProps {
  user: {
    name: string;
    bio: string;
    avatar: string;
  }
}

export default function Schedule({user}: ScheduleProps){
    return (
        <Container>
          <UserHeader>
            <Avatar src={user.avatar} />
            <Heading>{user.name}</Heading>
            <Text>{user.bio}</Text>
          </UserHeader>

          <ScheduleForm />
        </Container>
    );
}

export const getStaticPaths:GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const userName = String(params?.userName)

  const user = await prisma.user.findUnique({
    where: {
      username: userName
    }
  })

  if(!user) {
    return{ 
      notFound: true
    }
  }

  return { 
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatar: user.avatar_url,
      }
    },
    revalidate: 60 * 60 * 24 // 1 dia
  }
}