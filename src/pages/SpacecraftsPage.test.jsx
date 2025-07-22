// src/pages/SpacecraftCard.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SpacecraftCard from './SpacecraftCard';
import SpaceTravelApi from '../services/SpaceTravelApi';

// Stub out react-router hooks
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: '1' }),
  };
});

// Simplify Loading component
jest.mock('../components/Loading', () => () => <div>Loading...</div>);

// Mock API service
jest.mock('../services/SpaceTravelApi', () => ({
  getSpacecrafts: jest.fn(),
}));

describe('SpacecraftCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows loading state initially', () => {
    // simulate a never-resolving promise to keep loading
    SpaceTravelApi.getSpacecrafts.mockReturnValue(new Promise(() => {}));
    render(<SpacecraftCard />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('displays error when API fails', async () => {
    SpaceTravelApi.getSpacecrafts.mockResolvedValue({ isError: true });
    render(<SpacecraftCard />);
    await waitFor(() => {
      expect(screen.getByText(/could not load spacecraft/i)).toBeInTheDocument();
    });
  });

  test('displays not found when ID is missing', async () => {
    SpaceTravelApi.getSpacecrafts.mockResolvedValue({ isError: false, data: [{ id: '2', name: 'Other' }] });
    render(<SpacecraftCard />);
    await waitFor(() => {
      expect(screen.getByText(/spacecraft not found/i)).toBeInTheDocument();
    });
  });

  test('renders spacecraft details and back button correctly', async () => {
    const craft = {
      id: '1',
      name: 'Apollo',
      capacity: 3,
      description: 'Test ship',
      pictureUrl: 'http://example.com/apollo.jpg',
    };
    SpaceTravelApi.getSpacecrafts.mockResolvedValue({ isError: false, data: [craft] });

    render(<SpacecraftCard />);

    // wait for the heading to appear
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /apollo/i })).toBeInTheDocument();
    });

    // image
    const img = screen.getByRole('img', { name: /apollo/i });
    expect(img).toHaveAttribute('src', craft.pictureUrl);

    // capacity label and number
    const capacityLabel = screen.getByText(/capacity:/i);
    expect(capacityLabel).toBeInTheDocument();
    // the number is included in the same container
    expect(capacityLabel.parentElement).toHaveTextContent(/3/);

    // description text
    expect(screen.getByText(/test ship/i)).toBeInTheDocument();

    // back button navigation
    fireEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
