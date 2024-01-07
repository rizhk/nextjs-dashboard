'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateActualityObject, EditActualityObject } from './validation';
import { sendActualityRequest } from './api';

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
    await sendActualityRequest({ formData: formData, method: 'POST' });
  } catch (error) {
    console.error('fetch Error:', error);
    throw new Error((error as Error & { digest?: string }).digest);
  }
  revalidatePath('/dashboard/actualites');
  return redirect('/dashboard/actualites');
}
export async function deleteActuality(formData: FormData) {
  try {
    const id = new Number(formData.get('id'));

    await sendActualityRequest({ method: 'DELETE', id: id.toString() });
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
    const id = new Number(formData.get('id'));

    await sendActualityRequest({
      method: 'PUT',
      id: id.toString(),
      formData: formData,
    });
  } catch (error) {
    console.error('fetch Error:', error);
    throw new Error((error as Error).message);
  }

  revalidatePath('/dashboard/actualites');
  redirect('/dashboard/actualites');
}
