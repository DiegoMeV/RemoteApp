const AppIcon = ({ size, ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <rect
        x='2'
        y='4'
        width='20'
        height='16'
        rx='2'
      />
      <path d='M10 4v4' />
      <path d='M2 8h20' />
      <path d='M6 4v4' />
    </svg>
  )
}

export default AppIcon
