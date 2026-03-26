import * as z from "zod";

const phoneRegex = new RegExp(/^\+48\d{9}$/);
const emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

export const forgotPasswordSchema = (t: (key: string) => string) => z.object({
  login: z.string().refine((data) => phoneRegex.test(data) || emailRegex.test(data), {
    message: t('forgotPassword'),
  }),
});

export const loginSchema = (t: (key: string) => string) => z.object({
  email: z.string().refine((data) => phoneRegex.test(data) || emailRegex.test(data), {
    message: t('login'),
  }),
  password: z.string().min(1, t('passwordProvide')),
});

export const verificationSchema = (t: (key: string) => string) => z.object({
  code: z.string().min(6, t('codeLength')).max(6, t('codeLength')),
});

export const passwordSchema = (t: (key: string) => string) => z.string().min(8, t('passwordLength'))
  .regex(/[A-Z]/, t('passwordLetter'))
  .regex(/[a-z]/, t('passwordLetter2'))
  .regex(/[0-9]/, t('passwordNumber'))
  .regex(/[^A-Za-z0-9]/, t('password'));


export const changePasswordSchema = (t: (key: string) => string) => z.object({
  oldPassword: z.string().min(1, t('oldPassword')),
  password: passwordSchema(t),
  confirmPassword: passwordSchema(t),
}).refine((data) => data.password === data.confirmPassword, {
  message: t('passwordMatch'),
  path: ["confirmPassword"],
});


export const registrationSchema = (t: (key: string) => string) => z.object({
  email: z.string().email({ message: t('wrongEmail') }),
  phone: z.string().regex(/^\+48\d{9}$/, {
    message: t('numberPhone'),
  }),
  password: passwordSchema(t)
});

export const resetPasswordSchema = (t: (key: string) => string) => z.object({
  password: passwordSchema(t),
  confirmPassword: passwordSchema(t),
}).refine((data) => data.password === data.confirmPassword, {
  message: t('passwordMatch'),
  path: ["confirmPassword"],
});

export const projectSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(1, t('projectNameRequired')),
  clientUrl: z.string().min(1, t('projectNameRequired')),
  isActivated: z.boolean().default(true).optional(),
});
