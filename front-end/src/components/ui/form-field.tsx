"use client";
import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Field, FieldError, FieldLabel } from "./field";
import { Input } from "./input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group";

type FormFieldProsp<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  onChange?: (value: string) => void;
};

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type,
  onChange,
}: FormFieldProsp<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}

          {isPassword ? (
            <InputGroup className="h-12">
              <InputGroupInput
                {...field}
                id={field.name}
                type={showPassword ? "text" : "password"}
                className="text-base"
                placeholder={placeholder}
                onChange={(e) =>
                  onChange
                    ? field.onChange(onChange(e.target.value))
                    : field.onChange(e.target.value)
                }
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          ) : (
            <Input
              {...field}
              id={field.name}
              type={type}
              className="h-12 text-base w-full"
              placeholder={placeholder}
              onChange={(e) =>
                onChange
                  ? field.onChange(onChange(e.target.value))
                  : field.onChange(e.target.value)
              }
            />
          )}

          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
