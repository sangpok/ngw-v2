import { ScaleLoader } from 'react-spinners';

export const StyledLoadingIndicator = {
  Container: ({ children }) => (
    <div className=" absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      {children}
    </div>
  ),
  Loader: () => <ScaleLoader color="white" />,
};
