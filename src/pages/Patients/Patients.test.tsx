import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PatientsPage from './Patients';
import PatientsService from '../../services/requests';
import { AxiosResponse } from 'axios';
import { LIST_PATIENTS_RESPONSE_MOCK } from '../../testUtils/Mocks/patients';

type RenderComponentParams = {
  isEmptyResponse?: boolean;
};

const renderComponent = ({
  isEmptyResponse = false,
}: RenderComponentParams) => {
  jest.spyOn(PatientsService, 'fetchPatientsRequest').mockResolvedValue({
    data: isEmptyResponse ? [] : LIST_PATIENTS_RESPONSE_MOCK,
    status: 200,
  } as AxiosResponse);

  render(<PatientsPage />);
};

describe('Patients page', () => {
  it('should call PatientsService.fetchPatientsRequest() when page renders', async () => {
    renderComponent({});

    await waitFor(() => {
      expect(PatientsService.fetchPatientsRequest).toHaveBeenCalledTimes(1);
    });
  });

  it('should render correctly when there is no patients', async () => {
    renderComponent({ isEmptyResponse: true });

    await waitFor(() => {
      expect(screen.getByText('Sem usuários cadastrados')).toBeInTheDocument();
    });
  });

  it('should render correctly when there are patients', async () => {
    renderComponent({ isEmptyResponse: false });

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getAllByTestId('patient-list-item')).toHaveLength(
      LIST_PATIENTS_RESPONSE_MOCK.length
    );
  });

  it('should create a patient correctly', async () => {
    // adicionando um spy na requisição
    jest.spyOn(PatientsService, 'addPatientRequest').mockResolvedValue({
      data: null,
      status: 201,
    } as AxiosResponse);

    // renderizar o componente
    renderComponent({});

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // preencher os inputs
    userEvent.type(screen.getByPlaceholderText('Nome'), 'Samuel');

    userEvent.type(screen.getByPlaceholderText('Email'), 'samuel@teste.com');

    // clicar no botão de cadastrar
    userEvent.click(screen.getByTestId('submit-button'));

    // fazer os asserts vendo se chamou a api corretamente
    await waitFor(() => {
      expect(PatientsService.addPatientRequest).toHaveBeenCalledTimes(1);
      expect(PatientsService.addPatientRequest).toHaveBeenCalledWith({
        name: 'Samuel',
        email: 'samuel@teste.com',
      });
    });
  });

  it.todo('should delete a patient correctly');
  // verificar se o serviço foi chamado corretamente quando clicar no botão de apagar

  it.todo('should clear the form correctly');

  it.todo('should edit a patient correctly');
  // verificar se o serviço foi chamado corretamente
});
