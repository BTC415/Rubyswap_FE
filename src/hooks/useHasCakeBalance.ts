import BigNumber from 'bignumber.js'
import { getCakeAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's RUBY balance is at least the amount passed in
 */
const useHasCakeBalance = (minimumBalance: BigNumber) => {
  const { balance: cakeBalance } = useTokenBalance(getCakeAddress())
  return cakeBalance.gte(minimumBalance)
}

export default useHasCakeBalance
