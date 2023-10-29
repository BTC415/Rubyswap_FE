import React from 'react'
import { Card, CardBody, Flex } from '@twinkykms/rubyswap-uikit'
import styled from 'styled-components'
import HarvestCard from './HarvestCard'
import UserDetail from './UserDetail'

const StyledCard = styled(Card)`
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom: 1px ${({ theme }) => theme.colors.secondary} solid;
  border-left: 1px ${({ theme }) => theme.colors.secondary} solid;
  border-right: 1px ${({ theme }) => theme.colors.secondary} solid;
  background: ${({ theme }) =>
    theme.isDark
      ? 'linear-gradient(360deg, rgba(49, 61, 92, 0.9) 0%, rgba(61, 42, 84, 0.9) 100%)'
      : 'linear-gradient(180deg, rgba(202, 194, 236, 0.9) 0%,  rgba(204, 220, 239, 0.9) 51.04%, rgba(206, 236, 243, 0.9) 100%)'};
`

const UserBanner = () => {
  return (
    <StyledCard>
      <CardBody p={['16px', null, null, '24px']}>
        <Flex alignItems="center" justifyContent="center" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" mr={[null, null, null, '64px']}>
            <UserDetail />
          </Flex>
          <Flex flex="1" width={['100%', null, 'auto']}>
            <HarvestCard />
          </Flex>
        </Flex>
      </CardBody>
    </StyledCard>
  )
}

export default UserBanner
