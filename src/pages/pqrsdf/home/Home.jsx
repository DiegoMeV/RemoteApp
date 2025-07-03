import { ActionButtons, LogoHeader, TitleSection } from './components'

const Home = () => {
  return (
    <div className='p-16 flex justify-center h-screen'>
      <div
        className='flex justify-center rounded-md w-full h-full'
        style={{
          boxShadow: '3px 3px 3px 3px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div className='flex flex-col max-w-5xl w-full m-10 items-center'>
          <LogoHeader />
          <TitleSection />
          <ActionButtons />
        </div>
      </div>
    </div>
  )
}

export default Home
