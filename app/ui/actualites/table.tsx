import Image from 'next/image';
import { UpdateActuality, DeleteActuality } from '@/app/ui/actualites/buttons';
import InvoiceStatus from '@/app/ui/actualites/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredActualites } from '@/app/lib/data';

export default async function ActualitesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const actualites = await fetchFilteredActualites(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {actualites?.map((actuality: any) => (
              <div
                key={actuality.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{process.env.STRAPI_URL + actuality?.document?.url}</p>
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
                        )
                      }
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
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  ID
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Content
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Document
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Dates
                </th>
                {/* <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th> */}
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {actualites?.map((actuality: any) => (
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
                    {actuality?.cover?.url !== undefined &&
                        actuality?.cover?.url && (
                          <Image
                            src={
                              process.env.STRAPI_URL + actuality?.cover?.url
                            }
                            className="mr-2 rounded-full"
                            width={100}
                            height={100}
                            alt={`${actuality.title}'s profile picture`}
                          />
                        )
                      }
                      <p>{actuality.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {actuality.content}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
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
                        )
                      }
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(actuality.startDate)} -{' '}
                    {formatDateToLocal(actuality.endDate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* <InvoiceStatus status={actuality.status} /> */}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateActuality id={actuality.id} />
                      <DeleteActuality id={actuality.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
