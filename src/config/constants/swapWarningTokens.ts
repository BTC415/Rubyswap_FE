import tokens from 'config/constants/tokens'
import { Address } from './types'

// const { bondly, safemoon } = tokens

interface WarningToken {
  symbol: string
  address: Address
}

interface WarningTokenList {
  [key: string]: WarningToken
}

const SwapWarningTokens = <WarningTokenList>{
}

export default SwapWarningTokens
