import { z, ZodError } from "zod";

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
