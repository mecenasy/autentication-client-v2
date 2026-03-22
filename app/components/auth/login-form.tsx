
import { LoginHook } from '../../hooks/use-login';
import Input from '../Input';
import { Link } from '../navigation/navigation';
import { useTranslations } from 'next-intl';

type LoginFormProps = LoginHook & {
  hideForgotButton?: boolean;
}

const LoginForm = ({ errors, isPending, onSubmit, register, hideForgotButton }: LoginFormProps) => {
  const t = useTranslations('login');

  return (
    <>
      <h1 className="text-4xl font-bold text-white text-center mb-8">{t('login')}</h1>
      <form className='mb-1' onSubmit={onSubmit}>
        <Input
          id="email"
          label={t('email')}
          type="text"
          register={register}
          error={errors.email}
          autoComplete="username"
        />
        <Input
          id="password"
          label={t('password')}
          type="password"
          register={register}
          error={errors.password}
          autoComplete="current-password"
        />
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-6 py-3 mt-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 disabled:bg-gray-500"
        >
          {isPending ? t('loggingIn') : t('singIn')}
        </button>
      </form>
      {!hideForgotButton && (
        <div className="text-sm text-center">
          <Link href="/forgot-password" className="font-medium text-blue-400 hover:text-blue-300 mt-4 inline-block" >
            {t('forgotPassword')}
          </Link>
        </div>
      )}
    </>
  )
};

export default LoginForm;
