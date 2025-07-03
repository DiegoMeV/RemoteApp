import { useJsApiLoader } from '@react-google-maps/api'
import { useState } from 'react'

const useMapControls = () => {
  const [map, setMap] = useState(null)
  const [mapVersion, setMapVersion] = useState(0)
  const [departamentos, setDepartamentos] = useState(false)
  const [viewMarkers, setViewMarkers] = useState(false)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
    libraries: ['visualization'],
  })

  const toggleDepartamentos = () => {
    setDepartamentos(!departamentos)
    setMapVersion((prevVersion) => prevVersion + 1)
  }

  const toggleMarker = () => {
    setViewMarkers(!viewMarkers)
    setMapVersion((prevVersion) => prevVersion + 1)
  }

  const propsButtonSelects = {
    toggleDepartamentos,
    departamentos,
    toggleMarker,
    viewMarkers,
  }

  const propsGoogleMap = {
    mapVersion,
    setMap,
    viewMarkers,
    map,
    departamentos,
  }
  return { isLoaded, propsButtonSelects, propsGoogleMap }
}

export default useMapControls
