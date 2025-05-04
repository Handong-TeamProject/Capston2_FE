import Image from "next/image";
import Link from "next/link";

// Introduce.tsx 수정
function Introduce({ title, desc, project_id }: { title: string; desc: string, project_id:number }) {
  const formattedDesc = (
    <>
      {desc.split("\\").map((line, index) => (
        <span key={index}>
          {line}
          {index === 1 && <br />} {/* 두 번째 요소 뒤에 줄바꿈 추가 */}
        </span>
      ))}
    </>
  );

  return (
    <div className="flex flex-col">
      {
        project_id === 1000 ? (
          "" 
        ): (
          <Link href={`/project/${project_id}`} className="flex mb-3 hover:opacity-50"><Image src="/Img/return.png" className="mr-2" alt="return" width={20} height={20}/>뒤로가기</Link>
        )
      }
      <div className="flex items-center">
        <Image src="/Img/rani.png" alt="logo" className="mr-2" width={24} height={24} />
        <p className="text-2xl font-bold">{title}</p>
      </div>
      <p className="mt-2 text-xs text-boldGray md:text-base">{formattedDesc}</p>
    </div>
  );
}
export default Introduce;
