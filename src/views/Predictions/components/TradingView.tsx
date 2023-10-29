import React, { useEffect } from 'react'
import { Box } from '@twinkykms/rubyswap-uikit'
import { DefaultTheme, useTheme } from 'styled-components'
import { useTranslation } from 'contexts/Localization'

/**
 * When the script tag is injected the TradingView object is not immediately
 * available on the window. So we listen for when it gets set
 */
const tradingViewListener = async () =>
  new Promise<void>((resolve) =>
    Object.defineProperty(window, 'TradingView', {
      configurable: true,
      set(value) {
        this.tv = value
        resolve(value)
      },
    }),
  )

const initializeTradingView = (TradingViewObj: any, theme: DefaultTheme, localeCode: string) => {
  /* eslint-disable new-cap */
  /* eslint-disable no-new */
  // @ts-ignore
  new TradingViewObj.widget({
    autosize: true,
    height: '100%',
    symbol: 'BINANCE:BNBUSDT',
    interval: '5',
    timezone: 'Etc/UTC',
    theme: theme.isDark ? 'dark' : 'light',
    style: '1',
    locale: localeCode,
    toolbar_bg: '#f1f3f6',
    enable_publishing: false,
    allow_symbol_change: true,
    container_id: 'tradingview_b239c',
  })
}

const TradingView = () => {
  const { currentLanguage } = useTranslation()
  const theme = useTheme()

  useEffect(() => {
    // @ts-ignore
    if (window.TradingView) {
      // @ts-ignore
      initializeTradingView(window.TradingView, theme, currentLanguage.code)
    } else {
      tradingViewListener().then((tv) => {
        initializeTradingView(tv, theme, currentLanguage.code)
      })
    }
  }, [theme, currentLanguage])

  return (
    <Box overflow="hidden" className="tradingview_container">
      <div id="tradingview_b239c" />
    </Box>
  )
}

export default TradingView
