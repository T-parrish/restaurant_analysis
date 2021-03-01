import React, { useEffect, useReducer } from 'react';
import { initialState, reducer } from '../reducers/cfgReducer';
import GraphWrapper from '../hoc/GraphWrapper';
import ScatterPlot from '../components/ScatterPlot';
import Spinner from '../components/Spinner';

const OpsPage = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState())

  const componentSwitch = (target) => {
    const opts = {
      'loading': Spinner,
      'idle': ScatterPlot
    }

    return opts[target] || <div>error</div>
  }

  useEffect(() => {
    switch (state.current) {
      case 'loading':
        const items = require('../data/menu_perf.json');
        const orders = require('../data/orders.json');
        setTimeout(() => {
          dispatch({ type: 'LOAD_DATA', orders: orders, items: items })
        }, 1500)
        break;
      case 'loaded':
        break;
      case 'idle':
        break;
    }
  }, [])

  return (
    <>
      <GraphWrapper Component={componentSwitch(state.current)} {...props} state={state} dispatch={dispatch} />
    </>
  )
}

export default OpsPage
