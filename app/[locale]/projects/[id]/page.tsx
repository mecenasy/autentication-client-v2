import React from 'react';
import ProjectDetails from '@/app/components/projects/project-details';
import { MainLoaderWrapper } from '@/app/components/loading/main-loader-wrapper';

type Props = {
  params: Promise<{ id: string; locale: string; }>
}

const ProjectDetailsPage = async (props: Props) => {
  const { id } = await props.params;

  return (
    <MainLoaderWrapper>
      <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
        <main className="flex flex-col w-l min-h-96 items-center justify-start p-8 bg-gray-900 rounded-lgshadow-lg">
          <ProjectDetails clientId={id} />
        </main>
      </div>
    </MainLoaderWrapper>
  );
};

export default ProjectDetailsPage;
