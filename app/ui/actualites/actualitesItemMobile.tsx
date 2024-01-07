// ActualiteItem.js
import Image from 'next/image';
import { UpdateActuality, DeleteActuality } from '@/app/ui/actualites/buttons';
import { formatDateToLocal } from '@/app/lib/utils';
import { Actuality } from '@/app/lib/definitions';

export default function ActualityItemMobile({ actuality }: { actuality: Actuality }) {
  return (
  <div
    key={actuality.id}
    className="mb-2 w-full rounded-md bg-white p-4"
  >
    <div className="flex items-center justify-between border-b pb-4">
      <div>
        <div className="mb-2 flex items-center">
          <p>{actuality?.document?.url}</p>
          {actuality?.document?.url !== undefined &&
            actuality?.document?.url && (
              <Image
                src={
                  process.env.STRAPI_URL + actuality?.document?.url
                }
                className="mr-2 rounded-full"
                width={100}
                height={100}
                alt={`${actuality.title}'s profile picture`}
              />
            )}
          <p>{actuality.title}</p>
        </div>
        <p className="text-sm text-gray-500">{actuality.content}</p>
      </div>
      {/* <InvoiceStatus status={actuality.type} /> */}
    </div>
    <div className="flex w-full items-center justify-between pt-4">
      <div>
        <p className="text-xl font-medium">{actuality.title}</p>
        <p>{actuality.startDate}</p>
        <p>{actuality.endDate}</p>
      </div>
      <div className="flex justify-end gap-2">
        <UpdateActuality id={actuality.id} />
        <DeleteActuality id={actuality.id} />
      </div>
    </div>
  </div>
  );
}
