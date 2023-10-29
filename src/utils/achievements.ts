import { ethers } from 'ethers'
import { Campaign } from 'config/constants/types'
import ifosList from 'config/constants/ifo'
import { campaignMap } from 'config/constants/campaigns'
import { Achievement, TranslatableText } from 'state/types'
import { multicallv2 } from 'utils/multicall'
import { getPointCenterIfoAddress } from 'utils/addressHelpers'
import pointCenterIfoABI from 'config/abi/pointCenterIfo.json'

interface IfoMapResponse {
  thresholdToClaim: string
  campaignId: string
  numberPoints: ethers.BigNumber
}

export const getAchievementTitle = (campaign: Campaign): TranslatableText => {
  switch (campaign.type) {
    case 'ifo':
      return {
        key: 'IFO Shopper: %title%',
        data: {
          title: campaign.title as string,
        },
      }
    default:
      return campaign.title
  }
}

export const getAchievementDescription = (campaign: Campaign): TranslatableText => {
  switch (campaign.type) {
    case 'ifo':
      return {
        key: 'Committed more than $5 worth of LP in the %title% IFO',
        data: {
          title: campaign.title as string,
        },
      }
    default:
      return campaign.description
  }
}

/**
 * Checks if a wallet is eligible to claim points from valid IFO's
 */
export const getClaimableIfoData = async (account: string): Promise<Achievement[]> => {
  const ifoCampaigns = ifosList.filter((ifoItem) => ifoItem.campaignId !== undefined)

  // Returns the claim status of every IFO with a campaign ID
  const claimStatusCalls = ifoCampaigns.map(({ address }) => {
    return {
      address: getPointCenterIfoAddress(),
      name: 'checkClaimStatus',
      params: [account, address],
    }
  })

  const claimStatuses = (await multicallv2(pointCenterIfoABI, claimStatusCalls, { requireSuccess: false })) as
    | [boolean][]
    | null

  // Get IFO data for all IFO's that are eligible to claim
  const claimableIfoData = (await multicallv2(
    pointCenterIfoABI,
    claimStatuses.reduce((accum, claimStatusArr, index) => {
      if (claimStatusArr === null) {
        return accum
      }

      const [claimStatus] = claimStatusArr

      if (claimStatus === true) {
        return [...accum, { address: getPointCenterIfoAddress(), name: 'ifos', params: [index] }]
      }

      return accum
    }, []),
  )) as IfoMapResponse[]

  // Transform response to an Achievement
  return claimableIfoData.reduce((accum, claimableIfoDataItem) => {
    if (!campaignMap.has(claimableIfoDataItem.campaignId)) {
      return accum
    }

    const campaignMeta = campaignMap.get(claimableIfoDataItem.campaignId)
    const { address } = ifoCampaigns.find((ifoCampaign) => ifoCampaign.campaignId === claimableIfoDataItem.campaignId)

    return [
      ...accum,
      {
        address,
        id: claimableIfoDataItem.campaignId,
        type: 'ifo',
        title: getAchievementTitle(campaignMeta),
        description: getAchievementDescription(campaignMeta),
        badge: campaignMeta.badge,
        points: claimableIfoDataItem.numberPoints.toNumber(),
      },
    ]
  }, [])
}
