import './styles/styles.css'

const BasicCard = (props) => {
  const { name, description, Icon, details, className, ...rest } = props
  return (
    <section
      className={`basic_card_container  ${rest?.onClick ? 'cursor-pointer' : ''} ${
        className ?? ''
      }`}
      {...rest}
    >
      <article className='backgroundwhite1'>
        {Icon ? (
          <div className='h-full flex justify-center items-center p-5'>{Icon}</div>
        ) : (
          <img
            className='rounded-l-lg'
            src='https://www.thecircularlab.com/web/app/uploads/2023/08/post-tcl-bosques-naturales.jpg'
            alt='Image not found'
          />
        )}
      </article>
      <article className='p-5 flex items-center justify-between w-full backgroundwhite1'>
        <h5 className='basic_card_title'>{name}</h5>
        <p className='basic_card_p'>{description}</p>
        {details}
      </article>
    </section>
  )
}

export default BasicCard
