import Form from '@/app/ui/actualites/form';
import Breadcrumbs from '@/app/ui/actualites/breadcrumbs';
import { fetchActualityById } from '@/app/lib/data';
import { editActuality } from '@/app/lib/actions';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [actuality] = await Promise.all([fetchActualityById(id)]);

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
      <Form initialValues={actuality} onSubmit={editActuality} buttonLabel ="Edit Actuality" />
    </main>
  );
}
