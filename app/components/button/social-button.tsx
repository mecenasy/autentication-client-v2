import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from '../navigation/navigation';

export interface LoginSocialButtonProps {
  icon: string;
  alt: string;
  authFn: () => Promise<void>;
}

const SocialButton = ({
  icon,
  alt,
  authFn,
}: LoginSocialButtonProps) => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: authFn,
    onSuccess: () => {
      router.replace('/');
    },

  });

  const handleToggleChange = () => {
    mutation.mutate();
  };

  return <button
    className="px-2.5 py-2.5 h-12 w-12 bg-white rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-grey-500"
    onClick={handleToggleChange}>
    <Image src={icon} alt={alt} />
  </button>;
};

export default SocialButton;
