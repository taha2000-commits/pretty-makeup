import { PuffLoader } from "react-spinners";

const LoadingScreen = ({ size = 150 }: { size?: number }) => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <PuffLoader size={size} />
    </div>
  );
};

export default LoadingScreen;
