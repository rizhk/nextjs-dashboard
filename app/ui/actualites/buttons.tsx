import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { deleteActuality } from '@/app/lib/actions';

export function CreateActuality() {
  return (
    <Link
      href="/dashboard/actualites/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Actuality</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateActuality({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/actualites/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteActuality({ id }: { id: string }) {
  return (
    <>
      <form action={deleteActuality}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <input type="hidden" name="id" value={id} />
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}
