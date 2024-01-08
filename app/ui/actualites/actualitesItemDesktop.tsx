// ActualiteItem.js
import Image from 'next/image';
import { UpdateActuality, DeleteActuality } from '@/app/ui/actualites/buttons';
import { formatDateToLocal } from '@/app/lib/utils';
import { Actuality } from '@/app/lib/definitions';

export default function ActualityItemDesktop({
  actuality,
}: {
  actuality: Actuality;
}) {
  return (
    <tr
      key={actuality.id}
      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
    >
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <p>{actuality.id}</p>
        </div>
      </td>
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          {actuality?.cover?.url !== undefined && actuality?.cover?.url && (
            <Image
              src={process.env.STRAPI_URL + actuality?.cover?.url}
              className="mr-2 rounded-full"
              width={100}
              height={100}
              alt={`${actuality.title}'s profile picture`}
            />
          )}
          <p>{actuality.title}</p>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">{actuality.content}</td>
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
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
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        {formatDateToLocal(actuality.startDate? actuality.startDate: '')} -{' '}
        {formatDateToLocal(actuality.endDate? actuality.endDate: '')}
      </td>

      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <UpdateActuality id={actuality.id ? actuality.id : ''} />
          <DeleteActuality id={actuality.id ? actuality.id : ''} />
        </div>
      </td>
    </tr>
  );
}
