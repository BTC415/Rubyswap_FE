import React, { useState, useMemo, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Text, Flex, Button, Input, Heading, useModal, Modal,InjectedModalProps  } from '@twinkykms/rubyswap-uikit'
import Page from 'components/Layout/Page'
import PageHeader from 'components/PageHeader'
import Select, { OptionProps } from 'components/Select/Select'
import { useTranslation } from 'contexts/Localization'
import { useTfthContract } from 'hooks/useContract'
import { ethers } from 'ethers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useWeb3React } from '@web3-react/core'
import { tokens } from './tokenList.json'

const apikey = "076c60bf-47e5-4fba-8dd6-262eff0cedb7"
const StaticInput = styled(Text)`
  background-color: ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.inset};
  // color: #720022;
  display: block;
  font-size: 16px;
  height: 40px;
  outline: 0;
  padding: 8px 16px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
`

const Row = styled(Flex)`
  width: 100%;
  gap: 64px;
  flex-wrap: wrap;
`
const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 16px;
    margin-bottom: 6px;
  }
`
const InlineLabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 4px;
  > ${Text} {
    min-width: 100px;
    font-size: 14px;
    margin-bottom: 2px;
  }
  > div:last-child {
    width: 100%;
  }
`
const Rect = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 16px;
  padding: 16px;
  gap: 16px;
  display: flex;
  flex-direction: column;
`
const ActionWrapper = styled(Flex)`
  margin-top: 16px;
  gap: 12px;
  justify-content: center;
  > * {
    padding: 0px 48px;
  }
`
const TokenSymbol = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  &.inactive {
    color: grey;
    img {
      filter: opacity(0.5) grayscale(1);
    }
  }
`
const TokenLogo = styled.img`
  width: 20px;
  height: 20px;
`
const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBorder};
  height: 1px;
  margin: 18px auto;
  width: 100%;
`
const Form = styled(Flex)`
  min-width: 290px;
  flex-grow: 1;
  gap: 18px;
`
const VideoContent = styled.iframe`
  width: 100%;
  height: 300px;
  border-radius: 12px;
`
const PageFooter = styled.div`
  background: ${({theme}) => theme.colors.gradients.bubblegum};
  padding: 24px 16px;
  margin-top: 24px;
`

interface ModalProps extends InjectedModalProps {
  description: (string | undefined)
}

const BackButtonModal: React.FC<ModalProps> = ({description, onDismiss}) => {
  return(
    <Modal title="Input Error" onDismiss={onDismiss} maxWidth="420px">
      <Heading as="h1" color="primary" my="16px" mx="auto">
        {description}
      </Heading>
      {/* <Button onClick=>Ok</Button> */}
    </Modal>
  )
}

export default function TFTH() {
  const { t } = useTranslation();
  const tfthContract = useTfthContract()
  const { account } = useWeb3React()
  const [yourShare, setYourShare] = useState('')
  const [totalShare, setTotalShare] = useState('')
  const [sharePrice, setSharePrice] = useState('')
  const [purchasableShare, setPruchasableShare] = useState('')
  const [totalSupply, setTotalSupply] = useState('')
  const [share, setShare] = useState(0)
  const [price, setPrice] = useState('')
  const [coinmarket, setCoinmarket] = useState('')
  const [currentOption, setOption] = useState<OptionProps>(null)
  const [onInvalidNumber] = useModal(<BackButtonModal description="Invalid number to buy/sell" />);
  const [onSellError] = useModal(<BackButtonModal description="Cannot sell more shares than you have." />);
  const atomic = (value, decimals) => {
    let quantity = decimals;
    if (value.indexOf(".") !== -1) {
      quantity -= value.length - value.indexOf(".") - 1;
    }
    let atomicized = value.replace(".", "");
    for (let i = 0; i < quantity; i++) {
      atomicized += "0";
    }
    while (atomicized[0] === "0") {
      atomicized = atomicized.substr(1);
    }
    return atomicized;
  }

  const unatomic = (value, decimals) => {
    const  _value = value.padStart(decimals + 1, "0");
    let temp = `${_value.substr(0, _value.length - decimals)}.${_value.substr(_value.length - decimals)}`;
    while (temp[0] === "0") {
      temp = temp.substr(1);
    }
    while (temp.endsWith("0")) {
      temp = temp.slice(0, -1);
    }
    if (temp.endsWith(".")) {
      temp = temp.slice(0, -1);
    }
    if (temp.startsWith(".")) {
      temp = `0${temp}`;
    }
    if (temp === "") {
      return "0";
    }
    return temp;
  }
  const { library } = useActiveWeb3React();
  
  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const update = useCallback(async () => {
    if(currentOption)
      fetch(currentOption.value)
      .then((response) => response.json())
      .then((data) => {
        if(data.market_data)
        {
          setTotalSupply(`${numberWithCommas(data.market_data.total_supply)}`)
          setPrice(`$${data.market_data.current_price.usd}`)
          setCoinmarket(`$${numberWithCommas(data.market_data.market_cap.usd)}`)
        }
      })
      .catch((err) => console.log(err));
    if(account === undefined) return
    const _yourShares = await tfthContract.balanceOf(account)
    setYourShare(_yourShares.toString())
    const _totalShares = await tfthContract.getTotalShares()
    setTotalShare(_totalShares.toString())
    const _sharePrice = await tfthContract.getSharePrice()
    setSharePrice(unatomic(_sharePrice.toString(), 18))
    const pSharePrice = _sharePrice.mul(ethers.BigNumber.from(20)).div(ethers.BigNumber.from(19)).add(ethers.BigNumber.from(1))
    setPruchasableShare((await library.getBalance(account)).div(pSharePrice).toString())
  }, [account, currentOption, tfthContract]) 
  const withdraw = async () => {
    const sellShares = share;
    if ((sellShares === 0) || !!sellShares) {
      onInvalidNumber()
      // alert("Invalid number to sell.")
      return;
    }
    if (sellShares > parseInt(yourShare)) {
     onSellError()
      return;
    }
    const tx = await tfthContract.withdraw(sellShares, {from: account})
    await tx.wait()
    await update()
    setShare(0)
  }
  const deposit = async () => {
    const buyShares = share
    if ((buyShares === 0) || !!buyShares) {
      onInvalidNumber()
      return;
    }
    const sending = ethers.BigNumber.from(atomic(sharePrice, 18)).mul(ethers.BigNumber.from(buyShares)).mul(ethers.BigNumber.from(20)).div(ethers.BigNumber.from(19)).add(ethers.BigNumber.from(1))
    const tx = await tfthContract.deposit(buyShares - 1, { from: account, value: sending})
    await tx.wait()
    await update()
    setShare(0)
  }
  const [ timer, setTimer ] = useState(0);
  useEffect(() => {
    const startUpdating = async () => {
      await update()
    }
    startUpdating()
    window.setTimeout(() => {
      setTimer((prev) => prev + 1)
      startUpdating()
    }, 5000)
  }, [timer, update])
  const handleTokenChange = (option: OptionProps): void => {
    if(option.value.includes('noasset')) setOption(null)
    setOption(option);
  }
  useEffect(() => {
    if(tokens.length) {
      const option: OptionProps = {
        label: "",
        value: tokens[0].asset
      }
      setOption(option)
    }
  }, [])
  const options = useMemo(() => {
    return tokens.map(token => {
      return {
        label: <TokenSymbol className={token.asset === "" ? "inactive" : null}><TokenLogo src={token.logoURI} alt="logo" />{token.symbol}</TokenSymbol>,
        value: token.asset ? token.asset : `noasset${token.symbol}`
      }
    })
  }, [])
  return (
    <>
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
              {t('2 Fast 2 Hodl')}
            </Heading>
            {/* <Heading scale="md" color="text">
              {t('Learn how to use Rubyswap')}
            </Heading> */}
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        <Row>
          <Form flexDirection="column" >
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Your Shares')}</Text>
              <StaticInput>{yourShare}</StaticInput>
            </LabelWrapper>
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Total Shares')}</Text>
              <StaticInput>{totalShare}</StaticInput>
            </LabelWrapper>
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Share Price')}</Text>
              <StaticInput>{sharePrice.substr(0, 5)}</StaticInput>
            </LabelWrapper>
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Purchasable Shares')}</Text>
              <StaticInput mb={4}>{purchasableShare}</StaticInput>
            </LabelWrapper>
            <Divider />
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Shares')}</Text>
              <Input type="number" value={share} onChange={(e) => setShare(e.target.valueAsNumber)} />
            </LabelWrapper>
            <ActionWrapper>
              <Button onClick={deposit} variant="success">Buy</Button>
              <Button onClick={withdraw} variant="success" >Sell</Button>
            </ActionWrapper>
          </Form>
          <Form flexDirection="column">
            <Rect>
              <InlineLabelWrapper>
                <Text textTransform="uppercase">{t('Token')}</Text>
                <Select
                  options={options}
                  onChange={handleTokenChange}
                />
              </InlineLabelWrapper>
              <InlineLabelWrapper>
                <Text textTransform="uppercase">{t('Total Supply')}</Text>
                <StaticInput>{totalSupply}</StaticInput>
              </InlineLabelWrapper>
              <InlineLabelWrapper>
                <Text textTransform="uppercase">{t('Price')}</Text>
                <StaticInput>{price}</StaticInput>
              </InlineLabelWrapper>
              <InlineLabelWrapper>
                <Text textTransform="uppercase">{t('MarketCap')}</Text>
                <StaticInput>{coinmarket}</StaticInput>
              </InlineLabelWrapper>
            </Rect>
            <LabelWrapper>
              <Text textTransform="uppercase">{t('Tutorial Video')}</Text>
              {/* <VideoContent
                src="https://www.youtube.com/embed/8JOHkP3XntA"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="How to STAKE RUBY"
              /> */}
            </LabelWrapper>
              <Heading as="h1" scale="xl" color="secondary" mb="24px">
                {t('Comming Soon')}
              </Heading>
          </Form>
        </Row>
        <PageFooter>
          <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
            <Heading scale="md" mt={1} color="text">
              {t('This is experimental code. Use it at your own risk')}
            </Heading>
            <InlineLabelWrapper >
              <a
                href="https://discord.egem.io"
              >
                <img src="./images/discord.svg" alt="discord" />
              </a>
              <a
                href="https://github.com/rubyswap"
              >
                <img src="./images/github.svg" alt="github" />
              </a>
            </InlineLabelWrapper>
          </Flex>
        </PageFooter>
      </Page>
      
    </>
  )
}

