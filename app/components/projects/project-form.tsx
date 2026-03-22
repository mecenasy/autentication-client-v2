
'use client'
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '../schemas/schemas';
import Input from '../Input';
import ToggleSwitch from '../ui/toggle-switch';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as z from 'zod';
import axios from '@/src/api/api';
import { useRouter } from '../navigation/navigation';

interface ProjectFormProps {
  projectId?: string;
}

type ProjectsFormValues = z.infer<ReturnType<typeof projectSchema>>;

const ProjectForm = ({ projectId }: ProjectFormProps) => {
  const t = useTranslations('projects');
  const router = useRouter();
  const tSchemas = useTranslations('schemas');
  const [isActive, setIsActive] = useState(true);
  const queryClient = useQueryClient();

  const isEditMode = !!projectId;

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/project-auth/${projectId}`);
      return data;
    },
    enabled: !!projectId,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectsFormValues>({
    values: projectId ? (project ?? {}) : {},
    resolver: zodResolver(projectSchema(tSchemas)),
  });

  const mutation = useMutation({
    mutationFn: async (data: ProjectsFormValues) => {
      if (projectId) {
        await axios.put(`/api/project-auth/${projectId}`, data);

      } else {
        await axios.post('/api/project-auth', data);
      }
    },

    onSuccess: () => {
      router.push('/projects');
      reset()
      queryClient.invalidateQueries({ queryKey: ['projects'] });

    },
    onError: () => {
      router.push('/projects');
      reset()

    },
  });

  const handleToggleChange = (data: ProjectsFormValues) => {
    mutation.mutate(data);
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
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
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

