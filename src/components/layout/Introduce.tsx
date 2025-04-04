// Introduce.tsx 수정
function Introduce({ title, desc }: { title: string; desc: string }) {
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
            <div className = "flex items-center">
                <img src="/Img/rani.png" alt="logo" className="h-6 mr-2"/>
                <p className="text-2xl font-bold">{title}</p>
                
            </div>
            <p className="text-xs md:text-base mt-2 text-boldGray">{formattedDesc}</p>
        </div>
    );
}
export default Introduce;
