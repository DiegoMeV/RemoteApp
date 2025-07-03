import { useStoreState } from 'easy-peasy'
import { useEffect, useMemo, useState } from 'react'
import { MarkerType, useReactFlow } from 'reactflow'
import { fitViewSize } from './funcs'

const useDynamicShape = (type) => {
  const dark = useStoreState((state) => state.darkTheme.dark)

  const { fitView } = useReactFlow()

  const [bgColor, setBgColor] = useState('')

  useEffect(() => {
    setBgColor(dark === 'dark' ? '#4B4B4F' : '')
  }, [dark])

  const defaultEdgeOptions = useMemo(() => {
    return {
      type: type ?? 'addNewStage',
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#1E88E5',
      },
      style: { stroke: '#1E88E5' },
    }
  }, [type])

  useEffect(() => {
    window.addEventListener('resize', () => {
      fitViewSize(fitView)
    })
    return () =>
      window.removeEventListener('resize', () => {
        fitViewSize(fitView)
      })
  }, [fitView])

  return { bgColor, defaultEdgeOptions }
}

export default useDynamicShape
