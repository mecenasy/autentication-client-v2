import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  register?: UseFormRegister<any>;
  error?: FieldError;
}

export default function Input({ id, label, register, error, ...rest }: InputProps) {
  const registerProps = register ? { ...register(id) } : {};

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-white text-sm font-bold mb-2">
        {label}
      </label>
      <input
        id={id}
        className="w-full h-10 px-3 bg-white border border-gray-600 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...registerProps}
        {...rest}
      />
      {error && <p className="text-red-500 text-xs italic mt-2">{error.message}</p>}
    </div>
  );
}
