import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Patient } from '../../@types';
import PatientForm from '../../components/PatientForm/PatientForm';
import { Container, Header, Main } from './styles';

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
  });

  const [isEdit, setIsEdit] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(0);

  const isFormInvalid = !form.email || !form.name;

  const handleFormClear = () => {
    setForm({
      name: '',
      email: '',
    });

    setIsEdit(false);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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

        {false ? (
          <h2 style={{ alignSelf: 'center', marginTop: 12 }}>Carregando...</h2>
        ) : (
          <ul>
            {patients.length ? (
              patients.map((patient) => (
                <li key={patient.id}>
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
