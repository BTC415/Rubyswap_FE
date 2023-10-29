import { ChainId } from '@twinkykms/rubyswap-sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb',
  [ChainId.TESTNET]: '0x301907b5835a2d723Fe3e9E8C5Bc5375d5c1236A',
  [ChainId.ETHERGEM]: '0xdD3E59A36Afc0d3E59Ed1900d5531791b2B3a094'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
