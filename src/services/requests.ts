import { AxiosResponse } from 'axios';
import { api } from '.';
import { Patient, PatientForm } from '../PatientsStore';

// Patients requests
const fetchPatients = (): Promise<AxiosResponse<Patient[]>> => {
  return api.get('/patients');
};

const addPatientRequest = (
  patient: PatientForm
): Promise<AxiosResponse<Patient>> => {
  return api.post('/patients/new', patient);
};

const editPatientRequest = (
  patientId: number,
  patient: PatientForm
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
