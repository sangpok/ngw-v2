export const StyledDeleteModal = {
  PropertyName: ({ children }) => <p className="text-lg font-semibold leading-none">{children}</p>,
  Describe: ({ children }) => <p className="self-start">{children}</p>,
  Group: ({ children }) => <div className=" flex h-full flex-col justify-center">{children}</div>,
  Input: (props) => (
    <input
      className=" w-full appearance-none border-b border-gray-200 py-1 font-normal outline-none"
      {...props}
    />
  ),
};
