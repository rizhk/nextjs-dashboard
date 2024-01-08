import Form from '@/app/ui/actualites/form';
import Breadcrumbs from '@/app/ui/actualites/breadcrumbs';
import { createActuality } from '@/app/lib/actions';

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
      <Form
        initialValues={{ title: '', content: '', startDate: '', endDate: '' }}
        onSubmit={createActuality}
        buttonLabel="Create Actuality"
      />
    </main>
  );
}
