
import { MainLoaderWrapper } from '@/app/components/loading/main-loader-wrapper';
import ProjectForm from '@/app/components/projects/project-form';

const CreateProjectPage = () => (
  <MainLoaderWrapper>
    <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
      <main className="flex flex-col w-l min-h-96 items-center justify-start p-8 bg-gray-900 rounded-lgshadow-lg">
        <ProjectForm />
      </main>
    </div>
  </MainLoaderWrapper>
);

export default CreateProjectPage;
