import { render, RenderResult } from '@testing-library/react';
import { PatientsStore } from '../../PatientsStore';
import Patients from './Patients';

type SutTypes = {
  sut: RenderResult;
  patientsStoreSpy: PatientsStoreSpy;
};

/**
 * @factory que retorna o SUT(system under test, que nesse caso é o componente da página Patients) e o que for necessário para rodar os testes
 */
const makeSut = (): SutTypes => {
  const patientsStoreSpy = new PatientsStoreSpy();
  const sut = render(<Patients patientsStore={patientsStoreSpy} />);

  return {
    sut,
    patientsStoreSpy,
  };
};

class PatientsStoreSpy extends PatientsStore {
  callsCount = 0;

  loadPatients = () => {
    this.callsCount++;

    return Promise.resolve({
      status: 200,
      message: 'fake',
    });
  };
}

describe('Patients Page', () => {
  it('should start with initial state', () => {
    // Pegando o componente que a RTL renderizou para poder fazer os testes
    const { sut } = makeSut();

    // Obtendo os inputs do formulário e o botão de submit
    const nameInput = sut.getByTestId('name-input') as HTMLInputElement;
    const emailInput = sut.getByTestId('email-input') as HTMLInputElement;
    const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement;

    // Testando os valores dos inputs e se o botão inicia desabilitado
    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(submitButton.disabled).toBe(true);
    expect(submitButton.title).toBe('Preencha os campos corretamente');
  });

  it('should call loadPatients on page render', () => {
    const { patientsStoreSpy } = makeSut();
    expect(patientsStoreSpy.callsCount).toBe(1);
  });
});
