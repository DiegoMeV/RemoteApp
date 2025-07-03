import { DynamicMuiIcon } from '@/libV4'
import { Folder } from '@mui/icons-material'

const mapMenuApplications = (items) => {
  return items.map((item) => ({
    key: item.id,
    icon: item?.applicationSpecs?.icon?.length ? (
      <DynamicMuiIcon
        name={item?.applicationSpecs?.icon}
        className='text-xl'
      />
    ) : (
      <Folder color='secondary' />
    ),
    label: item.name,
    title: item.name,
    isParent: true,
    children: [],
  }))
}

export default mapMenuApplications
