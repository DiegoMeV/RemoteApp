import { AppIcon, BasicCard } from '@/libV4'

const CardAppsByCompany = ({ appsByCompany }) => {
  return (
    <>
      <div
        className='grid gap-6 w-full max-w-screen-2xl xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
        style={{
          maxHeight: 'calc(100vh - 310px)',
          overflowY: 'auto',
        }}
      >
        {appsByCompany?.data?.map((option, index) => {
          return (
            <BasicCard
              key={index}
              id='card-apps-by-company'
              name={option.name}
              Icon={
                <AppIcon
                  size={65}
                  className='text-primary-light bg-gray-100 rounded p-1 dark:text-white dark:bg-transparent '
                />
              }
            />
          )
        })}
      </div>
    </>
  )
}

export default CardAppsByCompany
