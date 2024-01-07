// validation.ts
import { z } from 'zod';

const FileSchema = z
  .unknown()
  .refine((value) => value instanceof File && (value as File).size > 0, {
    message: 'File is required',
  });

const FormSchema = z.object({
  id: z
    .string()
    .refine((value) => value.trim() !== '', {
      message: 'Cannot be empty or whitespace only',
    }),
  title: z
    .string()
    .refine((value) => value.trim() !== '', {
      message: 'Cannot be empty or whitespace only',
    }),
  content: z
    .string()
    .refine((value) => value.trim() !== '', {
      message: 'Cannot be empty or whitespace only',
    }),
  startDate: z
    .string()
    .refine((value) => value.trim() !== '', {
      message: 'Cannot be empty or whitespace only',
    }),
  endDate: z
    .string()
    .refine((value) => value.trim() !== '', {
      message: 'Cannot be empty or whitespace only',
    }),
});

export const CreateActualityObject = FormSchema.omit({ id: true });
export const EditActualityObject = FormSchema;
