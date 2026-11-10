"use client";

import { useState, type ReactElement } from "react";
import { Loader2, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type ConfirmDeleteDialogProps = {
  title?: string;
  description: React.ReactNode;
  /** Retorne true para fechar o diálogo após a exclusão */
  onConfirm: () => Promise<boolean>;
  /** Elemento que abre o diálogo (modo não controlado) */
  trigger?: ReactElement;
  /** Modo controlado */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ConfirmDeleteDialog({
  title = "Excluir registro?",
  description,
  onConfirm,
  trigger,
  open: openProp,
  onOpenChange,
}: ConfirmDeleteDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const open = openProp ?? internalOpen;
  const setOpen = (value: boolean) => {
    if (pending) return;
    onOpenChange?.(value);
    if (openProp === undefined) setInternalOpen(value);
  };

  const handleConfirm = async () => {
    setPending(true);
    try {
      const shouldClose = await onConfirm();
      if (shouldClose) {
        onOpenChange?.(false);
        if (openProp === undefined) setInternalOpen(false);
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {trigger && <AlertDialogTrigger render={trigger} />}
      <AlertDialogContent>
        <div className="flex gap-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary ring-1 ring-primary/25">
            <Trash2 className="size-5" />
          </span>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogClose
            render={<Button variant="ghost" size="lg" disabled={pending} />}
          >
            Cancelar
          </AlertDialogClose>
          <Button size="lg" onClick={handleConfirm} disabled={pending}>
            {pending ? <Loader2 className="animate-spin" /> : <Trash2 />}
            {pending ? "Excluindo..." : "Excluir"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
