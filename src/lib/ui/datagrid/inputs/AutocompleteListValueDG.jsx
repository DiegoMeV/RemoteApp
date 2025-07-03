import { AutocompleteOnChangePropDG } from '.'
import { ValueListDG } from '../../modals'

const AutocompleteListValueDG = ({
  controlModal,
  options,
  onChange,
  params,
  loading,
  columns,
  searchText,
  dataGrid,
  handlePaginationModelChange,
  model,
}) => {
  const pagination = {
    paginationModel: model,
    handlePaginationModelChange,
    rowCountState: options?.pagination?.total ?? 0,
  }
  return (
    <>
      <AutocompleteOnChangePropDG
        options={options}
        onChange={onChange}
        searchUse={searchText}
        isLoading={loading}
        openModal={controlModal.handleShow}
        {...params}
      />
      {controlModal?.show && (
        <ValueListDG
          {...params}
          loading={loading}
          openOptions={controlModal}
          columns={columns}
          rows={options ?? []}
          selectedOption={onChange}
          searchOptions={searchText}
          pagination={pagination}
          dataGrid={dataGrid}
        />
      )}
    </>
  )
}

export default AutocompleteListValueDG
