
'use client'

import { Link } from '../navigation/navigation';
import trash from '../../assets/trash.svg';
import edit from '../../assets/edit.svg';
import Image from 'next/image';
import { useMutation } from '@apollo/client/react';
import { graphql } from '@/app/gql';

export interface Project {
  name: string;
  clientId: string;
}

interface ProjectListItemProps {
  project: Project
}

const REMOVE_PROJECT_MUTATION = graphql(`
  mutation RemoveProject($clientId: String!) {
    federationRemove(clientId: $clientId) {
    clientId
    }
  }
`);


const ProjectListItem = ({ project }: ProjectListItemProps) => {

  const [removeFederation] = useMutation(REMOVE_PROJECT_MUTATION, {
    refetchQueries: ['GetAllProjects'],
  });

  const handleDelete = async () => {
    try {
      await removeFederation({
        variables: {
          clientId: project.clientId,
        },
      });
    } catch (error) {
      console.log("🚀 ~ handleDelete ~ error:", error)

    }
  };

  return (

    <div className="bg-gray-800 rounded-lg shadow-lg relative h-32 w-52" >
      <Link href={`/projects/${project.clientId}`} className="block mb-4 p-4 w-full h-full">
        <h2 className="text-xl font-bold text-white">{project.name}</h2>
      </Link>
      <div className="flex flex-col gap-2 absolute bottom-2 right-2">
        <Link
          href={`/projects/edit/${project.clientId}`}
          className="px-3 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          <Image height={16} src={edit} alt="edit" className="invert brightness-0" />
        </Link>
        <button
          onClick={handleDelete}
          className="px-3 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
        >
          <Image height={16} src={trash} alt="trash" className="invert brightness-0" />
        </button>
      </div>
    </div>
  );
};

export default ProjectListItem;
