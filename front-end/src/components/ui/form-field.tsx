import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./field";
import { Input } from "./input";

type FormFieldProsp<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
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
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input
            {...field}
            id={field.name}
            type={type}
            className="h-12 text-base"
            placeholder={placeholder}
            onChange={(e) =>
              onChange
                ? field.onChange(onChange(e.target.value))
                : field.onChange(e.target.value)
            }
          />
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
