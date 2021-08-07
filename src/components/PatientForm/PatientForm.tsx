import React from 'react';

type PatientFormProps = {
  handleFormSubmit: (event: React.FormEvent) => void;
  handleInputChange: (event: React.FormEvent<HTMLInputElement>) => void;
  handleFormClear: () => void;
  isEdit: boolean;
  form: {
    name: string;
    email: string;
  };
  isFormInvalid: boolean;
};

export default function PatientForm({
  handleFormSubmit,
  handleInputChange,
  handleFormClear,
  form,
  isEdit,
  isFormInvalid,
}: PatientFormProps) {
  return (
    <form onSubmit={handleFormSubmit}>
      <h4 data-testid='form-title'>{isEdit ? 'Editar' : 'Cadastrar'}</h4>
      <input
        data-testid='name-input'
        type='text'
        placeholder='Nome'
        name='name'
        value={form.name}
        onChange={handleInputChange}
      />
      <input
        data-testid='email-input'
        type='text'
        placeholder='Email'
        name='email'
        value={form.email}
        onChange={handleInputChange}
      />

      <div>
        <button
          type='button'
          onClick={handleFormClear}
          data-testid='clear-form-button'
        >
          Limpar formulário
        </button>
        <button
          type='submit'
          disabled={isFormInvalid}
          data-testid='submit-button'
          title={isFormInvalid ? 'Preencha os campos corretamente' : ''}
        >
          {isEdit ? 'Editar' : 'Cadastrar'}
        </button>
      </div>
    </form>
  );
}
