import React, { useState, useEffect, useRef, useMemo } from 'react'
import { debounce } from '../utils/helpers';

const WithSize = ({ Component, state, ...rest }) => {
  const elRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 80, height: 120 })

  // Debounces updates to dimension state by 250ms for performance reasons
  const updateDimensions = debounce(() => {
    console.log('updating stuff')
    if (elRef.current) {
      console.log('updating width and height for container: ', elRef.current.clientWidth, elRef.current.clientHeight)
      setDimensions({
        width: elRef.current.clientWidth,
        height: elRef.current.clientHeight
      });
    }
  }, 250);

  useEffect(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => { window.removeEventListener('resize', updateDimensions) }
  }, [])

  const memoized = useMemo(() => { return <Component {...rest} state={state} height={dimensions.height} width={dimensions.width} /> }, [state.items, state.orders])


  return (
    <div ref={elRef} style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Component {...rest} state={state} height={dimensions.height} width={dimensions.width} />
    </div>
  )
}

export default WithSize
