// src/pages/BuildPage.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BuildPage from './BuildPage';
import SpaceTravelApi from '../services/SpaceTravelApi';

// Mock react-router's useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock SpacecraftContext hook
const mockSetSpacecrafts = jest.fn();
jest.mock('../context/SpacecraftContext', () => ({
  useSpacecrafts: () => ({ setSpacecrafts: mockSetSpacecrafts }),
}));

// Mock API service
jest.mock('../services/SpaceTravelApi', () => ({
  buildSpacecraft: jest.fn(),
  getSpacecrafts: jest.fn(),
}));

describe('BuildPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all form controls', () => {
    render(
      <MemoryRouter>
        <BuildPage />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/capacity/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose an image/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/paste a custom url/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /build spacecraft/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty form', async () => {
    render(
      <MemoryRouter>
        <BuildPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /build spacecraft/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/capacity must be a number/i)).toBeInTheDocument();
    expect(screen.getByText(/description is required/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('submits form and navigates on success', async () => {
    // Arrange: mock API responses
    SpaceTravelApi.buildSpacecraft.mockResolvedValue({ isError: false });
    SpaceTravelApi.getSpacecrafts.mockResolvedValue({ isError: false, data: [{ id: 1, name: 'Apollo' }] });

    render(
      <MemoryRouter>
        <BuildPage />
      </MemoryRouter>
    );

    // Fill text fields
    fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'Apollo' } });
    fireEvent.change(screen.getByPlaceholderText(/capacity/i), { target: { value: '3' } });
    fireEvent.change(screen.getByPlaceholderText(/description/i), { target: { value: 'Test ship' } });

    // Select image via select element
    const select = screen.getByLabelText(/choose an image/i);
    fireEvent.change(select, {
      target: {
        value:
          'https://upload.wikimedia.org/wikipedia/commons/0/07/SpaceX_Crew_Dragon.jpg',
      },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /build spacecraft/i }));

    // Assert: wait for async navigation and API calls
    await waitFor(() => {
      expect(SpaceTravelApi.buildSpacecraft).toHaveBeenCalledWith({
        name: 'Apollo',
        capacity: 3,
        description: 'Test ship',
        pictureUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/07/SpaceX_Crew_Dragon.jpg',
      });
      expect(SpaceTravelApi.getSpacecrafts).toHaveBeenCalled();
      expect(mockSetSpacecrafts).toHaveBeenCalledWith([{ id: 1, name: 'Apollo' }]);
      expect(mockNavigate).toHaveBeenCalledWith('/spacecrafts');
    });
  });

  test('back button navigates back one step', () => {
    render(
      <MemoryRouter>
        <BuildPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});


