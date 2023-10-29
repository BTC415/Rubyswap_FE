import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.ruby,
    earningToken: tokens.ruby,
    contractAddress: {
      // 56: '0x73feaa1eE314F8c655E354234017bE2193C9E24E', // MasterChef Address
      1987: '0x24032900bBa1Ef1CB822Df299548Efb222E05614'   // MasterJeweler
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 1,
    stakingToken: tokens.wegem,
    earningToken: tokens.ruby,
    contractAddress: {
      // 1987: '0x08Fa50Da008B49AA1CA7A9A8b509F606111bA597'
      1987: "0x9BbDAE6b7b5ffc55B9Fc994622faebC3019ED30A"
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.5',
    sortOrder: 999,
    isFinished: false,
  },
  
]

export default pools
