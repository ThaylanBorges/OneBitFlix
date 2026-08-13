type FormErrorProps = {
  message?: string;
};

export default function FormError({ message }: FormErrorProps) {
  if (!message) {
    return null;
  }

  return <p className="text-sm text-red-500 p-1">{message}</p>;
}
