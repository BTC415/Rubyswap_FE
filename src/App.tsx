import React, { lazy, useEffect } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@twinkykms/rubyswap-uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import { usePollBlockNumber } from 'state/block/hooks'
import { usePollCoreFarmData } from 'state/farms/hooks'
import { useFetchProfile } from 'state/profile/hooks'
import { DatePickerPortal } from 'components/DatePicker'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import { ToastListener } from './contexts/ToastsContext'
import PageLoader from './components/Loader/PageLoader'
import EasterEgg from './components/EasterEgg'
import history from './routerHistory'
// Views included in the main bundle
import Pools from './views/Pools'
import Swap from './views/Swap'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity,
} from './views/AddLiquidity/redirects'
import RedirectOldRemoveLiquidityPathStructure from './views/RemoveLiquidity/redirects'
import { RedirectPathToSwapOnly, RedirectToSwap } from './views/Swap/redirects'
// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const FarmAuction = lazy(() => import('./views/FarmAuction'))
const Lottery = lazy(() => import('./views/Lottery'))
const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
const Collectibles = lazy(() => import('./views/Collectibles'))
const Teams = lazy(() => import('./views/Teams'))
const Team = lazy(() => import('./views/Teams/Team'))
const Profile = lazy(() => import('./views/Profile'))
const TradingCompetition = lazy(() => import('./views/TradingCompetition'))
const Predictions = lazy(() => import('./views/Predictions'))
const Voting = lazy(() => import('./views/Voting'))
const Proposal = lazy(() => import('./views/Voting/Proposal'))
const CreateProposal = lazy(() => import('./views/Voting/CreateProposal'))
const AddLiquidity = lazy(() => import('./views/AddLiquidity'))
const Liquidity = lazy(() => import('./views/Pool'))
const PoolFinder = lazy(() => import('./views/PoolFinder'))
const RemoveLiquidity = lazy(() => import('./views/RemoveLiquidity'))
const Tutorials = lazy(() => import ('./views/Tutorials'))
const TFTH = lazy(() => import("./views/2f2h"))

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const IconChanger = () => {
  // var menu = document.getElementsByTagName("a[href='/tutorials']")
  const menu = document.querySelector("a[href='/tutorials']")
  const icon = menu?.querySelector("svg")
  if(icon)
    icon.outerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      width="24" height="24" style="margin-right:8px;min-width:24px"
      viewBox="0 0 172 172"
      style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#fd7fa0"><path d="M85.57,24.08c-0.37625,0.05375 -0.73906,0.16125 -1.075,0.3225l-82.56,41.28c-1.20937,0.56438 -1.98875,1.78719 -1.98875,3.1175c0,1.33031 0.77938,2.55313 1.98875,3.1175l11.825,5.9125v50.095c-3.9775,1.43781 -6.88,5.22719 -6.88,9.675c0,1.98875 0.67188,3.50719 1.3975,5.16c0.72563,1.65281 1.57219,3.27875 2.4725,4.8375c1.80063,3.10406 3.655,5.6975 3.655,5.6975l2.795,4.085l2.795,-4.085c0,0 1.85438,-2.59344 3.655,-5.6975c0.90031,-1.55875 1.74688,-3.18469 2.4725,-4.8375c0.72563,-1.65281 1.3975,-3.17125 1.3975,-5.16c0,-4.44781 -2.9025,-8.23719 -6.88,-9.675v-46.655l13.76,6.88v11.61c0,2.09625 1.38406,3.42656 2.4725,4.1925c1.08844,0.76594 2.2575,1.24969 3.655,1.72c2.795,0.94063 6.49031,1.72 10.965,2.365c8.96281,1.27656 21.07,2.0425 34.5075,2.0425c13.4375,0 25.54469,-0.76594 34.5075,-2.0425c4.47469,-0.645 8.17,-1.42437 10.965,-2.365c1.3975,-0.47031 2.56656,-0.95406 3.655,-1.72c1.08844,-0.76594 2.4725,-2.09625 2.4725,-4.1925v-11.61l32.465,-16.2325c1.20938,-0.56437 1.98875,-1.78719 1.98875,-3.1175c0,-1.33031 -0.77937,-2.55312 -1.98875,-3.1175l-82.56,-41.28c-0.60469,-0.29562 -1.27656,-0.40312 -1.935,-0.3225zM86,31.39l74.82,37.41l-23.22,11.61v-4.73c0,-2.10969 -1.38406,-3.44 -2.4725,-4.1925c-1.08844,-0.7525 -2.2575,-1.24969 -3.655,-1.72c-2.80844,-0.94062 -6.47687,-1.72 -10.965,-2.365c-8.97625,-1.27656 -21.12375,-2.0425 -34.5075,-2.0425c-13.38375,0 -25.53125,0.76594 -34.5075,2.0425c-4.48812,0.645 -8.15656,1.42438 -10.965,2.365c-1.3975,0.47031 -2.56656,0.9675 -3.655,1.72c-1.08844,0.7525 -2.4725,2.08281 -2.4725,4.1925v4.73l-23.22,-11.61zM86,72.24c13.115,0 25.0475,0.72563 33.54,1.935c4.24625,0.60469 7.59219,1.34375 9.675,2.0425c0.76594,0.25531 1.16906,0.47031 1.505,0.645v16.77c-2.70094,-0.84656 -6.08719,-1.55875 -10.2125,-2.15c-8.96281,-1.27656 -21.07,-2.0425 -34.5075,-2.0425c-13.4375,0 -25.54469,0.76594 -34.5075,2.0425c-4.12531,0.59125 -7.51156,1.30344 -10.2125,2.15v-16.77c0.33594,-0.17469 0.73906,-0.38969 1.505,-0.645c2.08281,-0.69875 5.42875,-1.43781 9.675,-2.0425c8.4925,-1.20937 20.425,-1.935 33.54,-1.935zM86,96.32c13.16875,0 25.06094,0.72563 33.54,1.935c3.1175,0.44344 5.18688,0.98094 7.2025,1.505c-2.01562,0.52406 -4.085,1.06156 -7.2025,1.505c-8.47906,1.20938 -20.37125,1.935 -33.54,1.935c-13.16875,0 -25.06094,-0.72562 -33.54,-1.935c-3.1175,-0.44344 -5.18687,-0.98094 -7.2025,-1.505c2.01563,-0.52406 4.085,-1.06156 7.2025,-1.505c8.47906,-1.20937 20.37125,-1.935 33.54,-1.935zM17.2,134.16c1.90813,0 3.44,1.53188 3.44,3.44c0,-0.09406 -0.18812,1.08844 -0.7525,2.365c-0.56437,1.27656 -1.43781,2.78156 -2.2575,4.1925c-0.22844,0.40313 -0.20156,0.37625 -0.43,0.7525c-0.22844,-0.37625 -0.20156,-0.34937 -0.43,-0.7525c-0.81969,-1.41094 -1.69312,-2.91594 -2.2575,-4.1925c-0.56437,-1.27656 -0.7525,-2.45906 -0.7525,-2.365c0,-1.90812 1.53188,-3.44 3.44,-3.44z"></path></g></g></svg>
      `
  const menu2f2h = document.querySelector("a[href='/2f2h']")
  const icon2f2h = menu2f2h?.querySelector("svg")
  if(icon2f2h)
    icon2f2h.outerHTML = `
      <svg id="Layer_1" width="24" height="24" style="margin-right:8px;min-width:24px" data-name="Layer 1" fill="#fd7fa0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.03 25"><defs><style>.cls-1{fill: rgba(0,0,0,0);}.cls-2{fill:#fd7fa0;}</style></defs><title>bitcoin</title><path d="M10.8,5.65l1.61-2.91a.48.48,0,0,1,.42-.24h.37a.47.47,0,0,1,.17,0,5.16,5.16,0,0,1,2.24,1.35.33.33,0,0,1,0,.37l-1.85,3-3-1.37Z" transform="translate(-5.99 -2.5)"/><path class="cls-1" d="M21.24,15.25a1.62,1.62,0,0,1,0,.22,6,6,0,1,1-9.59-5l.07-.05a3.92,3.92,0,0,0,2.76.43A2.22,2.22,0,0,0,16,9.31l.42.07a6,6,0,0,1-.25,1.33l.07.07.84-1.24.43.15-1.41,1.9a.29.29,0,0,0,0,.31A5.9,5.9,0,0,0,18,13.65a.28.28,0,0,0,.34-.06l1.74-1.93c.09.13.18.26.26.39l-1.72,1.89a.18.18,0,0,0,0,.17,2.62,2.62,0,0,0,1.38,1.52.19.19,0,0,0,.22,0l1.06-.95A5.68,5.68,0,0,1,21.24,15.25Z" transform="translate(-5.99 -2.5)"/><path d="M23.26,13.37l-2,2.09h0a6,6,0,1,1-9.59-5l.07-.05a3.92,3.92,0,0,0,2.76.43A2.22,2.22,0,0,0,16,9.31,1.57,1.57,0,0,0,16,9a.26.26,0,0,0-.15-.28L10.53,6.2a.67.67,0,0,0-.31-.07h-.1a.72.72,0,0,0-.6.32L6.09,11.63A.56.56,0,0,0,6,12v.43a.54.54,0,0,0,.11.35l5.42,7.73-1,7h9.75v-6L22.94,16A4.6,4.6,0,0,0,23.26,13.37Zm-6.57,9.28-.64,3.57-.14-3.69-1.25-1.26a4.58,4.58,0,0,0,3.34.42Z" transform="translate(-5.99 -2.5)"/><path d="M19.27,6.27,17.05,9.54l-.84,1.24-.07-.07a6,6,0,0,0,.25-1.33,1.13,1.13,0,0,0,0-.26,1.07,1.07,0,0,0-.76-.94c-.09-.06-1.43-.74-1.43-.74l1.94-3.18a.35.35,0,0,1,.28-.15,3.66,3.66,0,0,1,2,.95,3.74,3.74,0,0,1,.86.87A.32.32,0,0,1,19.27,6.27Z" transform="translate(-5.99 -2.5)"/><path d="M24,11.89v0a.51.51,0,0,1-.16.37l-2.64,2.37-1.06.95a.19.19,0,0,1-.22,0,2.62,2.62,0,0,1-1.38-1.52.18.18,0,0,1,0-.17l1.72-1.89L22.19,10a.24.24,0,0,1,.27-.07,1,1,0,0,1,.16.09A4.69,4.69,0,0,1,24,11.65.53.53,0,0,1,24,11.89Z" transform="translate(-5.99 -2.5)"/><path class="cls-2" d="M17.63,17.58l-.31-7.23c0-.08-.05-.1-.1,0l-5.3,4.95a.24.24,0,0,0-.06.23l1.56,4a.12.12,0,0,0,.17.08l3.91-1.83A.22.22,0,0,0,17.63,17.58Zm-1.51-.27-2,1a.12.12,0,0,1-.17-.07l-.79-2.1a.21.21,0,0,1,0-.23L16,13.25c.06-.06.11,0,.11,0l.15,3.82A.21.21,0,0,1,16.12,17.31Z" transform="translate(-5.99 -2.5)"/><path class="cls-2" d="M15.86,16.93l-.11-2.8c0-.05,0-.06-.07,0l-2,1.92a.15.15,0,0,0,0,.13l.59,1.55a.08.08,0,0,0,.11,0l1.49-.69A.17.17,0,0,0,15.86,16.93Zm-.61-.07-.75.36a.08.08,0,0,1-.11,0l-.29-.77a.14.14,0,0,1,0-.14l1.06-1s.06,0,.07,0l.05,1.45A.16.16,0,0,1,15.25,16.86Z" transform="translate(-5.99 -2.5)"/><path d="M22.16,9.32l-2.11,2.34-1.74,1.93a.28.28,0,0,1-.34.06,5.9,5.9,0,0,1-1.91-1.75.29.29,0,0,1,0-.31l1.41-1.9,2.06-2.78a.34.34,0,0,1,.39-.11,4.33,4.33,0,0,1,1.37,1A4.22,4.22,0,0,1,22.22,9,.34.34,0,0,1,22.16,9.32Z" transform="translate(-5.99 -2.5)"/></svg>
    `
}
const App: React.FC = () => {
  usePollBlockNumber()
  useEagerConnect()
  useFetchProfile()
  usePollCoreFarmData()
  IconChanger()
  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/swap" />
            </Route>
            <Route exact path="/farms/auction">
              <FarmAuction />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/pools">
              <Pools />
            </Route>
            <Route path="/lottery">
              <Lottery />
            </Route>
            <Route path="/ifo">
              <Ifos />
            </Route>
            <Route path="/collectibles">
              <Collectibles />
            </Route>
            <Route exact path="/teams">
              <Teams />
            </Route>
            <Route path="/teams/:id">
              <Team />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/competition">
              <TradingCompetition />
            </Route>
            <Route path="/prediction">
              <Predictions />
            </Route>
            <Route exact path="/voting">
              <Voting />
            </Route>
            <Route exact path="/voting/proposal/create">
              <CreateProposal />
            </Route>
            <Route path="/voting/proposal/:id">
              <Proposal />
            </Route>
            <Route path="/tutorials">
              <Tutorials />
            </Route>
            <Route path="/2f2h">
              <TFTH />
            </Route>
            {/* Using this format because these components use routes injected props. We need to rework them with hooks */}
            <Route exact strict path="/swap" component={Swap} />
            <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
            <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
            <Route exact strict path="/find" component={PoolFinder} />
            <Route exact strict path="/liquidity" component={Liquidity} />
            <Route exact strict path="/create" component={RedirectToAddLiquidity} />
            <Route exact path="/add" component={AddLiquidity} />
            <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact path="/create" component={AddLiquidity} />
            <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
            <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

            {/* Redirect */}
            <Route path="/pool">
              <Redirect to="/liquidity" />
            </Route>
            <Route path="/staking">
              <Redirect to="/pools" />
            </Route>
            <Route path="/syrup">
              <Redirect to="/pools" />
            </Route>
            <Route path="/nft">
              <Redirect to="/collectibles" />
            </Route>

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <EasterEgg iterations={2} />
      <ToastListener />
      <DatePickerPortal />
    </Router>
  )
}

export default React.memo(App)
