import { action, observable } from 'mobx';
import { requests } from './services';

const {
  addPatientRequest,
  fetchPatients,
  editPatientRequest,
  deletePatientRequest,
} = requests;

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
  @observable patients: Patient[] = [];

  @observable loading = false;

  @action
  loadPatients = (): Promise<ActionResponse> => {
    return new Promise(async (resolve) => {
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
  };

  @action
  addPatient = (patient: PatientForm): Promise<ActionResponse> => {
    return new Promise(async (resolve) => {
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
  };

  @action
  editPatient = (
    patientId: number,
    patient: PatientForm
  ): Promise<ActionResponse> => {
    return new Promise(async (resolve) => {
      this.loading = true;

      const response = await editPatientRequest(patientId, patient);

      this.loading = false;

      this.loadPatients();

      resolve({
        status: response.status,
        message:
          response.status === 200
            ? 'Usuário atualizado com sucesso'
            : 'Houve um problema na requisição',
      });
    });
  };

  @action
  deletePatient = (patientId: number): Promise<ActionResponse> => {
    return new Promise(async (resolve) => {
      this.loading = true;

      const response = await deletePatientRequest(patientId);

      this.loading = false;

      this.loadPatients();

      resolve({
        status: response.status,
        message:
          response.status === 200
            ? 'Usuário deletado com sucesso'
            : 'Houve um problema na requisição',
      });
    });
  };
}
