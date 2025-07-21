import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SpacecraftCard from '../pages/SpacecraftCard';
import SpaceTravelApi from '../services/SpaceTravelApi';

jest.mock('../services/SpaceTravelApi');

describe('SpacecraftCard', () => {
  beforeEach(() => {
    SpaceTravelApi.getSpacecrafts.mockResolvedValue({ isError: false, data: [
      { id: 'x', name: 'X Wing', capacity: 1, description: 'Starfighter', pictureUrl: 'url' }
    ]});
  });

  test('fetches and displays spacecraft details', async () => {
    render(
      <MemoryRouter initialEntries={['/spacecrafts/x']}>
        <Routes>
          <Route path="/spacecrafts/:id" element={<SpacecraftCard />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/X Wing/)).toBeInTheDocument();
    expect(screen.getByText(/Starfighter/)).toBeInTheDocument();
    expect(screen.getByText(/Capacity:/)).toHaveTextContent('Capacity: 1');
  });
});
