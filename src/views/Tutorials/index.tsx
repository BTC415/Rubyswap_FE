import React from 'react'
import styled from 'styled-components'
import { Flex, Heading } from '@twinkykms/rubyswap-uikit'
import Page from 'components/Layout/Page'
import PageHeader from 'components/PageHeader'
import { useTranslation } from 'contexts/Localization'

const EmbedVideo = styled.div`
  width: 520px;
  height: 420px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const VideoWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 42px;
  justify-content: center;
`

const VideoTitle = styled.div`
  color: #ec1654;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.1;
`
const VideoContent = styled.iframe`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`
export default function Tutorials() {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
              {t('Tutorials')}
            </Heading>
            <Heading scale="md" color="text">
              {t('Learn how to use Rubyswap')}
            </Heading>
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        <VideoWrapper>
          <EmbedVideo>
            <VideoTitle>How to SWAP RUBY</VideoTitle>
            <VideoContent
              src="https://www.youtube.com/embed/Fiy7YDaXUz4"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="How to SWAP RUBY"
            />
          </EmbedVideo>
          <EmbedVideo>
            <VideoTitle>How to ADD liquidity</VideoTitle>
            <VideoContent
              src="https://www.youtube.com/embed/YGE-GxArA-M"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="How to Add liquidity"
            />
          </EmbedVideo>
          <EmbedVideo>
            <VideoTitle>How to FARM RUBY</VideoTitle>
            <VideoContent
              src="https://www.youtube.com/embed/LBGhu2G6_m4"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="How to FARM RUBY"
            />          
          </EmbedVideo>
          <EmbedVideo>
            <VideoTitle>How to STAKE RUBY</VideoTitle>
            <VideoContent
              src="https://www.youtube.com/embed/8JOHkP3XntA"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="How to STAKE RUBY"
            />
          </EmbedVideo>
        </VideoWrapper>
      </Page>
    </>
  )
}
