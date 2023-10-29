import React from 'react'

import { Token } from '@twinkykms/rubyswap-sdk'
import { Modal, InjectedModalProps } from '@twinkykms/rubyswap-uikit'
import ImportToken from 'components/SearchModal/ImportToken'

interface Props extends InjectedModalProps {
  tokens: Token[]
  onCancel: () => void
}

const ImportTokenWarningModal: React.FC<Props> = ({ tokens, onDismiss, onCancel }) => {
  return (
    <Modal
      title="Import Token"
      onDismiss={() => {
        if (onDismiss) {
          onDismiss()
        }
        onCancel()
      }}
      style={{ maxWidth: '420px' }}
    >
      <ImportToken tokens={tokens} handleCurrencySelect={onDismiss} />
    </Modal>
  )
}

export default ImportTokenWarningModal
