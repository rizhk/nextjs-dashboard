// api.ts

import { methodType } from './definitions';

export async function sendActualityRequest({
  formData,
  method,
  id,
}: {
  formData?: FormData;
  method: methodType;
  id?: string;
}) {
  const fetchOptions: RequestInit = {
    method: method,
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
    },
  };

  if (formData) {
    fetchOptions.body = formData;
  }
  let url = `${process.env.STRAPI_URL}/api/community-app/actualities`;

  if (id) {
    url += `/${id}`;
  }

  return await fetch(
    url,
    fetchOptions,
  );
}
