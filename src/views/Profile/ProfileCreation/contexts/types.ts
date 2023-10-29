import BigNumber from 'bignumber.js'

export type Actions =
  | { type: 'next_step' }
  | { type: 'set_team'; teamId: number }
  | { type: 'set_selected_nft'; nftAddress: string; tokenId: number }
  | { type: 'set_username'; userName: string | null }
  | { type: 'initialize'; step: number }

export interface State {
  isInitialized: boolean
  currentStep: number
  teamId: number
  selectedNft: {
    tokenId: number
    nftAddress: string
  }
  userName: string
  minimumCakeRequired: BigNumber
  allowance: BigNumber
}

export interface ContextType extends State {
  actions: {
    nextStep: () => void
    setTeamId: (teamId: number) => void
    setSelectedNft: (tokenId: number, nftAddress: string) => void
    setUserName: (userName: string) => void
  }
}
