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
    } as T)); // The as T tells that the result of the state update will be same type as the generic type T defined for the useForm hook. 
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  const validate = (requiredFields: (keyof T)[]) => {
    return requiredFields.filter((field) => !formData[field]);
  }; // This validate function takes an array of required field names (which are keys of the form data type T) and returns an array of any fields that are missing (i.e., have falsy values in the formData). This allows you to easily check for missing required fields before submitting the form.

  return {
    formData,
    setFormData,
    handleInputChange,
    resetForm,
    validate,
  }; // This custom hook provides a convenient way to manage form state, handle input changes, and reset the form to its initial state. It abstracts away the common logic associated with form handling, making it easier to implement forms in different components without duplicating code.
}