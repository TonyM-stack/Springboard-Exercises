import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SpaceTravelApi from "../services/SpaceTravelApi";
import { SpacecraftProvider } from "../context/SpacecraftContext";
import SpacecraftsPage from "./SpacecraftsPage";

// mock API methods
jest.mock("../services/SpaceTravelApi", () => ({
  __esModule: true,
  default: {
    getPlanets:    jest.fn(),
    getSpacecrafts: jest.fn(),
    sendSpacecraftToPlanet: jest.fn(),
    destroySpacecraftById:  jest.fn(),
  },
}));

// stub Loading etc…

test("SpacecraftsPage shows list", async () => {
  SpaceTravelApi.getPlanets.mockResolvedValue({
    isError: false,
    data: [{ id: 0, name: "Earth", currentPopulation: 10 }],
  });
  SpaceTravelApi.getSpacecrafts.mockResolvedValue({
    isError: false,
    data: [{ id: "1", name: "Craft", currentLocation: 0 }],
  });

  render(
    <MemoryRouter>
      <SpacecraftProvider>
        <SpacecraftsPage />
      </SpacecraftProvider>
    </MemoryRouter>
  );

});


