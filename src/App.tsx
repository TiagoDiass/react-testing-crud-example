import React from 'react';
import Patients from './pages/Patients/Patients';
import GlobalStyles from './globalStyles';
import { PatientsStore } from './PatientsStore';

function App() {
  const patientsStore = new PatientsStore();

  return (
    <>
      <Patients patientsStore={patientsStore} />;
      <GlobalStyles />
    </>
  );
}

export default App;
