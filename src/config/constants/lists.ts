const PANRUBY_EXTENDED = 'https://tokens.rubyswap.finance/pancakeswap-extended.json'
const PANRUBY_TOP100 = 'https://tokens.rubyswap.finance/pancakeswap-top-100.json'

export const UNSUPPORTED_LIST_URLS: string[] = []

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  // PANRUBY_TOP100,
  // PANRUBY_EXTENDED,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = []
