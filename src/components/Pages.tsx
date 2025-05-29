import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { Outlet } from 'react-router-dom';
import PageOneSchema from '../lib/schema';

const Page = () => {
  const formMethods = useForm({
    mode: 'onChange',
    resolver: zodResolver(PageOneSchema)
  });

  return (
    <FormProvider {...formMethods}>
      <Outlet />
    </FormProvider>
  );
};

export default Page;
