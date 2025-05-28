import parsePhoneNumberFromString from "libphonenumber-js";
import { z } from "zod";
import { errorForThreeCharacters, errorForName, errorForDate, errorForAge, errorForAgeInput, errorForNumbers, errorForEmail, errorForPhone } from "./lang";

const PageOneSchema = z.object({
  name: z
    .string()
    .min(3, errorForThreeCharacters)
    .refine((value) => /^[A-Za-z]+$/.test(value), { message: errorForName }),
  dob: z.coerce
    .date()
    .refine((date) => date <= new Date(), { message: errorForDate }),
  ageCheck: z.string({ message: errorForAge }),
  ageField: z.coerce
    .number()
    .refine((value) => value <= 36, { message: errorForAgeInput })
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

export default PageOneSchema;