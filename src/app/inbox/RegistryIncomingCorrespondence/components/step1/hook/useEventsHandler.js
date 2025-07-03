import { useEffect } from 'react'
import toast from 'react-hot-toast'

export const useEventsHandler = ({ idProcess, getProcessActor, errorLovs }) => {
  // Get Process Actor when idProcess is available
  useEffect(() => {
    if (idProcess) {
      getProcessActor({
        qry: '&actorTypeKey=REMITENTE',
      })
    }
  }, [getProcessActor, idProcess])

  useEffect(() => {
    if (errorLovs) {
      toast.error(`Error in LOVs : ${errorLovs}`)
    }
  }, [errorLovs])
}
