"use client";
import { FieldValues } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { BaseFieldProps, FormFieldWrapper } from "./form-field-wrapper";

export function FormCheckbox<T extends FieldValues>(props: BaseFieldProps<T>) {
  return (
    <FormFieldWrapper {...props} orientation="horizontal">
      {(field, fieldState) => (
        <Checkbox
          id={field.name}
          ref={field.ref}
          checked={!!field.value}
          onCheckedChange={(c) => field.onChange(c === true)}
          onBlur={field.onBlur}
          disabled={field.disabled}
          aria-invalid={fieldState.invalid}
        />
      )}
    </FormFieldWrapper>
  );
}
