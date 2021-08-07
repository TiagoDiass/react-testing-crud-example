import PatientForm from './PatientForm';
import { render, screen } from '@testing-library/react';

type RenderComponentParams = {
  isEdit: boolean;
  isFormInvalid?: boolean;
};

const renderComponent = ({
  isEdit,
  isFormInvalid = false,
}: RenderComponentParams) => {
  render(
    <PatientForm
      handleFormSubmit={() => {}}
      handleInputChange={() => {}}
      handleFormClear={() => {}}
      form={{ name: 'fake-name', email: 'fake-email' }}
      isEdit={isEdit}
      isFormInvalid={isFormInvalid}
    />
  );
};

describe('xxxx', () => {
  it('should render correctly if form is creating an user', () => {
    renderComponent({ isEdit: false });

    expect(screen.getByTestId('form-title')).toHaveTextContent('Cadastrar');
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Cadastrar');
    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Limpar formulário' })
    ).toBeInTheDocument();
  });

  it('should render correctly if form is editing an user', () => {
    renderComponent({ isEdit: true });

    expect(screen.getByTestId('form-title')).toHaveTextContent('Editar');
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Editar');
    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Limpar formulário' })
    ).toBeInTheDocument();
  });

  it('should disable the submit button if isFormInvalid is true', () => {
    renderComponent({ isFormInvalid: true, isEdit: false });

    expect(screen.getByTestId('submit-button')).toBeDisabled();
    expect(screen.getByTestId('submit-button')).toHaveAttribute(
      'title',
      'Preencha os campos corretamente'
    );
  });
});
