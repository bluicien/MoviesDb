export type AppError = {
  message: string;
  fieldErrors?: Record<string, string>;
};