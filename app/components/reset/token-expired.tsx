import { useTranslations } from 'next-intl';
import { Link } from '../navigation/navigation';

interface TokenExpiredProps {
  message: string;
}

const TokenExpired = ({ message }: TokenExpiredProps) => {
  const t = useTranslations('changePassword');

  return (
    <div className="text-center">
      <p className="text-white text-lg">{message}</p>
      <Link className="font-medium text-blue-400 hover:text-blue-300 mt-4 inline-block" href="/login" >
        t{t('return')}
      </Link>
    </div>
  )
};

export default TokenExpired;
