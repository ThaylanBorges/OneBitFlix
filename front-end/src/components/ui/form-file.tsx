"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { FileIcon, ImageUp, X } from "lucide-react";
import { cn } from "cn";
import { BaseFieldProps, FormFieldWrapper } from "./form-field-wrapper";

type FormFileProps<T extends FieldValues> = BaseFieldProps<T> & {
  accept?: string;
  multiple?: boolean;
  hint?: string;
};

export function FormFile<T extends FieldValues>({
  accept,
  multiple = false,
  hint,
  ...props
}: FormFileProps<T>) {
  return (
    <FormFieldWrapper {...props}>
      {(field, fieldState) => (
        <FileInput
          field={field}
          fieldState={fieldState}
          accept={accept}
          multiple={multiple}
          hint={hint}
        />
      )}
    </FormFieldWrapper>
  );
}

type FileInputProps<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>;
  fieldState: ControllerFieldState;
  accept?: string;
  multiple: boolean;
  hint?: string;
};

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function matchesAccept(file: File, accept?: string) {
  if (!accept) return true;
  return accept.split(",").some((rule) => {
    const r = rule.trim().toLowerCase();
    if (r.startsWith(".")) return file.name.toLowerCase().endsWith(r);
    if (r.endsWith("/*")) return file.type.startsWith(r.slice(0, -1));
    return file.type === r;
  });
}

function FileInput<T extends FieldValues>({
  field,
  fieldState,
  accept,
  multiple,
  hint,
}: FileInputProps<T>) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const files: File[] = useMemo(() => {
    if (!field.value) return [];
    return Array.isArray(field.value) ? field.value : [field.value];
  }, [field.value]);

  const previews = useMemo(
    () =>
      files.map((f) =>
        f.type.startsWith("image/") ? URL.createObjectURL(f) : null,
      ),
    [files],
  );
  useEffect(
    () => () => previews.forEach((url) => url && URL.revokeObjectURL(url)),
    [previews],
  );

  const setFiles = (incoming: File[]) => {
    const valid = incoming.filter((f) => matchesAccept(f, accept));
    if (valid.length === 0) return;
    if (multiple) {
      const merged = [...files];
      valid.forEach((f) => {
        if (!merged.some((m) => m.name === f.name && m.size === f.size))
          merged.push(f);
      });
      field.onChange(merged);
    } else {
      field.onChange(valid[0]);
    }
  };

  const removeFile = (index: number) => {
    if (multiple) {
      const next = files.filter((_, i) => i !== index);
      field.onChange(next.length ? next : []);
    } else {
      field.onChange(undefined);
    }
  };

  const showDropzone = multiple || files.length === 0;

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={inputRef}
        id={`${field.name}-input`}
        name={field.name}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={field.disabled}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          setFiles(Array.from(e.target.files ?? []));
          e.target.value = "";
        }}
      />

      {showDropzone && (
        <button
          type="button"
          id={field.name}
          ref={field.ref}
          disabled={field.disabled}
          aria-invalid={fieldState.invalid}
          onBlur={field.onBlur}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            setFiles(Array.from(e.dataTransfer.files));
          }}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-input bg-input/20 px-4 py-8 text-center transition-colors outline-none",
            "hover:border-primary/60 hover:bg-primary/5 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            "disabled:pointer-events-none disabled:opacity-50",
            dragging && "border-primary bg-primary/10",
            fieldState.invalid && "border-destructive",
          )}
        >
          <span
            className={cn(
              "flex size-11 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition-colors",
              dragging ? "text-primary" : "text-white/70",
            )}
          >
            <ImageUp className="size-5" />
          </span>
          <span className="text-sm">
            <span className="font-medium text-primary">Clique para enviar</span>{" "}
            <span className="text-muted-foreground">ou arraste aqui</span>
          </span>
          {hint && (
            <span className="text-xs text-muted-foreground">{hint}</span>
          )}
        </button>
      )}

      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${file.size}`}
              className="flex items-center gap-3 rounded-lg bg-card p-2 pr-3 ring-1 ring-white/10"
            >
              {previews[i] ? (
                <img
                  src={previews[i]!}
                  alt=""
                  className="size-14 shrink-0 rounded-md object-cover ring-1 ring-white/10"
                />
              ) : (
                <span className="flex size-14 shrink-0 items-center justify-center rounded-md bg-white/5 text-white/60">
                  <FileIcon className="size-5" />
                </span>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatSize(file.size)}
                </p>
              </div>

              {!multiple && (
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  disabled={field.disabled}
                  className="rounded-md px-2 py-1 text-xs font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Trocar
                </button>
              )}
              <button
                type="button"
                onClick={() => removeFile(i)}
                disabled={field.disabled}
                aria-label={`Remover ${file.name}`}
                className="flex size-8 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
