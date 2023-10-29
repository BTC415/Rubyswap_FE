import React, { useEffect, useState } from 'react'
import { Flex, Spinner, Text } from '@twinkykms/rubyswap-uikit'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from 'contexts/Localization'
import { fetchHistory } from 'state/predictions'
import { getUnclaimedWinningBets } from 'state/predictions/helpers'
import { HistoryFilter } from 'state/types'
import { useAppDispatch } from 'state'
import {
  useGetCurrentEpoch,
  useGetHistoryByAccount,
  useGetHistoryFilter,
  useGetIsFetchingHistory,
  useIsHistoryPaneOpen,
} from 'state/hooks'
import { Header, HistoryTabs } from './components/History'
import RoundsTab from './components/History/RoundsTab'
import PnlTab from './components/History/PnlTab/PnlTab'

const StyledHistory = styled.div`
  background-color: ${({ theme }) => theme.card.background};
  display: flex;
  flex-direction: column;
  height: 100%;
`

const BetWrapper = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
  position: relative;
`

const SpinnerWrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.card.background};
  display: flex;
  left: 0;
  height: 100%;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
`

const History = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const isHistoryPaneOpen = useIsHistoryPaneOpen()
  const isFetchingHistory = useGetIsFetchingHistory()
  const historyFilter = useGetHistoryFilter()
  const currentEpoch = useGetCurrentEpoch()
  const { t } = useTranslation()
  const bets = useGetHistoryByAccount(account)
  const [activeTab, setActiveTab] = useState(HistoryTabs.ROUNDS)

  useEffect(() => {
    if (account && isHistoryPaneOpen) {
      dispatch(fetchHistory({ account }))
    }
  }, [account, currentEpoch, isHistoryPaneOpen, dispatch])

  // Currently the api cannot filter by unclaimed AND won so we do it here
  // when the user has selected Uncollected only include positions they won
  const results = historyFilter === HistoryFilter.UNCOLLECTED ? getUnclaimedWinningBets(bets) : bets

  const hasBetHistory = results && results.length > 0

  let activeTabComponent = null

  switch (activeTab) {
    case HistoryTabs.PNL:
      activeTabComponent = <PnlTab hasBetHistory={hasBetHistory} bets={results} />
      break
    case HistoryTabs.ROUNDS:
    default:
      activeTabComponent = <RoundsTab hasBetHistory={hasBetHistory} bets={results} />
      break
  }

  if (!account) {
    activeTabComponent = (
      <Flex justifyContent="center" alignItems="center" flexDirection="column" mt="32px">
        <ConnectWalletButton />
        <Text mt="8px">{t('Connect your wallet to view your prediction history')}</Text>
      </Flex>
    )
  }

  return (
    <StyledHistory>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <BetWrapper>
        {isFetchingHistory ? (
          <SpinnerWrapper>
            <Spinner size={72} />
          </SpinnerWrapper>
        ) : (
          activeTabComponent
        )}
      </BetWrapper>
    </StyledHistory>
  )
}

export default History
