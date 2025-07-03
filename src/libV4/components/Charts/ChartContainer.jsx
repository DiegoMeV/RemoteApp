const ChartContainer = ({ title, minHeight, children }) => {
  return (
    <div
      className='backgroundwhite1 rounded-lg shadow-lg'
      style={{ minHeight: minHeight ?? 'auto' }}
    >
      <div className='flex items-center min-h-[60px] backgroundGray2 rounded-t-lg pl-4'>
        <h6 className='text-[1.2rem] text-primary-light'>{title ?? ''}</h6>
      </div>
      <div className='p-4 overflow-auto'>{children}</div>
    </div>
  )
}

export default ChartContainer
