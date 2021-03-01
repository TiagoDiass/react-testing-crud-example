import { createContext, useContext } from 'react';
import { PatientsStore } from '../PatientsStore';

type RootStateContextValue = {
  patientsStore: PatientsStore;
};

const RootStateContext = createContext<RootStateContextValue>(
  {} as RootStateContextValue
);

const patientsStore = new PatientsStore();

export const RootStateProvider: React.FC = ({ children }) => {
  return (
    <RootStateContext.Provider value={{ patientsStore }}>
      {children}
    </RootStateContext.Provider>
  );
};

export const useRootStore = () => useContext(RootStateContext);
