"use client";
import { FieldValues } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { BaseFieldProps, FormFieldWrapper } from "./form-field-wrapper";

type FormTextareaProps<T extends FieldValues> = BaseFieldProps<T> & {
  placeholder?: string;
  rows?: number;
  resizable?: boolean;
};

export function FormTextarea<T extends FieldValues>({
  placeholder,
  rows = 4,
  resizable = false,
  ...props
}: FormTextareaProps<T>) {
  return (
    <FormFieldWrapper {...props}>
      {(field, fieldState) => (
        <Textarea
          {...field}
          value={field.value ?? ""}
          id={field.name}
          rows={rows}
          placeholder={placeholder}
          className={`text-base w-full ${resizable ? "" : "resize-none"}`}
          aria-invalid={fieldState.invalid}
        />
      )}
    </FormFieldWrapper>
  );
}
