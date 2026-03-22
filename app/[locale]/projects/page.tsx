
import { MainLoaderWrapper } from '@/app/components/loading/main-loader-wrapper';
import ProjectList from '@/app/components/projects/project-list';

const ProjectsPage = () => {
  return (
    <MainLoaderWrapper>
      <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
        <main className="flex flex-col w-l min-h-96 items-center justify-start p-8 bg-gray-900 rounded-lgshadow-lg">
          <ProjectList />
        </main>
      </div>
    </MainLoaderWrapper>
  );
};

export default ProjectsPage;
