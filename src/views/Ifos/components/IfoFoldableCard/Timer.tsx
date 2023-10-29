import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { getBscScanLink } from 'utils'
import { Flex, Link, PocketWatchIcon, Text, Skeleton } from '@twinkykms/rubyswap-uikit'
import getTimePeriods from 'utils/getTimePeriods'
import { PublicIfoData } from 'views/Ifos/types'

interface Props {
  publicIfoData: PublicIfoData
}

const Timer: React.FC<Props> = ({ publicIfoData }) => {
  const { t } = useTranslation()
  const { status, secondsUntilStart, secondsUntilEnd, startBlockNum } = publicIfoData
  const countdownToUse = status === 'coming_soon' ? secondsUntilStart : secondsUntilEnd
  const timeUntil = getTimePeriods(countdownToUse)
  const suffix = status === 'coming_soon' ? t('Start').toLowerCase() : t('Finish').toLowerCase()
  return (
    <Flex justifyContent="center" mb="32px">
      {status === 'idle' ? (
        <Skeleton animation="pulse" variant="rect" width="100%" height="48px" />
      ) : (
        <>
          <PocketWatchIcon width="48px" mr="16px" />
          <Flex alignItems="center">
            <Text bold mr="16px">
              {suffix}:
            </Text>
            <Text>
              {t('%day%d %hour%h %minute%m', {
                day: timeUntil.days,
                hour: timeUntil.hours,
                minute: timeUntil.minutes,
              })}
            </Text>
            <Link
              href={getBscScanLink(startBlockNum, 'countdown')}
              target="blank"
              rel="noopener noreferrer"
              ml="8px"
              textTransform="lowercase"
            >
              {`(${t('Blocks')})`}
            </Link>
          </Flex>
        </>
      )}
    </Flex>
  )
}

export default Timer
