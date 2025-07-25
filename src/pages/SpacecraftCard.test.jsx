/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SpaceTravelApi from "../services/SpaceTravelApi";
import { SpacecraftProvider } from "../context/SpacecraftContext";
import SpacecraftCard from "./SpacecraftCard";

// Simplify Loading
jest.mock("../components/Loading", () => () => <div>Loading…</div>);

// Mock the default export
jest.mock("../services/SpaceTravelApi", () => ({
  __esModule: true,
  default: {
    getSpacecrafts: jest.fn(),
    getPlanets:    jest.fn(),
    sendSpacecraftToPlanet: jest.fn(),
    destroySpacecraftById:  jest.fn(),
  },
}));

// Stub out router hooks
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams:   () => ({ id: "1" }),
  };
});

describe("SpacecraftCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading state initially", () => {
    // never resolves so loading remains true
    SpaceTravelApi.getSpacecrafts.mockReturnValue(new Promise(() => {}));

    render(
      <MemoryRouter>
        <SpacecraftProvider>
          <SpacecraftCard />
        </SpacecraftProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("displays error when API fails", async () => {
    SpaceTravelApi.getSpacecrafts.mockResolvedValue({ isError: true });

    render(
      <MemoryRouter>
        <SpacecraftProvider>
          <SpacecraftCard />
        </SpacecraftProvider>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/could not load spacecraft/i)).toBeInTheDocument()
    );
  });

  test("displays not found when ID is missing", async () => {
    SpaceTravelApi.getSpacecrafts.mockResolvedValue({
      isError: false,
      data: [{ id: "2", name: "Other" }],
    });

    render(
      <MemoryRouter>
        <SpacecraftProvider>
          <SpacecraftCard />
        </SpacecraftProvider>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/spacecraft not found/i)).toBeInTheDocument()
    );
  });

  test("renders spacecraft details and back button correctly", async () => {
    const craft = {
      id: "1",
      name: "Apollo",
      capacity: 3,
      description: "Test ship",
      pictureUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Orion_Service_Module.jpg/800px-Orion_Service_Module.jpg",
    };

    SpaceTravelApi.getSpacecrafts.mockResolvedValue({
      isError: false,
      data: [craft],
    });

    render(
      <MemoryRouter>
        <SpacecraftProvider>
          <SpacecraftCard />
        </SpacecraftProvider>
      </MemoryRouter>
    );

    // wait for data
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: /apollo/i })).toBeInTheDocument()
    );

    // back button
    fireEvent.click(screen.getByRole("button", { name: /back/i }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});



