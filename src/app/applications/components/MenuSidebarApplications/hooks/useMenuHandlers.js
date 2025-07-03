import { useEffect, useState } from 'react'
import { useRootStore } from '@/libV4'
import toast from 'react-hot-toast'
import { useMutationDynamicBaseUrl, downloadFile, useValidateDirtyForm } from '@/lib'
import { useLocation } from 'react-router-dom'

const useMenuHandlers = ({ setOpenKeys, getMenuApplications, itemId, idApplication }) => {
  const [labelItem, setLabelItem] = useState('')
  const { menuSelected, setMenuSelected } = useRootStore()
  const validateDirtyForm = useValidateDirtyForm()
  const location = useLocation()
  const locationName = `${location.pathname}${location?.search ?? ''}`

  const { mutateAsync: downloadOracleForm } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlApps',
    onSuccess: (e) => {
      const fileName = `${labelItem}.jnlp`
      downloadFile(e, fileName, 'application/x-java-jnlp-file')
      toast.success('Formulario descargado correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al descargar el formulario')
    },
  })

  const handleOpenChange = (newOpenKeys) => {
    getMenuApplications(newOpenKeys?.key)

    setMenuSelected({
      openKeys: [newOpenKeys?.key],
    })
    setOpenKeys(newOpenKeys)
  }

  const handleClick = (e) => {
    const { module, optionModule, url, label, path, type } = e.data
    setLabelItem(label)
    setMenuSelected({
      selected: e.key,
      path: `${location.pathname}${location.search}`,
    })

    const actions = {
      ORACLE_FORM: () =>
        downloadOracleForm({
          qry: `/app-specific/siif-web/${module}/${optionModule}/generate-jnlp`,
          methodBody: 'get',
        }),
      ORACLE_REPORT: () => window.open(url, url),
      DEFAULT: () => {
        validateDirtyForm(path)
      },
    }

    ;(actions[type] || actions.DEFAULT)()
  }

  useEffect(() => {
    if (locationName !== menuSelected.path) {
      setMenuSelected({
        path: locationName,
      })
    }

    const loadOpenKeys = async () => {
      if (!menuSelected.openKeys?.length && idApplication) {
        await getMenuApplications(idApplication)
        setMenuSelected({
          selected: itemId ?? '',
          openKeys: [idApplication],
        })
        setOpenKeys([idApplication])
        return
      }

      if (menuSelected.openKeys?.length > 0) {
        for (const key of menuSelected.openKeys) {
          await getMenuApplications(key)
        }

        if (itemId) {
          setMenuSelected((prev) => ({
            ...prev,
            selected: itemId,
          }))
        }

        setOpenKeys(menuSelected.openKeys)
      }
    }

    loadOpenKeys().catch((error) => {
      console.error('Error loading open keys:', error)
    })
  }, [
    menuSelected.openKeys,
    idApplication,
    itemId,
    getMenuApplications,
    setMenuSelected,
    setOpenKeys,
    locationName,
    menuSelected.path,
  ])

  return { handleOpenChange, handleClick, menuSelected }
}

export default useMenuHandlers
