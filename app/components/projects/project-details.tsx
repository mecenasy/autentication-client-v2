
'use client'

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ToggleSwitch from '../ui/toggle-switch';
import Link from 'next/link';
import Image from 'next/image';
import edit from '../../assets/edit.svg';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface ProjectDetailsProps {
  clientId: string;
}

export interface ProjectDetails {
  name: string;
  clientId: string;
  clientUrl: string;
  loginUrl: string;
  verifyUrl: string;
  isActivated: boolean;
}

const ProjectDetails = ({ clientId }: ProjectDetailsProps) => {
  const t = useTranslations('projects');
  const [showSecret, setShowSecret] = useState(false);
  const queryClient = useQueryClient();
  const [secret, setSecret] = useState('');
  const { data: project, isFetching } = useQuery({
    queryKey: ['project', clientId],
    queryFn: async () => {
      const { data } = await axios.get<ProjectDetails>(`/api/project-auth/${clientId}`);
      return data;
    },
    refetchOnWindowFocus: false
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(`/api/project-auth/${project?.clientId}/toggle`);
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', clientId] });
    },
  });

  const mutationSecret = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(`/api/project-auth/${project?.clientId}/new-secret`);
      return data;
    },
    onSuccess: (data) => {
      setSecret(data.secret);
    },
  });

  const handleToggle = () => {
    mutation.mutate();
  };
  const handleNewSecret = () => {
    mutationSecret.mutate();
  };

  const maskedSecret = '********************'

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-4xl font-bold mb-8">{t('projectDetails')}</h1>
      {isFetching || !project ? <p>Loading...</p> : (
        <>
          <div className='flex justify-between items-start'>
            <h1 className="text-4xl font-bold mb-8">{project.name}</h1>
            <Link
              href={`/projects/edit/${project.clientId}`}
              className="px-3 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              <Image height={16} src={edit} alt="edit" className="invert brightness-0" />
            </Link>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">{t('clientId')}</h2>
              <p>{project.clientId}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">{t('secret')}</h2>
              <div className="flex items-center justify-between">
                <p className="mr-4">{secret || maskedSecret}</p>

              </div>
            </div>
            <div className='flex justify-end'>
              <button
                onClick={handleNewSecret}
                className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 mb-4"
              >
                {t('generateNewSecret')}
              </button>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">{t('clientUrl')}</h2>
              <p>{project.clientUrl}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">{t('loginUrl')}</h2>
              <p className='text-sm'>{project.loginUrl}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">{t('verifyUrl')}</h2>
              <p className='text-sm'>{project.verifyUrl}</p>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{t('isActive')}</h2>
              <ToggleSwitch
                id="isActive"
                checked={project.isActivated}
                onChange={handleToggle}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
