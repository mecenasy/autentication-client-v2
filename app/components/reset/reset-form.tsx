import { ResetPasswordFormValues } from '@/app/hooks/use-reset-password';
import Input from '../Input';
import { UseFormRegister } from 'react-hook-form';
import { useTranslations } from 'next-intl';

interface ResetFormProps {
  onSubmit: (data: any) => void
  errors: any
  isPending: boolean
  register: UseFormRegister<ResetPasswordFormValues>
}

const ResetForm = ({ errors, isPending, register, onSubmit }: ResetFormProps) => {
  const t = useTranslations('changePassword');

  return (
    <>
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        {t('createNew')}
      </h1>
      <form onSubmit={onSubmit}>
        <Input
          id="password"
          label={t('new')}
          type="password"
          register={register}
          error={errors.password}
          autoComplete="new-password"
        />
        <Input
          id="confirmPassword"
          label={t('confirm')}
          type="password"
          register={register}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-6 py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-500"
        >
          {isPending ? t('sending') : t('saveNew')}
        </button>
      </form>
    </>
  )
};

export default ResetForm;
