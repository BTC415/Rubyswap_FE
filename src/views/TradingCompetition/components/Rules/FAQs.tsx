import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, CardHeader, Heading, Text, Flex } from '@twinkykms/rubyswap-uikit'
import { useTranslation } from 'contexts/Localization'
import FoldableText from 'components/FoldableText'

const Wrapper = styled(Flex)`
  margin-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    flex: 1;
    margin-top: 0px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    flex: 2;
  }
`

const StyledCardbody = styled(CardBody)`
  div:first-child {
    margin-top: 0px;
  }
`

const FAQ = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <Card>
        <CardHeader>
          <Heading scale="lg">{t('Details')}</Heading>
        </CardHeader>
        <StyledCardbody>
          <FoldableText title={t('Eligible trading pairs')} mt="24px">
            <Text fontSize="14px" color="textSubtle">
              {t(
                'Only trades on EGEM/BUSD, RUBY/EGEM, ETH/EGEM and BTCB/EGEM pairs will be included in volume calculations.',
              )}
            </Text>
          </FoldableText>
          <FoldableText title={t('Calculating team ranks and winners')} mt="24px">
            <Text fontSize="14px" color="textSubtle">
              -{' '}
              {t(
                'Team ranks are calculated by the total combined volume of the top 500 members of each respective team.',
              )}
            </Text>
            <Text fontSize="14px" color="textSubtle">
              -{' '}
              {t(
                'The final winning team will be the team with the highest total combined volume of their top 500 members at the end of the competition period.',
              )}
            </Text>
          </FoldableText>
          <FoldableText title={t('Prize distribution')} mt="24px">
            <Text fontSize="14px" color="textSubtle">
              -{' '}
              {t(
                'Prizes to be distributed in RUBY and shared by all members of each respective tier as per the Prizes section above.',
              )}
            </Text>
            <Text fontSize="14px" color="textSubtle">
              -{' '}
              {t(
                'RUBY prizes will be distributed as per the RUBY/BUSD price on the day of distribution. Every eligible participant will win prizes at the end of the competition.',
              )}
            </Text>
            <Text fontSize="14px" color="textSubtle">
              - {t('Every participant will win at least one prize at the end of the competition')}
            </Text>
          </FoldableText>
          <FoldableText title={t('Fine print')} mt="24px">
            <Text fontSize="14px" color="textSubtle">
              -{' '}
              {t(
                'In the event of a disagreement concerning the final winning team or rank, RubySwap will have the final say.',
              )}
            </Text>
            <Text fontSize="14px" color="textSubtle">
              -{' '}
              {t(
                'RubySwap can and will disqualify any team or specific members that are proven to have taken malicious action or attempt to “cheat” in any way.',
              )}
            </Text>
          </FoldableText>
          <FoldableText title={t('Can I join the battle after it starts?')} mt="24px">
            <Text fontSize="14px" color="textSubtle">
              {t('Sorry, no. You need to register during the registration period, before the start of the event.')}
            </Text>
          </FoldableText>
          <FoldableText title={t('How do I know if I successfully registered?')} mt="24px">
            <Text fontSize="14px" color="textSubtle">
              {t('At the top of the page, the text in the button “I Want to Battle” will change to “Registered”.')}
            </Text>
          </FoldableText>
          <FoldableText title={t('How can I see my current rank?')} mt="24px">
            <Text fontSize="14px" color="textSubtle">
              {t('Check Your Score section on the event page. You’ll need to connect your wallet, of course.')}
            </Text>
          </FoldableText>
          <FoldableText title={t('How do I claim my prize(s)?')} mt="24px">
            <Text fontSize="14px" color="textSubtle">
              {t(
                'After the battle ends, visit the event page and click the “Claim Prizes” button in the top section or in “Your Score” section. Once you claim your prizes successfully, the button text will change to “Prizes Claimed”.',
              )}
            </Text>
          </FoldableText>
        </StyledCardbody>
      </Card>
    </Wrapper>
  )
}

export default FAQ
