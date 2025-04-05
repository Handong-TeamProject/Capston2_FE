// src/app/pages/balance-game.tsx
import ProjectDetailPage from '@/components/etc/ProjectDetailPage';

interface ProjectPageProps {
    params: {
        id: string;
    };
}

const ProjectDetail = async ({ params }: ProjectPageProps) => {
    const { id } = await params; // params를 비동기적으로 처리
    return <ProjectDetailPage project_id={id} />;
};

export default ProjectDetail;
