import React from 'react';
import Patients from './pages/Patients/Patients';
import GlobalStyles from './globalStyles';
import { useRootStore } from './context/RootState.context';

function App() {
  const { patientsStore } = useRootStore();

  return (
    <>
      <Patients patientsStore={patientsStore} />;
      <GlobalStyles />
    </>
  );
}

export default App;
