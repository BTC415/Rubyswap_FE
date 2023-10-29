import { ChainId, Token } from '@twinkykms/rubyswap-sdk'

export const RUBY: { [chainId: number]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    18,
    'RUBY',
    'PancakeSwap Token',
  ),
  [ChainId.ETHERGEM]: new Token(
    ChainId.ETHERGEM,
    '0xB6094af67bf43779ab704455c5DF02AD9141871B',
    18,
    'RUBY',
    'RubySwap Token',
  ),
}
export const BUSD: { [chainId: number]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    18,
    'BUSD',
    'Binance USD',
  ),
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET,
    '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
    18,
    'BUSD',
    'Binance USD',
  ),
}

export const WBNB = new Token(ChainId.ETHERGEM, '0xE5fca20e55811D461800A853f444FBC6f5B72BEa', 18, 'WEGEM', 'Wrapped ETHERGEM')
export const DAI = new Token(ChainId.MAINNET, '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', 18, 'DAI', 'Dai Stablecoin')
export const USDT = new Token(ChainId.MAINNET, '0x55d398326f99059fF775485246999027B3197955', 18, 'USDT', 'Tether USD')
export const BTCB = new Token(ChainId.MAINNET, '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', 18, 'BTCB', 'Binance BTC')
export const UST = new Token(
  ChainId.MAINNET,
  '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
  18,
  'UST',
  'Wrapped UST Token',
)
export const ETH = new Token(
  ChainId.MAINNET,
  '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  18,
  'ETH',
  'Binance-Peg Ethereum Token',
)
export const USDC = new Token(
  ChainId.MAINNET,
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  18,
  'USDC',
  'Binance-Peg USD Coin',
)

const tokens = {
  egem: {
    symbol: 'EGEM',
    projectLink: 'https://www.binance.com/',
  },
  wegem: {
    symbol: "WEGEM",
    address: {
      1987: "0xE5fca20e55811D461800A853f444FBC6f5B72BEa"
    },
    decimals: 18
  },
  ruby: {
    symbol: 'RUBY',
    address: {
      1987: '0xB6094af67bf43779ab704455c5DF02AD9141871B'
    },
    decimals: 18,
    projectLink: 'https://rubyswap.finance/',
  },
  gem: {
    symbol: "GEM",
    address: {
      1987: "0xaf017fe9C9770BdbDA1A014D5D6c87B364225Cd0"
    },
    decimals: 18
  },
  tusd: {
    symbol: "TUSD",
    address: {
      1987: "0x33F4999ee298CAa16265E87f00e7A8671c01D870"
    },
    decimals: 18
  },
  tosa: {
    symbol: "TOSA",
    address: {
      1987: "0x16D2A05Acc35c17B470fe6216D49145Cf85b00E8",
    },
    decimals: 18
  }
}

export default tokens
