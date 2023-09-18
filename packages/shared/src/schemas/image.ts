import { z } from 'zod';

const MB_BYTES = 1000000; // Number of bytes in a megabyte.

// This is the list of mime types you will accept with the schema
const ACCEPTED_MIME_TYPES = ['image/gif', 'image/jpeg', 'image/png'];

// This is a file validation with a few extra checks in the `superRefine`.
// The `refine` method could also be used, but `superRefine` offers better
// control over when the errors are added and can include specific information
// about the value being parsed.
export const imageSchema = z.instanceof(File).superRefine((f, ctx) => {
  // First, add an issue if the mime type is wrong.
  if (!ACCEPTED_MIME_TYPES.includes(f.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `File must be one of [${ACCEPTED_MIME_TYPES.join(', ')}] but was ${f.type}`
    });
  }
  // Next add an issue if the file size is too large.
  if (f.size > 3 * MB_BYTES) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      type: 'array',
      message: `The file must not be larger than ${3 * MB_BYTES} bytes: ${f.size}`,
      maximum: 3 * MB_BYTES,
      inclusive: true
    });
  }
});
