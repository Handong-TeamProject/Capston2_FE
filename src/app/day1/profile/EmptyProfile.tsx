function EmptyProfile() {
  return (
      <div className="w-full rounded-3xl bg-[#F9F9F9] h-52 md:h-60 flex flex-col items-center justify-center">
        <p className="mb-8 text-lg lg:text-2xl text-bolgGray">아직 작성하지 않았습니다!</p>
        <img src = "/Img/empty.png" alt="empty" className="w-20"/>
    </div>
  );
}
export default EmptyProfile;