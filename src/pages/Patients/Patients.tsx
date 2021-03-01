import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Patient, PatientForm, PatientsStore } from '../../PatientsStore';

import { Container, Header, Main } from './styles';

type Props = {
  patientsStore: PatientsStore;
};

const Patients: React.FC<Props> = ({ patientsStore }) => {
  const {
    patients,
    loading,
    loadPatients,
    addPatient,
    editPatient,
    deletePatient,
  } = patientsStore;

  const [form, setForm] = useState<PatientForm>({
    name: '',
    email: '',
  });

  const [isEdit, setIsEdit] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(0);

  useEffect(() => {
    async function init() {
      const response = await loadPatients();

      if (response.status === 200) {
        console.log(response);
      }
    }

    init();
  }, [loadPatients]);

  const handleFormClear = () => {
    setForm({
      name: '',
      email: '',
    });

    setIsEdit(false);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isEdit) {
      const response = await editPatient(currentEditId, form);
      console.log(response);
      setForm({
        name: '',
        email: '',
      });

      setIsEdit(false);
    } else {
      const response = await addPatient(form);
      console.log(response);
    }
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

  const handleDeleteClick = async (id: number) => {
    const response = await deletePatient(id);
    console.log(response);
  };

  return (
    <Container>
      <Header>
        <h1>React + Mobx + TypeScript CRUD</h1>
      </Header>
      <Main>
        <form onSubmit={handleFormSubmit}>
          <h4>{isEdit ? 'Editar' : 'Cadastrar'}</h4>
          <input
            type='text'
            placeholder='Nome'
            name='name'
            value={form.name}
            onChange={handleInputChange}
          />
          <input
            type='text'
            placeholder='Email'
            name='email'
            value={form.email}
            onChange={handleInputChange}
          />
          <div>
            <button onClick={handleFormClear}>Limpar formulário</button>
            <button type='submit'>{isEdit ? 'Editar' : 'Cadastrar'}</button>
          </div>
        </form>

        {loading ? (
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
                    <button onClick={() => handleDeleteClick(patient.id)}>
                      Apagar
                    </button>
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
