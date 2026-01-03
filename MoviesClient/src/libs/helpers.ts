import { z, ZodError } from "zod";
import type { AppError } from "./errors";
import { AxiosError } from "axios";


export function extractZodFieldErrors(err: ZodError) {
  const tree = z.treeifyError(err);
  const fieldErrors: Record<string, string> = {};

  if ("properties" in tree && tree.properties) {
    for (const [field, detail] of Object.entries(tree.properties)) {
      if (detail && "errors" in detail && detail.errors.length > 0) {
        fieldErrors[field] = detail.errors[0];
      }
    }
  }

  return fieldErrors;
}

export function handleErrors(err: unknown, defaultMessage: string): never {
  if (err instanceof ZodError) {
    throw {
      message: defaultMessage,
      fieldErrors: extractZodFieldErrors(err),
    } as AppError;
  }

  if (err instanceof AxiosError) {
    const backendMessage =
      err.response?.data?.message || "Server error occurred";

    throw { message: backendMessage } as AppError;
  }

  throw { message: "Unexpected error occurred" } as AppError;
}