import Form from '@/app/ui/actualites/edit-form';
import Breadcrumbs from '@/app/ui/actualites/breadcrumbs';
import { fetchActualityById } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [actuality] = await Promise.all([
    fetchActualityById(id)
  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Actualites', href: '/dashboard/actualites' },
          {
            label: 'Edit Actuality',
            href: `/dashboard/actualites/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form actuality={actuality} />
    </main>
  );
}
