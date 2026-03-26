
'use client'

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ToggleSwitch from '../ui/toggle-switch';
import Link from 'next/link';
import Image from 'next/image';
import edit from '../../assets/edit.svg';
import axios from 'axios';
import { useMutation, useQuery } from '@apollo/client/react';
import { graphql } from '@/app/gql';

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

const GET_PROJECT_QUERY = graphql(`
  query GetProjectDetails($clientId: String!) {
    federationGet(clientId: $clientId) {
      name
      clientUrl
      isActivated
      clientId
      loginUrl
      verifyUrl
    }
  }
`);

const GENERATE_NEW_SECRET_MUTATION = graphql(`
  mutation GenerateNewSecret($clientId: String!) {
    generateSecret(clientId: $clientId) {
      secret
    }
  }
`);

const TOGGLE_PROJECT_MUTATION = graphql(`
  mutation ToggleProject($clientId: String!) {
    federationToggle(clientId: $clientId) {
      active
    }
  }
`);

const ProjectDetails = ({ clientId }: ProjectDetailsProps) => {
  const t = useTranslations('projects');
  const [secret, setSecret] = useState('');
  const { data, loading } = useQuery(GET_PROJECT_QUERY, {
    variables: { clientId },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const project = data?.federationGet;


  const [toggleFederation] = useMutation(TOGGLE_PROJECT_MUTATION, {
    refetchQueries: ['GetProjectDetails'],
  });

  const [generateNewSecret] = useMutation(GENERATE_NEW_SECRET_MUTATION);

  const handleToggle = async () => {
    try {
      await toggleFederation({
        variables: {
          clientId,
        },
      });
    } catch (error) {
      console.log("🚀 ~ handleToggle ~ error:", error)
    }
  };
  const handleNewSecret = async () => {
    try {
      const { data } = await generateNewSecret({
        variables: {
          clientId,
        },
      });

      const secret = data?.generateSecret.secret ?? '';
      setSecret(secret);
    } catch (error) {
      console.log("🚀 ~ handleNewSecret ~ error:", error)
    }
  };

  const maskedSecret = '********************'

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-4xl font-bold mb-8">{t('projectDetails')}</h1>
      {loading && !project && <p>Loading...</p>}
      {project && (
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
