import React, { useEffect } from 'react'
import styled from 'styled-components'
import { ModalBody, ModalContainer, Message, ModalHeader, Box, Heading } from '@twinkykms/rubyswap-uikit'
import useTheme from 'hooks/useTheme'
import { getAddress } from 'utils/addressHelpers'
import { useTranslation } from 'contexts/Localization'
import { WrappedTokenInfo } from 'state/lists/hooks'
import SwapWarningTokensConfig from 'config/constants/swapWarningTokens'
import SafemoonWarning from './SafemoonWarning'
import BondlyWarning from './BondlyWarning'
import Acknowledgement from './Acknowledgement'

const StyledModalContainer = styled(ModalContainer)`
  max-width: 440px;
`

const MessageContainer = styled(Message)`
  align-items: flex-start;
  justify-content: flex-start;
`

interface SwapWarningModalProps {
  swapCurrency: WrappedTokenInfo
  onDismiss?: () => void
}

// Modal is fired by a useEffect and doesn't respond to closeOnOverlayClick prop being set to false
const usePreventModalOverlayClick = () => {
  useEffect(() => {
    const preventClickHandler = (e) => {
      e.stopPropagation()
      e.preventDefault()
      return false
    }

    document.querySelectorAll('[role="presentation"]').forEach((el) => {
      el.addEventListener('click', preventClickHandler, true)
    })

    return () => {
      document.querySelectorAll('[role="presentation"]').forEach((el) => {
        el.removeEventListener('click', preventClickHandler, true)
      })
    }
  }, [])
}

const SwapWarningModal: React.FC<SwapWarningModalProps> = ({ swapCurrency, onDismiss }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  usePreventModalOverlayClick()

  const TOKEN_WARNINGS = {
    [getAddress(SwapWarningTokensConfig.safemoon.address)]: {
      symbol: SwapWarningTokensConfig.safemoon.symbol,
      component: <SafemoonWarning />,
    },
    [getAddress(SwapWarningTokensConfig.bondly.address)]: {
      symbol: SwapWarningTokensConfig.bondly.symbol,
      component: <BondlyWarning />,
    },
  }

  const SWAP_WARNING = TOKEN_WARNINGS[swapCurrency.address]

  return (
    <StyledModalContainer minWidth="280px">
      <ModalHeader background={theme.colors.gradients.cardHeader}>
        <Heading p="12px 24px">{t('Notice for trading %symbol%', { symbol: SWAP_WARNING.symbol })}</Heading>
      </ModalHeader>
      <ModalBody p="24px">
        <MessageContainer variant="warning" mb="24px">
          <Box>{SWAP_WARNING.component}</Box>
        </MessageContainer>
        <Acknowledgement handleContinueClick={onDismiss} />
      </ModalBody>
    </StyledModalContainer>
  )
}

export default SwapWarningModal
