import { useState, useEffect } from 'react';
import Select from 'react-select'
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';

import './app.scss';

import RecordsTable from './components/Table'

import { getStatesApi, getInsuranceTypesApi, getRecordsApi } from '../src/api/records';

function App() {
  const [states, setStates] = useState([]);
  const [stetesLoader, setStateLoader] = useState(false);
  const [types, setTypes] = useState([]);
  const [typesLoader, setTypeLoader] = useState(false);

  const [selectedState, setState] = useState('');
  const [selectedType, setType] = useState('');

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [infoFlag, setInfoFlag] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    getTypes();
    getStates();
  }, []);

  const getStates = async () => {
    setStateLoader(true)
    const data = await getStatesApi({
      onFinally: () => setStateLoader(false)
    });
    setStates([...data?.states])
  }

  const getTypes = async () => {
    setTypeLoader(true);
    const data = await getInsuranceTypesApi({
      onFinally: () => setTypeLoader(false)
    });
    setTypes([...data?.types])
  }

  const getRecords = async () => {
    if(!selectedState || !selectedType){
      toast.info('Please select insurance type and state.');
      return;
    }
    setLoading(true);
    setInfoFlag(true);
    const data = await getRecordsApi({
      data: {state: selectedState, type: selectedType},
      onSuccess: () => setError(false),
      onFailure: () => {toast.error("Something went wrong"); setError(true); setRecords([])},
      onFinally: () => setLoading(false),
    });
    setRecords([...data?.records]);
  }

  const onChangeType = (type)  => {
    setType(type?.name);
  }

  const onChangeState = (state) => {
    setState(state.abbreviation);
  }

  return (
    <div className="App">
      <div className='page-loader'>
        <ClipLoader color={'black'} loading={loading} size={150} />
      </div>

      <div className='selects-banner'>
        <div className='type-select-banner'>
          <Select 
            placeholder='Insurance Type'
            options={types}
            getOptionLabel={option => option.name}
            getOptionValue={option => option.name}
            onChange={onChangeType}
            isLoading={typesLoader}
          />
        </div>
        <div className='state-select-banner'>
          <Select 
            placeholder='State'
            options={states}
            getOptionLabel={option => option.name}
            getOptionValue={option => option.abbreviation}
            onChange={onChangeState}
            isLoading={stetesLoader}
          />
        </div>
        <button onClick={getRecords} className="sumbit-button">get records</button>
      </div>

      <RecordsTable {...{records, infoFlag, loading, error}}/>
    </div>
  );
}

export default App;
