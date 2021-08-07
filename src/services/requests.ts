import { AxiosResponse } from 'axios';
import { api } from '.';
import { Patient } from '../@types';

// Patients requests
const fetchPatients = (): Promise<AxiosResponse<Patient[]>> => {
  return api.get('/patients');
};

const addPatientRequest = (
  patient: Patient
): Promise<AxiosResponse<Patient>> => {
  return api.post('/patients/new', patient);
};

const editPatientRequest = (
  patientId: number,
  patient: Patient
): Promise<AxiosResponse<Patient>> => {
  return api.put(`/patients/${patientId}`, patient);
};

const deletePatientRequest = (patientId: number): Promise<AxiosResponse> => {
  return api.delete(`/patients/${patientId}`);
};

export {
  fetchPatients,
  addPatientRequest,
  editPatientRequest,
  deletePatientRequest,
};
