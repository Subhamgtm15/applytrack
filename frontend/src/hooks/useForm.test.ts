import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useForm } from "./useForm";

type LoginForm = {
  email: string;
  password: string;
};

const initialState: LoginForm = { email: "", password: "" };

describe("useForm", () => {
  it("initializes with the provided state", () => {
    const { result } = renderHook(() => useForm(initialState));
    expect(result.current.formData).toEqual(initialState);
  });

  it("updates a field on input change", () => {
    const { result } = renderHook(() => useForm(initialState));

    act(() => {
      result.current.handleInputChange({
        target: { name: "email", value: "ada@example.com" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.formData.email).toBe("ada@example.com");
    expect(result.current.formData.password).toBe("");
  });

  it("resets the form back to its initial state", () => {
    const { result } = renderHook(() => useForm(initialState));

    act(() => {
      result.current.setFormData({ email: "a@b.com", password: "secret" });
    });
    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData).toEqual(initialState);
  });

  it("reports only the missing required fields", () => {
    const { result } = renderHook(() => useForm(initialState));

    act(() => {
      result.current.setFormData({ email: "ada@example.com", password: "" });
    });

    const missing = result.current.validate(["email", "password"]);
    expect(missing).toEqual(["password"]);
  });
});
