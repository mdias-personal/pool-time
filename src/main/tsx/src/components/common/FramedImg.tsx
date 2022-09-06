interface FramedImgProps {
  title: string;
  src: string;
}
const FramedImg: React.FC<FramedImgProps> = ({ title, src }: FramedImgProps) => {
  return (
    <div className='polaroid'>
      <img src={src} className='polaroid-pic' />
      <div className='polaroid-container'>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default FramedImg;
