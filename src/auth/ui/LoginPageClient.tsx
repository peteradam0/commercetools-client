'use client'

import Spacings from '@commercetools-uikit/spacings'
import React from 'react'
import styled from 'styled-components'

import LoginForm from './LoginForm'

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f8f9fa;
`

const LoginPageClient: React.FC = () => {
  return (
    <PageContainer>
      <Spacings.Stack scale='xl'>
        <LoginForm />
      </Spacings.Stack>
    </PageContainer>
  )
}

export default LoginPageClient
