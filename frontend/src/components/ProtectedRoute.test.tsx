import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useAuthStore } from "../store/authStore";

const mockUser = {
  fullName: "Ada Lovelace",
  email: "ada@example.com",
  currentPosition: "Engineer",
  targetPosition: "Senior Engineer",
  linkedin: "https://linkedin.com/in/ada",
};

function renderProtected() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div>Protected content</div>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<div>Login page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProtectedRoute", () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, loading: true });
  });

  it("shows a loading state while auth is resolving", () => {
    useAuthStore.setState({ user: null, loading: true });
    renderProtected();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("redirects to login when there is no user", () => {
    useAuthStore.setState({ user: null, loading: false });
    renderProtected();
    expect(screen.getByText("Login page")).toBeInTheDocument();
  });

  it("renders children when a user is authenticated", () => {
    useAuthStore.setState({ user: mockUser, loading: false });
    renderProtected();
    expect(screen.getByText("Protected content")).toBeInTheDocument();
  });
});
