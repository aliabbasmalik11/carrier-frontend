import './styles.scss'

function RecordsTable({records, infoFlag, loading, error}) {
  return (
    <div className='records-table-banner'>
      <div className='title'>Matched Carriers</div>

      <div className="customers">
        <div className='head'>
          <div className='table-title record-id'>#</div>
          <div className='table-title record-name'>Carrier name</div>
        </div>
        <div className='body'>
          {records?.map((record, index) => (
            <div key={index} className='table-row'>
              <div className='record-id'>
                {record?.id}
              </div>
              <div className='record-name'>
                {record?.Carrier?.name}
              </div>
            </div>
          ))}
          {records?.length === 0 && (
            <div className='info-message'>
              {!loading && infoFlag && !error &&<div>Not found any matched Carriers</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecordsTable;
