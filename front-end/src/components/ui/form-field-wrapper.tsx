"use client";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";

export type BaseFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
};

type WrapperProps<T extends FieldValues> = BaseFieldProps<T> & {
  orientation?: "vertical" | "horizontal";
  children: (
    field: ControllerRenderProps<T, Path<T>>,
    fieldState: ControllerFieldState,
  ) => React.ReactNode;
};

export function FormFieldWrapper<T extends FieldValues>({
  control,
  name,
  label,
  orientation = "vertical",
  children,
}: WrapperProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field orientation={orientation} data-invalid={fieldState.invalid}>
          {orientation === "vertical" && label && (
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          )}
          {children(field, fieldState)}
          {orientation === "horizontal" && label && (
            <FieldLabel htmlFor={field.name} className="font-normal">
              {label}
            </FieldLabel>
          )}
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
