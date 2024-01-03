'use client';

import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import Image from 'next/image';
import { editActuality } from '@/app/lib/actions';

export default function EditActualityForm({ actuality }: { actuality: any }) {
  return (
    <form action={editActuality}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <input
          id="id"
          name="id"
          type="hidden"
          value={actuality.id}
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        />
        {/* Invoice Amount */}
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
                defaultValue={actuality.title}
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
                defaultValue={actuality.content}
                placeholder="Conent"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
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
            {actuality?.cover?.url !== undefined && actuality?.cover?.url && (
              <Image
                src={process.env.STRAPI_URL + actuality?.cover?.url}
                className="mr-2 rounded-full"
                width={100}
                height={100}
                alt={`${actuality.title}'s profile picture`}
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
          Content
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            {actuality?.document?.url !== undefined &&
              actuality?.document?.url && (
                <Image
                  src={process.env.STRAPI_URL + actuality?.document?.url}
                  className="mr-2 rounded-full"
                  width={100}
                  height={100}
                  alt={`${actuality.title}'s profile picture`}
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
              value={actuality.startDate}
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
              value={actuality.endDate}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/actualites"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Actuality</Button>
      </div>
    </form>
  );
}
