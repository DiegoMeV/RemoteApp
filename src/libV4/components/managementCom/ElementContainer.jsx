import RequiredLabel from './RequiredLabel'

const ElementContainer = ({ children, isRequired, className }) => {
  return (
    <div className={`backgroundwhite1 relative flex rounded-md p-4 ${className ?? ''}`}>
      {isRequired && <RequiredLabel isRequired={isRequired} />}
      <div className='grid grid-cols-12 gap-4 pt-6 align-middle w-full'>{children}</div>
    </div>
  )
}

export default ElementContainer
