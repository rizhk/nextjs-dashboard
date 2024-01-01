import Form from '@/app/ui/actualites/create-form';
import Breadcrumbs from '@/app/ui/actualites/breadcrumbs';

export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Actualites', href: '/dashboard/actualites' },
          {
            label: 'Create Actuality',
            href: '/dashboard/actualites/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
