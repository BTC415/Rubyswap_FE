import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'RubySwap',
  description:
    'The most popular AMM on EGEM by user count! Earn RUBY through yield farming or in Syrup Pools to earn more tokens! on a platform you can trust.',
  image: 'https://exchange.rubyswap.finance/images/mascot-31.jpg',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('RubySwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('RubySwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('RubySwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('RubySwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('RubySwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('RubySwap')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('RubySwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('RubySwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('RubySwap')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('RubySwap')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('RubySwap')}`,
      }
    default:
      return null
  }
}
