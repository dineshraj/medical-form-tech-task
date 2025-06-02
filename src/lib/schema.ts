import parsePhoneNumberFromString from 'libphonenumber-js';
import { z, ZodString } from 'zod';
import {
  errorForThreeCharacters,
  errorForName,
  errorForDate,
  errorForAge,
  errorForAgeInput,
  errorForNumbers,
  errorForEmail,
  errorForPhone,
  errorForCheckList
} from './lang';

export const PageOneSchema = z.object({
  name: z
    .string()
    .refine((val) => val.length >= 3, {
      message: errorForThreeCharacters
    })
    .refine((value) => /^[A-Za-z]+$/.test(value), { message: errorForName }),
  dob: z.coerce
    .date()
    .refine((date) => date <= new Date(), { message: errorForDate }),
  ageCheck: z.string({ message: errorForAge }),
  ageField: z.coerce
    .number()
    .refine((value) => value && value <= 36, { message: errorForAgeInput })
    .optional(),
  weight: z.coerce
    .number({
      invalid_type_error: errorForNumbers
    })
    .optional(),
  weightUnit: z.union([z.string(), z.literal('kg')]),
  height: z.coerce
    .number({
      invalid_type_error: errorForNumbers
    })
    .optional(),
  heightUnit: z.union([z.string(), z.literal('cm')]),
  email: z.string().email(errorForEmail),
  phone: z.coerce
    .string()
    .transform((val) => val ?? '')
    .refine(
      (value) => {
        try {
          return parsePhoneNumberFromString(value)?.isValid();
        } catch {
          return false;
        }
      },
      { message: errorForPhone }
    )
});

export const PageTwoSchema = z.object({
  symptomItem: z.array(z.string()).min(1, errorForCheckList)
});

export const combinedSchema = {
  ...PageOneSchema.shape,
  ...PageTwoSchema.shape
};

export const combinedRefinedSchema = z
  .object(combinedSchema)
  .superRefine(({ ageCheck, ageField }, ctx) => {
    if (ageCheck === 'yes') {
      // return ageField !== undefined;
      if (!ageField || isNaN(Number(ageField))) {
        ctx.addIssue({
          path: ['ageField'],
          code: z.ZodIssueCode.custom,
          message: errorForNumbers
        });
      }
    }
  });

// TODO put this in a file and use the same routes in App.tsx
export const schemaMap: Record<string, z.ZodTypeAny> = {
  '/': PageOneSchema,
  '/ailments': PageTwoSchema
};

export type PageOneT = z.infer<typeof PageOneSchema>;
export type PageTwoT = z.infer<typeof PageTwoSchema>;
export type CombinedSchemaType = z.infer<typeof combinedRefinedSchema>;
