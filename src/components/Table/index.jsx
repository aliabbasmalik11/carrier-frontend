import './styles.scss'

function RecordsTable({records}) {
  return (
    <div className='records-table-banner'>
      <div className='title'>Carriers</div>

      <table className="customers">
        <thead>
          <tr className='table-row'>
            <td className='table-title'>Carrier</td>
          </tr>
        </thead>
        <tbody>
          {records?.map((record, index) => (
            <tr key={index} className='table-row'>
              <td>
                {record?.Carrier?.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecordsTable;
