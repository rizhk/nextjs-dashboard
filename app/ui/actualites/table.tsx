import Image from 'next/image';
import { UpdateActuality, DeleteActuality } from '@/app/ui/actualites/buttons';
import InvoiceStatus from '@/app/ui/actualites/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredActualites } from '@/app/lib/data';
import ActualityItemDesktop from './actualitesItemDesktop';
import ActualityItemMobile from './actualitesItemMobile';

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
              <ActualityItemMobile key={actuality.id} actuality={actuality} />
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
                <ActualityItemDesktop
                  key={actuality.id}
                  actuality={actuality}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
