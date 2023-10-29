import { Currency, ETHER, Token } from '@twinkykms/rubyswap-sdk'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'EGEM'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
