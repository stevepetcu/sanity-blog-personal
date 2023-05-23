import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface Props {
  children?: ReactNode
}

// Create two context:
// UserContext: to query the context state
// UserDispatchContext: to mutate the context state
const PixelRatioContext = createContext(undefined)
const PixelRatioDispatchContext = createContext(undefined)

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function PixelRatioProvider({ children }: Props) {
  const [pixelRatio, setPixelRatio] = useState(1)

  useEffect(function onFirstMount() {
    setPixelRatio(window.devicePixelRatio)
  }, [])

  return (
    <PixelRatioContext.Provider value={pixelRatio}>
      <PixelRatioDispatchContext.Provider value={pixelRatio}>
        {children}
      </PixelRatioDispatchContext.Provider>
    </PixelRatioContext.Provider>
  )
}

export { PixelRatioContext, PixelRatioDispatchContext, PixelRatioProvider }
