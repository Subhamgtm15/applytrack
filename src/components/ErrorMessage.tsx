type ErrorProps = {
  error?: string;
};

export function ErrorMessage({ error }: ErrorProps) {
  if (!error) return null;

  return (
    <p className="text-sm text-red-500 mt-1">
      {error}
    </p>
  );
} // This component takes an optional error prop and displays it in a styled paragraph if it exists. If there is no error, it returns null, meaning nothing will be rendered. You can use this component in your forms to show validation errors or any other error messages to the user in a consistent way.