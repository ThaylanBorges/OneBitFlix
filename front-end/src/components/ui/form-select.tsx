"use client";
import { FieldValues } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BaseFieldProps, FormFieldWrapper } from "./form-field-wrapper";

export type SelectOption = {
  label: string;
  value: string | number;
};

type FormSelectProps<T extends FieldValues> = BaseFieldProps<T> & {
  options: SelectOption[];
  placeholder?: string;
  emptyMessage?: string;
};

export function FormSelect<T extends FieldValues>({
  options,
  placeholder = "Selecione...",
  emptyMessage = "Nenhuma opção disponível",
  ...props
}: FormSelectProps<T>) {
  const items = options.map((o) => ({
    label: o.label,
    value: String(o.value),
  }));

  return (
    <FormFieldWrapper {...props}>
      {(field, fieldState) => {
        const selectedValue = options.some(
          (o) => String(o.value) === String(field.value),
        )
          ? String(field.value)
          : null;

        return (
          <Select
            name={field.name}
            disabled={field.disabled}
            items={items}
            value={selectedValue}
            onValueChange={(selected) => {
              const option = options.find((o) => String(o.value) === selected);
              field.onChange(option?.value ?? null);
            }}
          >
            <SelectTrigger
              id={field.name}
              ref={field.ref}
              onBlur={field.onBlur}
              className="h-12 w-full text-base"
              aria-invalid={fieldState.invalid}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.length === 0 ? (
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                  {emptyMessage}
                </div>
              ) : (
                options.map((option) => (
                  <SelectItem key={option.value} value={String(option.value)}>
                    {option.label}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        );
      }}
    </FormFieldWrapper>
  );
}
