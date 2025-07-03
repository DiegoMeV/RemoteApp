import { useLocation, useSearchParams } from 'react-router-dom'
import { RenderBlock } from '../components'
import { BasicTitle, LoadingError } from '@/libV4'

const ViewFormComponent = (props) => {
  const { titleComponent, dataBlock, isLoading, isError } = props

  const sortedBlocks = dataBlock?.sort((a, b) => a.order - b.order) || []

  const [blocksModal, blocksModalFalse] = sortedBlocks.reduce(
    ([trueModal, falseModal], item) => {
      item.modal ? trueModal.push(item) : falseModal.push(item)
      return [trueModal, falseModal]
    },
    [[], []]
  )
  const masterBlock = blocksModalFalse[0]?.blockId
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  const pathSegments = pathname.split('/').filter(Boolean)
  const idForm = pathSegments[2] ?? ''
  const idApplication = pathSegments[4] ?? ''
  const idItem = searchParams.get('itemId') ?? ''
  const isDirectForm = searchParams.get('isDirectForm') ?? false
  const isDynamicForm = pathname?.includes('dynamicForm')
  const backpath = `/applications/dynamicForm/${idForm}/?idApplication=${idApplication}&itemId=${idItem}`

  return (
    <section className='space-y-2'>
      <LoadingError
        loading={isLoading}
        error={isError}
      >
        <BasicTitle
          title={titleComponent}
          backpath={!isDirectForm && isDynamicForm && backpath}
        />
        {blocksModalFalse?.map((block, index) => {
          block?.items?.sort((a, b) => a.orden - b.orden)
          const firstBlock = index === 0

          return (
            <div key={index}>
              <RenderBlock
                masterBlock={masterBlock}
                blocksModal={blocksModal}
                block={block}
                firstBlock={firstBlock}
                isDirectForm={isDirectForm}
                isDynamicForm={isDynamicForm}
                {...props}
              />
            </div>
          )
        })}
      </LoadingError>
    </section>
  )
}

export default ViewFormComponent
