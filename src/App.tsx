import { Routes, Route } from 'react-router-dom';
import Pages from './components/Pages';
import PageOne from './components/Pages/PageOne';
import PageTwo from './components/Pages/PageTwo';
import PageTwoPointFive from './components/Pages/PageTwoPointFive';

import './styles/App.css';
import './styles/Pages.css';
import { FormProvider, useForm } from 'react-hook-form';
import { useCallback } from 'react';
export const FORM_KEY = 'medicalData';
import { z } from 'zod';
import { schemaMap } from './lib/schema';
import { useLocation } from 'react-router-dom';
import PageThree from './components/Pages/PageThree';

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentSchema: z.ZodTypeAny = schemaMap[currentPath] ?? z.object({});

  const resolver = useCallback(
    // TODO how do make this not an 'any''
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (data: any) => {
      const result = await currentSchema.safeParseAsync(data);

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
    resolver
  });

  return (
    <div className="container">
      <div className="page-container" data-testid="page-container">
        <FormProvider {...formMethods}>
          <Routes>
            <Route path="/" element={<Pages />}>
              <Route index element={<PageOne />} />
              <Route path="/symptoms" element={<PageTwo />} />
              <Route path="/details" element={<PageTwoPointFive />} />
              <Route path="/other" element={<PageThree />} />
            </Route>
          </Routes>
        </FormProvider>
      </div>
    </div>
  );
}

export default App;
