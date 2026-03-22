"use client";
import { usePathname } from 'next/navigation';
import AdminGuard from '../guard/admin-guard';
import { useAuth } from '@/app/hooks/use-auth';
import { BiometricsButton } from '../button/biometrics-button';
import Image from 'next/image';
import github from '../../assets/github.svg';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './language-switcher';
import { Link } from '../navigation/navigation';
import home from '../../assets/home.svg';
import config from '../../assets/config.svg'
import login from '../../assets/login.svg'
import settings from '../../assets/settings.svg'
import registration from '../../assets/registration.svg'
import change from '../../assets/change.svg'
import logoutIcon from '../../assets/logout.svg'
import projectsIcon from '../../assets/projects.svg';

export const Github = () => {
  const t = useTranslations('menu');
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className='flex gap-3 absolute bottom-2 right-2'>
      <Link
        href="https://github.com/mecenasy/autentication"
        target="_blank"
        className="flex items-center gap-3 text-xs md:text-sm px-3 md:px-6 py-2 md:py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      >
        {t('backend')}
        <Image className='invert brightness-0' height={16} src={github} alt="github" />
      </Link>
      <Link
        href="https://github.com/mecenasy/autentication-client"
        target="_blank"
        className="flex items-center gap-3 text-xs md:text-sm px-3 md:px-6 py-2 md:py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      >
        {t('frontend')}
        <Image className='invert brightness-0' height={16} src={github} alt="github" />
      </Link>
    </div>
  )
}

const LoggedOut = () => {
  const t = useTranslations('menu');
  return (
    <>
      <LanguageSwitcher />
      <div className='ml-auto flex gap-3'>
        <Link href="/registration" className="text-xs md:text-sm px-3 md:px-6 py-2 md:py-3 flex items-center bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
          <span className='hidden md:block'>{t('registration')}</span>
          <Image height={16} src={registration} alt="registration" className="md:hidden invert brightness-0" />
        </Link>
        <Link href="/login" className="text-xs md:text-sm px-3 md:px-6 py-2 md:py-3 flex items-center bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75">
          <span className='hidden md:block'>{t('login')}</span>
          <Image height={16} src={login} alt="login" className="md:hidden invert brightness-0" />
        </Link>
      </div>
    </>
  )
}

const Login = ({ logout }: { logout: () => void }) => {
  const t = useTranslations('menu');
  return (
    <>
      <div className='flex gap-3'>
        <LanguageSwitcher />
        <Link
          href="/"
          className="text-xs md:text-sm px-3 md:px-6 py-2 md:py-3 bg-blue-600 flex items-center text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          <span className='hidden md:block'>{t('home')}</span>
          <Image height={16} src={home} alt="home" className="md:hidden invert brightness-0" />

        </Link >
        <Link
          href="/projects"
          className="text-xs md:text-sm px-3 md:px-6 py-2 md:py-3 bg-blue-600 flex items-center text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          <span className='hidden md:block'>{t('projects')}</span>
          <Image height={16} src={projectsIcon} alt="projects" className="md:hidden invert brightness-0" />
        </Link >
      </div>

      <div className='flex gap-3'>
        <AdminGuard url={'/config/list'}>
          <Link
            href="/config/list"
            className="text-xs md:text-sm px-3 md:px-6 py-2 md:py-3 flex items-center bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            <span className='hidden md:block'>{t('config')}</span>
            <Image height={16} src={config} alt="config" className="md:hidden invert brightness-0" />
          </Link>
        </AdminGuard>
        <Link
          href="/settings"
          className="text-xs md:text-sm px-3 md:px-6 py-2 md:py-3 flex items-center bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          <span className='hidden md:block'>{t('settings')}</span>
          <Image height={16} src={settings} alt="settings" className="md:hidden invert brightness-0" />
        </Link>
        <Link
          href="/account/change-password"
          className="text-xs md:text-sm px-3 md:px-6 py-2 md:py-3 flex items-center bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
        >
          <span className='hidden md:block'>{t('changePassword')}</span>
          <Image height={16} src={change} alt="changePassword" className="md:hidden invert brightness-0" />
        </Link>
        <button
          onClick={logout}
          className="text-xs md:text-sm px-3 md:px-6 py-2 md:py-3 flex items-center bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <span className='hidden md:block'>{t('logout')}</span>
          <Image height={16} src={logoutIcon} alt="logout" className="md:hidden invert brightness-0" />
        </button>
      </div>
    </>
  )
}
export const MenuGuard = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const excludedPaths = ['/login', '/registration', '/reset-password', '/change-password'];
  const isDisabled = excludedPaths.some((path: string) => pathname.includes(path))

  if (isDisabled) {
    return null
  };

  return <>{children}</>
}

const Menu = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className='fixed left-0 right-0 flex justify-between gap-3 p-3 bg-gray-900 shadow-lg top-0 z-10'>{isAuthenticated
      ? <Login logout={logout} />
      : <LoggedOut />}
    </nav>
  );
}

export default Menu;