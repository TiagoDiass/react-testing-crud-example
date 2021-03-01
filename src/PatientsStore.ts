import { makeAutoObservable } from 'mobx';
import { requests } from './services';

const { addPatientRequest, fetchPatients } = requests;

export type Patient = {
  id: number;
  name: string;
  email: string;
};

export type PatientForm = {
  name: string;
  email: string;
};

export type ActionResponse<T = any> = {
  status: number;
  message: string;
  data?: T;
};

export class PatientsStore {
  constructor() {
    makeAutoObservable(this);
  }

  patients: Patient[] = [];

  loading = false;

  loadPatients = (): Promise<ActionResponse> =>
    new Promise(async (resolve) => {
      this.loading = true;

      const response = await fetchPatients();

      this.patients = response.data;

      this.loading = false;

      resolve({
        status: response.status,
        message:
          response.status === 200
            ? 'Lista de usuários carregada com sucesso'
            : 'Houve um problema na requisição',
      });
    });

  addPatient = (patient: PatientForm): Promise<ActionResponse> =>
    new Promise(async (resolve) => {
      this.loading = true;

      const response = await addPatientRequest(patient);

      this.loading = false;

      this.loadPatients();

      resolve({
        status: response.status,
        message:
          response.status === 200
            ? 'Usuário adicionado com sucesso'
            : 'Houve um problema na requisição',
      });
    });
}
