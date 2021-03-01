import React, { useEffect, useState } from "react";

import { Container, Header, Main } from "./styles";

const Patients: React.FC = ({}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(0);

  return (
    <Container>
      <Header>
        <h1>React + Redux + TypeScript CRUD</h1>
      </Header>
      <Main>
        <form onSubmit={() => {}}>
          <h4>{isEdit ? "Editar" : "Cadastrar"}</h4>
          <input type="text" placeholder="Nome" name="name" value={form.name} onChange={() => {}} />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={() => {}}
          />
          <div>
            <button onClick={() => {}}>Limpar formulário</button>
            <button type="submit">{isEdit ? "Editar" : "Cadastrar"}</button>
          </div>
        </form>

        {/* {loading ? (
          <h2 style={{ alignSelf: "center", marginTop: 12 }}>Carregando...</h2>
        ) : (
          <ul>
            {patients.length ? (
              patients.map((patient) => (
                <li key={patient.id}>
                  <span>ID: {patient.id}</span> <span>Nome: {patient.name}</span>{" "}
                  <span>Email: {patient.email}</span>
                  <div>
                    <button onClick={() => handleEditClick(patient)}>Editar</button>
                    <button onClick={() => handleDeleteClick(patient.id)}>Apagar</button>
                  </div>
                </li>
              ))
            ) : (
              <li>Sem usuários cadastrados</li>
            )}
          </ul>
        )} */}
      </Main>
    </Container>
  );
};

export default Patients;
