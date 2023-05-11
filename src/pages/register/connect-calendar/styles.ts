import { Box, Heading, Text, styled } from "@ignite-ui/react";

export const Container = styled('main', {
  maxWidth: 572,
  margin: '$20 auto $4',
  padding: '0 $4'
})

export const Header = styled('div', {
  padding: '0 $6',
  [`> ${Heading}`]: {
    lineHeight: '$base'
  },
  [`> ${Text}`]: {
    color: '$gray200',
    marginBottom: '$4'
  },
})

export const AuthError = styled(Text, {
  color: '#f75a68',
  marginBottom: '$2'
})

export const ConnectBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  }
})

export const ConnectItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  border: '1px solid $gray600',
  padding: '$4 $6',
  borderRadius: '$md',
  marginBottom: '$2'

})