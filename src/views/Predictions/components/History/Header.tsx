import React from 'react'
import { useWeb3React } from '@web3-react/core'
import {
  ArrowForwardIcon,
  Box,
  Button,
  Radio,
  Flex,
  Heading,
  Text,
  ButtonMenu,
  ButtonMenuItem,
} from '@twinkykms/rubyswap-uikit'
import { useAppDispatch } from 'state'
import { HistoryFilter } from 'state/types'
import { setHistoryFilter, setHistoryPaneState, fetchHistory } from 'state/predictions'
import { useGetHistoryFilter, useGetIsFetchingHistory } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'

const Filter = styled.label`
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  margin-right: 16px;
`

const StyledHeader = styled(Box)`
  background: ${({ theme }) => theme.colors.gradients.bubblegum};
  flex: none;
  padding: 16px;
`

const ButtonMenuContainer = styled.div`
  width: 100%;
  & > div {
    width: 100%;
  }

  & button {
    width: 100%;
  }
`

const getClaimParam = (historyFilter: HistoryFilter) => {
  switch (historyFilter) {
    case HistoryFilter.COLLECTED:
      return true
    case HistoryFilter.UNCOLLECTED:
      return false
    case HistoryFilter.ALL:
    default:
      return undefined
  }
}

interface HeaderProps {
  activeTab: HistoryTabs
  setActiveTab: (value: HistoryTabs) => void
}

export enum HistoryTabs {
  ROUNDS,
  PNL,
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const historyFilter = useGetHistoryFilter()
  const isFetchingHistory = useGetIsFetchingHistory()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleClick = () => {
    dispatch(setHistoryPaneState(false))
  }

  const handleChange = (newFilter: HistoryFilter) => async () => {
    if (newFilter !== historyFilter) {
      await dispatch(fetchHistory({ account, claimed: getClaimParam(newFilter) }))
      dispatch(setHistoryFilter(newFilter))
    }
  }

  const switchTab = async (tabIndex: number) => {
    setActiveTab(tabIndex)
    await handleChange(HistoryFilter.ALL)()
  }

  return (
    <StyledHeader>
      <Flex alignItems="center" justifyContent="space-between" mb="16px">
        <Heading as="h3" size="md">
          {t('History')}
        </Heading>
        <Button onClick={handleClick} variant="text" endIcon={<ArrowForwardIcon color="primary" />} px="0">
          {t('Close')}
        </Button>
      </Flex>
      <ButtonMenuContainer>
        <ButtonMenu activeIndex={activeTab} scale="sm" variant="subtle" onItemClick={switchTab}>
          <ButtonMenuItem>{t('Rounds')}</ButtonMenuItem>
          <ButtonMenuItem>{t('PNL')}</ButtonMenuItem>
        </ButtonMenu>
      </ButtonMenuContainer>
      {activeTab === HistoryTabs.ROUNDS && (
        <>
          <Text color="textSubtle" fontSize="12px" mb="8px">
            {t('Filter')}
          </Text>
          <Flex alignItems="center">
            <Filter>
              <Radio
                scale="sm"
                checked={historyFilter === HistoryFilter.ALL}
                disabled={isFetchingHistory || !account}
                onChange={handleChange(HistoryFilter.ALL)}
              />
              <Text ml="4px">{t('All')}</Text>
            </Filter>
            <Filter>
              <Radio
                scale="sm"
                checked={historyFilter === HistoryFilter.COLLECTED}
                disabled={isFetchingHistory || !account}
                onChange={handleChange(HistoryFilter.COLLECTED)}
              />
              <Text ml="4px">{t('Collected')}</Text>
            </Filter>
            <Filter>
              <Radio
                scale="sm"
                checked={historyFilter === HistoryFilter.UNCOLLECTED}
                disabled={isFetchingHistory || !account}
                onChange={handleChange(HistoryFilter.UNCOLLECTED)}
              />
              <Text ml="4px">{t('Uncollected')}</Text>
            </Filter>
          </Flex>
        </>
      )}
    </StyledHeader>
  )
}

export default Header
