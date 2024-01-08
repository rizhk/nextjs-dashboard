'use client';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useState } from 'react';

import { Actuality } from '@/app/lib/definitions';
import Image from 'next/image';

export default function Form({
  children,
  initialValues,
  onSubmit,
  buttonLabel,
}: {
  children?: React.ReactNode;
  initialValues: Actuality;
  onSubmit: (formData: FormData) => Promise<void>;
  buttonLabel: string;
}) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };


  return (
    <form action={onSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
      { 
        values?.id &&
          <input
            id="id"
            name="id"
            type="hidden"
            defaultValue={values?.id ? values.id : ''}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
        }
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                value={values.title}
                onChange={handleChange}
                placeholder="Title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Content
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="content"
                name="content"
                placeholder="Conent"
                value={values.content}
                onChange={handleChange}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="cover" className="mb-2 block text-sm font-medium">
          Cover
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            {initialValues?.cover?.url !== undefined &&
              process.env.NEXT_PUBLIC_STRAPI_URL !== undefined &&
              initialValues?.cover?.url && (
                <Image
                  src={
                    process.env.NEXT_PUBLIC_STRAPI_URL +
                    initialValues?.cover?.url
                  }
                  className="mr-2 rounded-full"
                  width={100}
                  height={100}
                  alt={`${initialValues.title}'s profile picture`}
                />
              )}

            <input
              id="cover"
              name="cover"
              type="file"
              placeholder="Enter Cover"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="mb-2 block text-sm font-medium">
          Document
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            {initialValues?.document?.url !== undefined &&
              process.env.NEXT_PUBLIC_STRAPI_URL !== undefined &&
              initialValues?.document?.url && (
                <Image
                  src={
                    process.env.NEXT_PUBLIC_STRAPI_URL +
                    initialValues?.document?.url
                  }
                  className="mr-2 rounded-full"
                  width={100}
                  height={100}
                  alt={`${initialValues.title}'s profile picture`}
                />
              )}

            <input
              id="document"
              name="document"
              type="file"
              placeholder="Enter Document"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="startDate" className="mb-2 block text-sm font-medium">
          Start Date
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="startDate"
              name="startDate"
              type="date"
              placeholder="Enter Start Date"
              value={values.startDate ? new Date(values.startDate).toISOString().slice(0, 10) : ''}
              onChange={handleChange}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="endDate" className="mb-2 block text-sm font-medium">
          End Date
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="endDate"
              name="endDate"
              type="date"
              placeholder="Enter End Date"
              value={values.endDate ? new Date(values.endDate).toISOString().slice(0, 10) : ''}
              onChange={handleChange}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>
      {children}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/actualites"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">
          {buttonLabel ? buttonLabel : 'Create Actuality'}
        </Button>
      </div>
    </form>
  );
}
