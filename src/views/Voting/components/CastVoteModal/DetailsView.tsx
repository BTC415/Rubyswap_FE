import React from 'react'
import { Text, Flex } from '@twinkykms/rubyswap-uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { VotingBox, ModalInner } from './styles'

interface DetailsViewProps {
  total: BigNumber
  cakeBalance: BigNumber
  cakeVaultBalance: BigNumber
  cakePoolBalance: BigNumber
  poolsBalance: BigNumber
  cakeBnbLpBalance: BigNumber
}

const DetailsView: React.FC<DetailsViewProps> = ({
  total,
  cakeBalance,
  cakeVaultBalance,
  cakePoolBalance,
  poolsBalance,
  cakeBnbLpBalance,
}) => {
  const { t } = useTranslation()

  return (
    <ModalInner mb="0">
      <Text as="p" mb="24px" fontSize="14px" color="textSubtle">
        {t(
          'Your voting power is determined by the amount of RUBY you held at the block detailed below. RUBY held in other places does not contribute to your voting power.',
        )}
      </Text>
      <Text color="secondary" textTransform="uppercase" mb="4px" bold fontSize="14px">
        {t('Overview')}
      </Text>
      <VotingBox>
        <Text color="secondary">{t('Your Voting Power')}</Text>
        <Text bold fontSize="20px">
          {total.toFormat(3)}
        </Text>
      </VotingBox>
      <Text color="secondary" textTransform="uppercase" mb="4px" bold fontSize="14px">
        {t('Your Ruby Held Now')}
      </Text>
      <Flex alignItems="center" justifyContent="space-between" mb="4px">
        <Text color="textSubtle" fontSize="16px">
          {t('Wallet')}
        </Text>
        <Text textAlign="right">{cakeBalance.toFormat(3)}</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="4px">
        <Text color="textSubtle" fontSize="16px">
          {t('Manual Ruby Pool')}
        </Text>
        <Text textAlign="right">{cakePoolBalance.toFormat(3)}</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="4px">
        <Text color="textSubtle" fontSize="16px">
          {t('Auto Ruby Pool')}
        </Text>
        <Text textAlign="right">{cakeVaultBalance.toFormat(3)}</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="4px">
        <Text color="textSubtle" fontSize="16px">
          {t('Other Gem Pools')}
        </Text>
        <Text textAlign="right">{poolsBalance.toFormat(3)}</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="4px">
        <Text color="textSubtle" fontSize="16px">
          {t('RUBY EGEM LP')}
        </Text>
        <Text textAlign="right">{cakeBnbLpBalance.toFormat(3)}</Text>
      </Flex>
    </ModalInner>
  )
}

export default DetailsView
