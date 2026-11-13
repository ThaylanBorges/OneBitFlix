"use client";
import { FieldValues } from "react-hook-form";
import { Input } from "../ui/input";
import { BaseFieldProps, FormFieldWrapper } from "./form-field-wrapper";

type FormInputProps<T extends FieldValues> = BaseFieldProps<T> & {
  type?: "text" | "email" | "number" | "tel" | "url" | "date";
  placeholder?: string;
  parse?: (value: string) => unknown;
};

export function FormInput<T extends FieldValues>({
  type = "text",
  placeholder,
  parse,
  ...props
}: FormInputProps<T>) {
  const parseValue = (value: string) => {
    if (parse) return parse(value);
    if (type === "number") return value === "" ? undefined : Number(value);
    return value;
  };

  return (
    <FormFieldWrapper {...props}>
      {(field, fieldState) => (
        <Input
          {...field}
          value={field.value ?? ""}
          id={field.name}
          type={type}
          placeholder={placeholder}
          className="h-12 text-base w-full"
          aria-invalid={fieldState.invalid}
          onChange={(e) => field.onChange(parseValue(e.target.value))}
        />
      )}
    </FormFieldWrapper>
  );
}
