"use client";
import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Field, FieldError, FieldLabel } from "./field";
import { Input } from "./input";
import { Checkbox } from "./checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group";
import { Textarea } from "./textarea";

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  rows?: number;
  onChange?: (value: string) => unknown;
};

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type,
  rows = 4,
  onChange,
}: FormFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const isCheckbox = type === "checkbox";
  const isTextarea = type === "textarea";

  const parseValue = (value: string) => {
    if (onChange) return onChange(value);
    if (type === "number") return value === "" ? undefined : Number(value);
    return value;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        if (isCheckbox) {
          return (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <Checkbox
                id={field.name}
                name={field.name}
                ref={field.ref}
                checked={!!field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                onBlur={field.onBlur}
                disabled={field.disabled}
                aria-invalid={fieldState.invalid}
              />
              {label && (
                <FieldLabel htmlFor={field.name} className="font-normal">
                  {label}
                </FieldLabel>
              )}
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }

        return (
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
                  onChange={(e) => field.onChange(parseValue(e.target.value))}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            ) : isTextarea ? (
              <Textarea
                {...field}
                value={field.value ?? ""}
                id={field.name}
                rows={rows}
                className="text-base w-full resize-none"
                placeholder={placeholder}
                onChange={(e) => field.onChange(parseValue(e.target.value))}
                aria-invalid={fieldState.invalid}
              />
            ) : (
              <Input
                {...field}
                value={field.value ?? ""}
                id={field.name}
                type={type}
                className="h-12 text-base w-full"
                placeholder={placeholder}
                onChange={(e) => field.onChange(parseValue(e.target.value))}
              />
            )}

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
