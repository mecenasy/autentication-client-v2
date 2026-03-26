
'use client'
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '../schemas/schemas';
import Input from '../Input';
import ToggleSwitch from '../ui/toggle-switch';
import { useMutation, useQuery } from '@apollo/client/react';
import * as z from 'zod';
import { useRouter } from '../navigation/navigation';
import { graphql } from '@/app/gql';

interface ProjectFormProps {
  projectId?: string;
}

type ProjectsFormValues = z.infer<ReturnType<typeof projectSchema>>;

const CREATE_PROJECT_MUTATION = graphql(`
  mutation CreateProject($name: String!, $clientUrl: String!) {
    federationCreate(input: {
      name: $name,
      clientUrl: $clientUrl,
      active: true
    } ) {
      name
    }
  }
`);

const UPDATE_PROJECT_MUTATION = graphql(`
  mutation UpdateProject($name: String!, $clientUrl: String!, $active: Boolean!, $clientId: String!) {
    federationUpdate(clientId: $clientId, input: {
      name: $name,
      clientUrl: $clientUrl,
      active: $active
    } ) {
      name
    }
  }
`);

const GET_PROJECT_QUERY = graphql(`
  query GetProject($clientId: String!) {
    federationGet(clientId: $clientId) {
      name
      clientUrl
      isActivated
    }
  }
`);

const ProjectForm = ({ projectId }: ProjectFormProps) => {
  const t = useTranslations('projects');
  const router = useRouter();
  const tSchemas = useTranslations('schemas');

  const isEditMode = !!projectId;

  const { data } = useQuery(GET_PROJECT_QUERY, {
    variables: { clientId: projectId ?? '' },
    skip: !projectId,

  });

  const [createFederation] = useMutation(CREATE_PROJECT_MUTATION);
  const [updateFederation] = useMutation(UPDATE_PROJECT_MUTATION);

  const project = data?.federationGet;


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectsFormValues>({
    values: isEditMode ? (project ?? { name: '', clientUrl: '' }) : { clientUrl: '', name: '' },
    resolver: zodResolver(projectSchema(tSchemas)),
  });

  const handleToggleChange = async ({ clientUrl, name, isActivated }: ProjectsFormValues) => {
    try {
      if (isEditMode) {
        await updateFederation({
          variables: {
            name,
            clientUrl,
            clientId: projectId,
            active: isActivated ?? false
          },
        });
      } else {
        await createFederation({
          variables: {
            name,
            clientUrl,
          },
        });
      }
      reset();
      router.push('/projects');

    } catch (error) {
      console.log("🚀 ~ handleToggleChange ~ error:", error)
      router.push('/projects');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        {isEditMode ? t('editProject') : t('createProject')}
      </h1>
      <form onSubmit={handleSubmit(handleToggleChange)} className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <Input
          id="name"
          label={t('projectName')}
          type="text"
          register={register}
          error={errors.name}
        />
        <Input
          id="clientUrl"
          label={t('clientUrl')}
          type="text"
          register={register}
          error={errors.clientUrl}
        />
        {isEditMode && (
          <div className="flex items-center justify-between mt-6">
            <span className="text-white font-semibold">{t('isActive')}</span>
            <ToggleSwitch
              id="isActivated"
              {...register('isActivated')}
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full px-6 py-3 mt-6 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
        >
          {isEditMode ? t('saveChanges') : t('createProject')}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;

