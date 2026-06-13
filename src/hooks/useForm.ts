import { useState } from "react";

export function useForm<T>(initialState: T) {
  const [formData, setFormData] = useState<T>(initialState); //this T and intial state respecitvely represents any type of form data we want to manage, making this hook reusable for different forms across the application. By passing the initial state as an argument, we can easily reset the form to its original state when needed.

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }as T)); // Type assertion to ensure TypeScript understands the type of the updated formData
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    resetForm,
  }; // This custom hook provides a convenient way to manage form state, handle input changes, and reset the form to its initial state. It abstracts away the common logic associated with form handling, making it easier to implement forms in different components without duplicating code.
}