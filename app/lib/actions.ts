'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createActuality(formData: FormData) {
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

    revalidatePath('/dashboard/actualites');
    redirect('/dashboard/actualites');
  } catch (error) {
    console.error('fetch Error:', error);
    return { message: (error as Error).message };
  }
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
    revalidatePath('/dashboard/actualites');
    redirect('/dashboard/actualites');
  } catch (error) {
    console.error('fetch Error:', error);
    return { message: (error as Error).message };
  }
}

export async function editActuality(formData: FormData) {
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

    revalidatePath('/dashboard/actualites');
    redirect('/dashboard/actualites');
  } catch (error) {
    console.error('fetch Error:', error);
    return { message: (error as Error).message };
  }
}
