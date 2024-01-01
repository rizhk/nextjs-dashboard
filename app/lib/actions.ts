'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  cover: z.instanceof(File, { message: 'Cover is required' }),
  document: z.instanceof(File, { message: 'Document is required' }),
  startDate: z.string(),
  endDate: z.string(),
});
const CreateActualityObject = FormSchema.omit({ id: true });

export async function createActuality(formData: FormData) {
  const { title, content, cover, document, startDate, endDate } =
    CreateActualityObject.parse({
      title: formData.get('title'),
      content: formData.get('content'),
      cover: formData.get('cover'),
      document: formData.get('document'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
    });

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

  const data = await response.json();

  revalidatePath('/dashboard/actualites');
  redirect('/dashboard/actualites');
}
export async function deleteActuality(formData: FormData) {
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

  const data = await response.json();

  revalidatePath('/dashboard/actualites');
  redirect('/dashboard/actualites');
}

export async function editActuality(formData: FormData) {
  // const { title, content, cover, document, startDate, endDate } =
  //   CreateActualityObject.parse({
  //     title: formData.get('title'),
  //     content: formData.get('content'),
  //     cover: formData.get('cover'),
  //     document: formData.get('document'),
  //     startDate: formData.get('startDate'),
  //     endDate: formData.get('endDate'),
  //   });

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

  revalidatePath('/dashboard/actualites');
  redirect('/dashboard/actualites');
}
