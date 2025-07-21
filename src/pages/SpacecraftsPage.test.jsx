import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SpacecraftsPage from '../pages/SpacecraftsPage';
import { SpacecraftContext } from '../context/SpacecraftContext';

const mockCrafts = [
  { id: 'a', name: 'Alpha', capacity: 5, description: '', pictureUrl: '', currentLocation: 1 },
  { id: 'b', name: 'Beta', capacity: 3, description: '', pictureUrl: '', currentLocation: 2 },
];

describe('SpacecraftsPage', () => {
  test('renders list of spacecrafts and handles destroy', () => {
    const destroyMock = jest.fn();
    render(
      <SpacecraftContext.Provider value={{ spacecrafts: mockCrafts, loading: false, error: '', destroySpacecraft: destroyMock, clearError: jest.fn() }}>
        <MemoryRouter>
          <SpacecraftsPage />
        </MemoryRouter>
      </SpacecraftContext.Provider>
    );

    // names appear as links
    expect(screen.getByText(/Alpha/)).toBeInTheDocument();
    expect(screen.getByText(/Beta/)).toBeInTheDocument();

    // clicking Destroy calls context fn
    fireEvent.click(screen.getAllByRole('button', { name: /Destroy/i })[0]);
    expect(destroyMock).toHaveBeenCalledWith('a');
  });
});