import React, { useState } from 'react'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { Button, Input, Modal, Text } from '@twinkykms/rubyswap-uikit'
import { getAddressByType } from 'utils/collectibles'
import { Nft } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useERC721 } from 'hooks/useContract'
import InfoRow from './InfoRow'

interface TransferNftModalProps {
  nft: Nft
  tokenIds: number[]
  onSuccess: () => any
  onDismiss?: () => void
}

const Value = styled(Text)`
  font-weight: 600;
`

const ModalContent = styled.div`
  margin-bottom: 16px;
`

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  display: block;
  margin-bottom: 8px;
  margin-top: 24px;
`

const TransferNftModal: React.FC<TransferNftModalProps> = ({ nft, tokenIds, onSuccess, onDismiss }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const contract = useERC721(getAddressByType(nft.type))
  const { toastSuccess } = useToast()

  const handleConfirm = async () => {
    try {
      const isValidAddress = ethers.utils.isAddress(value)

      if (!isValidAddress) {
        setError(t('Please enter a valid wallet address'))
      } else {
        const tx = await contract.transferFrom(account, value, tokenIds[0])
        setIsLoading(true)
        const receipt = await tx.wait()
        if (receipt.status) {
          onDismiss()
          onSuccess()
          toastSuccess(t('NFT successfully transferred!'))
        } else {
          setError(t('Unable to transfer NFT'))
          setIsLoading(false)
        }
      }
    } catch (err) {
      console.error('Unable to transfer NFT:', err)
    }
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setValue(inputValue)
  }

  return (
    <Modal title={t('Transfer NFT')} onDismiss={onDismiss}>
      <ModalContent>
        {error && (
          <Text color="failure" mb="8px">
            {error}
          </Text>
        )}
        <InfoRow>
          <Text>{t('Transferring')}:</Text>
          <Value>{t('1x %nftName% NFT', { nftName: nft.name })}</Value>
        </InfoRow>
        <Label htmlFor="transferAddress">{t('Receiving address')}:</Label>
        <Input
          id="transferAddress"
          name="address"
          type="text"
          placeholder={t('Paste address')}
          value={value}
          onChange={handleChange}
          isWarning={error}
          disabled={isLoading}
        />
      </ModalContent>
      <Actions>
        <Button width="100%" variant="secondary" onClick={onDismiss}>
          {t('Cancel')}
        </Button>
        <Button width="100%" onClick={handleConfirm} disabled={!account || isLoading || !value}>
          {t('Confirm')}
        </Button>
      </Actions>
    </Modal>
  )
}

export default TransferNftModal
