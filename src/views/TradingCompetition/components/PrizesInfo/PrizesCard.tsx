import React from 'react'
import styled from 'styled-components'
import { Card, CardHeader, Box, Heading, Text } from '@twinkykms/rubyswap-uikit'
import { useTranslation } from 'contexts/Localization'
import PrizesGrid from './PrizesGrid'

const StyledCard = styled(Card)`
  ${({ theme }) => theme.mediaQueries.md} {
    margin-right: 40px;
    flex: 1;
  }
`

const PrizesCard = () => {
  const { t } = useTranslation()

  return (
    <StyledCard>
      <CardHeader>
        <Heading scale="lg" color="secondary">
          {t('Prizes by Team')}
        </Heading>
        <Text color="textSubtle" fontSize="14px">
          {t('Higher trading volume = higher rank!')}
        </Text>
      </CardHeader>
      <PrizesGrid />
      <Box p="24px">
        <Text color="textSubtle" fontSize="14px">
          {t(
            'Prizes to be distributed in RUBY and shared by all members of a tier. RUBY price in USD to be determined on the day of distribution. Details below.',
          )}
        </Text>
      </Box>
    </StyledCard>
  )
}

export default PrizesCard
