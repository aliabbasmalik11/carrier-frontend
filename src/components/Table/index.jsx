import './styles.scss'

function RecordsTable({records, infoFlag, loading}) {
  return (
    <div className='records-table-banner'>
      <div className='title'>Matched Carriers</div>

      <table className="customers">
        <thead>
          <tr className='table-row'>
            <td className='table-title'>Id</td>
            <td className='table-title'>Matched Carrier</td>
          </tr>
        </thead>
        <tbody>
          {records?.map((record, index) => (
            <tr key={index} className='table-row'>
              <td>
                {record?.id}
              </td>
              <td>
                {record?.Carrier?.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!loading && infoFlag && records?.length === 0 && <div className='info-message'>Not found any matched Carriers</div>}
    </div>
  )
}

export default RecordsTable;
