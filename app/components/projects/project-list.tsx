
'use client'

import { Link } from '../navigation/navigation';
import { useTranslations } from 'next-intl';
import ProjectListItem, { Project } from './project-list-item';
import { useQuery } from '@apollo/client/react';
import { graphql } from '@/app/gql';

const GET_ALL_PROJECTS_QUERY = graphql(`
  query GetAllProjects {
    federationGetAll {
      name
      clientId
    }
  }
`)

const ProjectList = () => {
  const t = useTranslations('projects');
  const { data } = useQuery(GET_ALL_PROJECTS_QUERY);
  const projects = data?.federationGetAll;

  return (
    <div className="container mx-auto p-4 min-w-3xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">{t('projects')}</h1>
        <div className='flex gap-4'>
          <Link
            href="/projects/documentation"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            {t('documentation')}
          </Link>
          <Link
            href="/projects/create"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          >
            {t('createNew')}
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects?.map((project: Project) => (
          <ProjectListItem key={project.clientId} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
