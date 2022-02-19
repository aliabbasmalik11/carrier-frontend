import { useState, useEffect } from 'react';
import Select from 'react-select'
import ClipLoader from "react-spinners/ClipLoader";

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

  useEffect(() => {
    getTypess();
    getStates();
  }, []);

  const getStates = async () => {
    setStateLoader(true)
    const data = await getStatesApi({
      onFinally: () => setStateLoader(false)
    });
    setStates([...data?.states])
  }

  const getTypess = async () => {
    setTypeLoader(true);
    const data = await getInsuranceTypesApi({
      onFinally: () => setTypeLoader(false)
    });
    setTypes([...data?.types])
  }

  const getRecords = async () => {
    setLoading(true)
    const data = await getRecordsApi({
      data: {state: selectedState, type: selectedType},
      onFinally: () => setLoading(false)
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
            options={types}
            getOptionLabel={option => option.name}
            getOptionValue={option => option.name}
            onChange={onChangeType}
            isLoading={typesLoader}
          />
        </div>
        <div className='state-select-banner'>
          <Select 
            options={states}
            getOptionLabel={option => option.name}
            getOptionValue={option => option.abbreviation}
            onChange={onChangeState}
            isLoading={stetesLoader}
          />
        </div>
      </div>
      <button onClick={getRecords} className="sumbit-button">get records</button>

      <RecordsTable {...{records}}/>
    </div>
  );
}

export default App;
