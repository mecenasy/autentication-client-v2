
import { MainLoaderWrapper } from '@/app/components/loading/main-loader-wrapper';
import ProjectForm from '@/app/components/projects/project-form';

type Props = {
  params: Promise<{ id: string; locale: string; }>
}

const EditProjectPage = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <MainLoaderWrapper>
      <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
        <main className="flex flex-col w-l min-h-96 items-center justify-start p-8 bg-gray-900 rounded-lgshadow-lg">
          <ProjectForm projectId={id} />
        </main>
      </div>
    </MainLoaderWrapper>
  );
};

export default EditProjectPage;
