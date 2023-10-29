import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { AutoRenewIcon, Button, Card, CardBody, Flex, Skeleton, Text, Link, ArrowForwardIcon } from '@twinkykms/rubyswap-uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { usePriceCakeBusd } from 'state/farms/hooks'
import useToast from 'hooks/useToast'
import { useMasterchef } from 'hooks/useContract'
import { harvestFarm } from 'utils/calls'
import Balance from 'components/Balance'
import useFarmsWithBalance from 'views/Home/hooks/useFarmsWithBalance'

const StyledCard = styled(Card)`
  width: 100%;
  height: fit-content;
`

const HarvestCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const { farmsWithStakedBalance, earningsSum } = useFarmsWithBalance()
  const masterChefContract = useMasterchef()
  const cakePriceBusd = usePriceCakeBusd()
  const earningsBusd = new BigNumber(earningsSum).multipliedBy(cakePriceBusd)
  const numFarmsToCollect = farmsWithStakedBalance.length

  const earningsText = t('%earningsBusd% to collect from %count% %farms%', {
    earningsBusd: earningsBusd.toString(),
    count: numFarmsToCollect > 0 ? numFarmsToCollect : '',
    farms: numFarmsToCollect === 0 || numFarmsToCollect > 1 ? 'farms' : 'farm',
  })
  const [preText, toCollectText] = earningsText.split(earningsBusd.toString())

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    // eslint-disable-next-line no-restricted-syntax
    for (const farmWithBalance of farmsWithStakedBalance) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await harvestFarm(masterChefContract, farmWithBalance.pid)
        toastSuccess(
          `${t('Harvested')}!`,
          t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'RUBY' }),
        )
      } catch (error) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      }
    }
    setPendingTx(false)
  }, [farmsWithStakedBalance, masterChefContract, toastSuccess, toastError, t])

  return (
    <StyledCard>
      <CardBody>
        <Flex flexDirection={['column', null, null, 'row']} justifyContent="space-between" alignItems="center">
          <Flex flexDirection="column" alignItems={['center', null, null, 'flex-start']}>
            {preText && (
              <Text mb="4px" color="textSubtle">
                {preText}
              </Text>
            )}
            {earningsBusd && !earningsBusd.isNaN() ? (
              <Balance
                decimals={earningsBusd.gt(0) ? 2 : 0}
                fontSize="24px"
                bold
                prefix={earningsBusd.gt(0) ? '~$' : '$'}
                lineHeight="1.1"
                value={earningsBusd.toNumber()}
              />
            ) : (
              <Skeleton width={96} height={24} my="2px" />
            )}
            <Text mb={['16px', null, null, '0']} color="textSubtle">
              {toCollectText}
            </Text>
          </Flex>
          {numFarmsToCollect <= 0 ? (
            <Link href="farms">
              <Button width={['100%', null, null, 'auto']} variant="secondary">
                <Text color="primary" bold>
                  {t('Farms')}
                </Text>
                <ArrowForwardIcon ml="4px" color="primary" />
              </Button>
            </Link>
          ) : (
            <Button
              width={['100%', null, null, 'auto']}
              id="harvest-all"
              isLoading={pendingTx}
              endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
              disabled={pendingTx}
              onClick={harvestAllFarms}
            >
              <Text color="invertedContrast" bold>
                {pendingTx ? t('Harvesting') : t('Harvest all')}
              </Text>
            </Button>
          )}
        </Flex>
      </CardBody>
    </StyledCard>
  )
}

export default HarvestCard
