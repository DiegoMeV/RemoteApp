import { useQueryDynamicApi } from '@/lib/api'

const useGetActorsFamilyServices = (idProcess) => {
  const {
    data: complainants,
    isLoading: loadingComplainants,
    isError: errorComplainants,
    isFetching: fetchingComplainants,
  } = useQueryDynamicApi({
    baseKey: 'urlProcess',
    isCompanyRequest: true,
    url: `/processes/${idProcess}/actors?inclActorType=true&actorTypeKey=DENUNCIANTE`,
    enabled: !!idProcess,
  })

  const {
    data: accuseds,
    isLoading: loadingAccuseds,
    isError: errorAccuseds,
    isFetching: fetchingAccuseds,
  } = useQueryDynamicApi({
    baseKey: 'urlProcess',
    isCompanyRequest: true,
    url: `/processes/${idProcess}/actors?inclActorType=true&actorTypeKey=DENUNCIADO`,
    enabled: !!idProcess,
  })

  const {
    data: petitioners,
    isLoading: loadingPetitioners,
    isError: errorPetitioners,
    isFetching: fetchingPetitioners,
  } = useQueryDynamicApi({
    baseKey: 'urlProcess',
    isCompanyRequest: true,
    url: `/processes/${idProcess}/actors?inclActorType=true&actorTypeKey=PETICIONARIO`,
    enabled: !!idProcess,
  })

  return {
    complainants,
    loadingComplainants: loadingComplainants || fetchingComplainants,
    errorComplainants,
    accuseds,
    loadingAccuseds: loadingAccuseds || fetchingAccuseds,
    errorAccuseds,
    petitioners,
    loadingPetitioners: loadingPetitioners || fetchingPetitioners,
    errorPetitioners,
  }
}

export default useGetActorsFamilyServices
