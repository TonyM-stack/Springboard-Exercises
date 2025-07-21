import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BuildPage from '../pages/BuildPage';
import SpaceTravelApi from '../services/SpaceTravelApi';

jest.mock('../services/SpaceTravelApi');

describe('BuildPage', () => {
  beforeEach(() => {
    SpaceTravelApi.buildSpacecraft.mockResolvedValue({ isError: false });
    SpaceTravelApi.getSpacecrafts.mockResolvedValue({ isError: false, data: [] });
  });

  test('renders form inputs and shows validation errors', async () => {
    render(
      <MemoryRouter>
        <BuildPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Build Spacecraft/i }));

    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Capacity must be a number/i)).toBeInTheDocument();
    expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <BuildPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'Apollo' } });
    fireEvent.change(screen.getByPlaceholderText(/Capacity/i), { target: { value: '10' } });
    fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'Moon mission' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'https://via.placeholder.com/150' } });

    fireEvent.click(screen.getByRole('button', { name: /Build Spacecraft/i }));

    await waitFor(() => expect(SpaceTravelApi.buildSpacecraft).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Apollo', capacity: 10, description: 'Moon mission', pictureUrl: 'https://via.placeholder.com/150' })
    ));
    expect(mockNavigate).toHaveBeenCalledWith('/spacecrafts');
  });

});