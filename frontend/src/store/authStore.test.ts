import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("../services/api", () => ({
  fetchCurrentUser: vi.fn(),
}));

import { useAuthStore } from "./authStore";
import { fetchCurrentUser } from "../services/api";

const mockUser = {
  fullName: "Ada Lovelace",
  email: "ada@example.com",
  currentPosition: "Engineer",
  targetPosition: "Senior Engineer",
  linkedin: "https://linkedin.com/in/ada",
};

describe("authStore", () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, loading: true });
    vi.clearAllMocks();
  });

  it("setUser stores the user", () => {
    useAuthStore.getState().setUser(mockUser);
    expect(useAuthStore.getState().user).toEqual(mockUser);
  });

  it("clearUser resets the user to null", () => {
    useAuthStore.setState({ user: mockUser });
    useAuthStore.getState().clearUser();
    expect(useAuthStore.getState().user).toBeNull();
  });

  it("initAuth hydrates the user and clears loading on success", async () => {
    vi.mocked(fetchCurrentUser).mockResolvedValue({ user: mockUser });

    await useAuthStore.getState().initAuth();

    expect(useAuthStore.getState().user).toEqual(mockUser);
    expect(useAuthStore.getState().loading).toBe(false);
  });

  it("initAuth leaves user null and clears loading on failure", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(fetchCurrentUser).mockRejectedValue(new Error("401"));

    await useAuthStore.getState().initAuth();

    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().loading).toBe(false);
    consoleSpy.mockRestore();
  });
});
