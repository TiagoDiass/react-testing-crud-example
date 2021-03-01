import { AxiosResponse } from 'axios';
import { api } from '.';
import { Patient, PatientForm } from '../PatientsStore';

const fetchPatients = (): Promise<AxiosResponse<Patient[]>> => {
  return api.get('/patients');
};

const addPatientRequest = (
  patient: PatientForm
): Promise<AxiosResponse<Patient>> => {
  return api.post('/patients/new', patient);
};

export { fetchPatients, addPatientRequest };
