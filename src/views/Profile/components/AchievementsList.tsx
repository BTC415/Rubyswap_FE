import React from 'react'
import styled from 'styled-components'
import { Flex, Heading } from '@twinkykms/rubyswap-uikit'
import { useTranslation } from 'contexts/Localization'
import { useAchievements } from 'state/achievements/hooks'
import AchievementCard from './AchievementCard'

const Grid = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
`

const AchievementsList = () => {
  const { t } = useTranslation()
  const achievements = useAchievements()

  return (
    <>
      <Grid>
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </Grid>
      {achievements.length === 0 && (
        <Flex alignItems="center" justifyContent="center" style={{ height: '64px' }}>
          <Heading as="h5" scale="md" color="textDisabled">
            {t('No achievements yet!')}
          </Heading>
        </Flex>
      )}
    </>
  )
}

export default AchievementsList
