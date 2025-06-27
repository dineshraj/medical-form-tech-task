import { Routes, Route } from 'react-router-dom';
import { Outlet as Pages } from 'react-router-dom';
import PageOne from './components/Pages/PageOne';
import PageTwo from './components/Pages/PageTwo';
import PageTwoPointFive from './components/Pages/PageTwoPointFive';
import PageThree from './components/Pages/PageThree';
import PageFour from './components/Pages/PageFour';
import PageFive from './components/Pages/PageFive';

import './styles/App.css';
import './styles/Pages.css';
import { FormProvider, useForm } from 'react-hook-form';
import { useCallback } from 'react';
export const FORM_KEY = 'medicalData';
import { z } from 'zod';
import { schemaMap } from './lib/schema';
import { useLocation } from 'react-router-dom';

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

  // TODO the root dir ('/') should check for a page value in the local storage and route the user to the correct page
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
              <Route path="/appointment" element={<PageFour />} />
              <Route path="/success" element={<PageFive />} />
            </Route>
          </Routes>
        </FormProvider>
      </div>
    </div>
  );
}

export default App;
