import { useForm, FormProvider } from 'react-hook-form';
import { Outlet, useLocation } from 'react-router-dom';
import { schemaMap } from '../lib/schema';
import { useCallback } from 'react';
import { z } from 'zod';

const Page = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentSchema: z.ZodTypeAny = schemaMap[currentPath] ?? z.object({});

  const resolver = useCallback(
    // TODO how do make this not an 'any''
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (data: any) => {
      const result = await currentSchema.safeParseAsync(data);

      // console.log('🚀 ~ result.:', result);
      return {
        values: result.success ? result.data : {},
        errors: result.success
          ? {}
          : Object.entries(result.error.flatten().fieldErrors).reduce(
              (allErrors, [key, messages]) => {
                return {
                  ...allErrors,
                  [key]: {
                    type: 'manual',
                    message: messages?.[0] ?? 'Invalid Input'
                  }
                };
              }
            )
      };
    },
    [currentSchema]
  );

  const formMethods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver //: zodResolver(combinedRefinedSchema)
  });

  return (
    <FormProvider {...formMethods}>
      <Outlet />
    </FormProvider>
  );
};

export default Page;
