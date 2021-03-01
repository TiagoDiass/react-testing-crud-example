import { render, RenderResult } from '@testing-library/react';
import { PatientsStore } from '../../PatientsStore';
import Patients from './Patients';

type SutTypes = {
  sut: RenderResult;
  patientsStoreSpy: PatientsStoreSpy;
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

const makeSut = (): SutTypes => {
  const patientsStoreSpy = new PatientsStoreSpy();
  const sut = render(<Patients patientsStore={patientsStoreSpy} />);

  return {
    sut,
    patientsStoreSpy,
  };
};

describe('Patients Page', () => {
  it('should call loadPatients on page render', () => {
    const { sut, patientsStoreSpy } = makeSut();

    expect(patientsStoreSpy.callsCount).toBe(1);
  });
});
