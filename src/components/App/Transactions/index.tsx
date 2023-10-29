import React from 'react'
import { HistoryIcon, Button, useModal } from '@twinkykms/rubyswap-uikit'
import TransactionsModal from './TransactionsModal'

const Transactions = () => {
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)
  return (
    <>
      <Button variant="text" p={0} onClick={onPresentTransactionsModal} ml="16px">
        <HistoryIcon color="primary" width="24px" />
      </Button>
    </>
  )
}

export default Transactions
