export type LoginFormProps = Readonly<{
  onSuccess?: () => void;
  onError?: (message: string) => void;
}>;
