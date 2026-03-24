"use client";
import Image from 'next/image';
import google from '../../assets/google.svg';
import github from '../../assets/github.svg';
import facebook from '../../assets/facebook.svg';
import linkedin from '../../assets/linkedin.svg';
import { SocialButtonProps } from './types';
import MicrosoftButton from './microsoft-button';
import { Provider } from '@/app/gql/graphql';



const OAuthButtons = ({ type }: SocialButtonProps) => {
  const handleToggleChange = (provider: Provider) => async () => {
    if (type === 'login')
      window.location.href = `${process.env.NEXT_PUBLIC_API_HOST_URL}/auth/${provider}/login`
    else
      window.location.href = `${process.env.NEXT_PUBLIC_API_HOST_URL}/user/${provider}/register`
  }

  return (
    <div className='flex justify-around gap-2'>
      <MicrosoftButton type={type} />
      <button
        className="px-2.5 py-2.5 h-12 w-12 bg-white rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-grey-500"
        onClick={handleToggleChange(Provider.Google)}><Image src={google} alt={'google'} />
      </button>
      <button
        className="px-2.5 py-2.5 h-12 w-12 bg-white rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-grey-500"
        onClick={handleToggleChange(Provider.Github)}><Image src={github} alt={'github'} />
      </button>
      <button
        className="px-2.5 py-2.5 h-12 w-12 bg-white rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-grey-500"
        onClick={handleToggleChange(Provider.Facebook)}><Image src={facebook} alt={'facebook'} />
      </button>
      <button
        className="px-2.5 py-2.5 h-12 w-12 bg-white rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-grey-500"
        onClick={handleToggleChange(Provider.Linkedin)}><Image src={linkedin} alt={'linkedin'} />
      </button>
    </div>
  )
};

export default OAuthButtons;
