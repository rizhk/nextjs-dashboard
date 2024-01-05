'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FileSchema = z
  .unknown()
  .refine((value) => value instanceof File && value.size > 0, {
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
  cover: FileSchema,
  document: FileSchema,
  startDate: z
    .string()
    .refine((value) => value.trim() !== '', {
      message: 'Cannot be empty or whitespace only',
    }), // or use z.date() if you're working with Date objects
  endDate: z
    .string()
    .refine((value) => value.trim() !== '', {
      message: 'Cannot be empty or whitespace only',
    }), // or use z.date() if you're working with Date objects
});
const CreateActualityObject = FormSchema.omit({ id: true });
const EditActualityObject = FormSchema;

export async function createActuality(formData: FormData) {
  const result = CreateActualityObject.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    cover: formData.getAll('cover')[0], // get the File instance
    document: formData.getAll('document')[0], // get the File instance
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
  });

  if (result.success) {
    console.log(result.data); // parsed data
  } else {
    throw new Error(result.error.message); // ZodError
  }

  try {
    const response = await fetch(
      process.env.STRAPI_URL + '/api/community-app/actualities',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        },
        body: formData,
      },
    );
  } catch (error) {
    console.error('fetch Error:', error);
    throw new Error((error as Error & { digest?: string }).digest);
  }
  revalidatePath('/dashboard/actualites');
  return redirect('/dashboard/actualites');
}
export async function deleteActuality(formData: FormData) {
  try {
    const id = formData.get('id');

    const response = await fetch(
      process.env.STRAPI_URL + '/api/community-app/actualities/' + id,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        },
      },
    );
  } catch (error) {
    console.error('fetch Error:', error);
    throw new Error((error as Error).message);
  }

  revalidatePath('/dashboard/actualites');
  redirect('/dashboard/actualites');
}

export async function editActuality(formData: FormData) {
  const result = EditActualityObject.safeParse({
    id: formData.get('id'),
    title: formData.get('title'),
    content: formData.get('content'),
    cover: formData.getAll('cover')[0], // get the File instance
    document: formData.getAll('document')[0], // get the File instance
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
  });

  if (result.success) {
    console.log(result.data); // parsed data
  } else {
    throw new Error(result.error.message); // ZodError
  }

  try {
    const id = formData.get('id');

    const response = await fetch(
      process.env.STRAPI_URL + '/api/community-app/actualities/' + id,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        },
        body: formData,
      },
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('fetch Error:', error);
    throw new Error((error as Error).message);
  }

  revalidatePath('/dashboard/actualites');
  redirect('/dashboard/actualites');
}
