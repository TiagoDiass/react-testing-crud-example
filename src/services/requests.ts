import { AxiosResponse } from 'axios';
import { api } from '.';
import { Patient } from '../@types';

// Patients requests
const fetchPatientsRequest = (): Promise<AxiosResponse<Patient[]>> => {
  return api.get('/patients');
};

const addPatientRequest = (
  patient: Omit<Patient, 'id'>
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

const PatientsService = {
  fetchPatientsRequest,
  addPatientRequest,
  editPatientRequest,
  deletePatientRequest,
};

export default PatientsService;
