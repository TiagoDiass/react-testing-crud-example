import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Patient } from '../../@types';
import PatientForm from '../../components/PatientForm/PatientForm';
import PatientsService from '../../services/requests';
import { Container, Header, Main } from './styles';

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
  });

  const [isEdit, setIsEdit] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(0);

  const isFormInvalid = !form.email || !form.name;

  async function fetchPatients() {
    setIsLoading(true);
    const response = await PatientsService.fetchPatientsRequest();

    setPatients(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleFormClear = () => {
    setForm({
      name: '',
      email: '',
    });

    setIsEdit(false);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    handleCreatePatient();
  };

  const handleCreatePatient = async () => {
    await PatientsService.addPatientRequest(form);
    await fetchPatients();
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleEditClick = (patient: Patient) => {
    setForm({
      ...patient,
    });

    setIsEdit(true);
    setCurrentEditId(patient.id);
  };

  return (
    <Container>
      <Header>
        <h1>React tests CRUD</h1>
      </Header>
      <Main>
        <PatientForm
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
          handleFormClear={handleFormClear}
          form={form}
          isEdit={isEdit}
          isFormInvalid={isFormInvalid}
        />

        {isLoading ? (
          <h2
            data-testid='loading'
            style={{ alignSelf: 'center', marginTop: 12 }}
          >
            Carregando...
          </h2>
        ) : (
          <ul>
            {patients.length ? (
              patients.map((patient) => (
                <li data-testid='patient-list-item' key={patient.id}>
                  <span>ID: {patient.id}</span>{' '}
                  <span>Nome: {patient.name}</span>{' '}
                  <span>Email: {patient.email}</span>
                  <div>
                    <button onClick={() => handleEditClick(patient)}>
                      Editar
                    </button>

                    <button>Apagar</button>
                  </div>
                </li>
              ))
            ) : (
              <li>Sem usuários cadastrados</li>
            )}
          </ul>
        )}
      </Main>
    </Container>
  );
};

export default observer(Patients);
