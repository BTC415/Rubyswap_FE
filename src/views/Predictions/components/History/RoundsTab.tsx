import React from 'react'
import { orderBy } from 'lodash'
import { Box, Heading, Text } from '@twinkykms/rubyswap-uikit'
import { useTranslation } from 'contexts/Localization'
import { Bet } from 'state/types'
import HistoricalBet from './HistoricalBet'

interface RoundsTabProps {
  hasBetHistory: boolean
  bets: Bet[]
}

const RoundsTab: React.FC<RoundsTabProps> = ({ hasBetHistory, bets }) => {
  const { t } = useTranslation()

  return hasBetHistory ? (
    <>
      {orderBy(bets, ['round.epoch'], ['desc']).map((bet) => (
        <HistoricalBet key={bet.id} bet={bet} />
      ))}
    </>
  ) : (
    <Box p="24px">
      <Heading size="lg" textAlign="center" mb="8px">
        {t('No prediction history available')}
      </Heading>
      <Text as="p" textAlign="center">
        {t(
          'If you are sure you should see history here, make sure you’re connected to the correct wallet and try again.',
        )}
      </Text>
    </Box>
  )
}

export default RoundsTab
