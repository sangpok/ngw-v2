export const StyledModal = {
  Container: ({ children }) => (
    <div className=" absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      {children}
    </div>
  ),
  Box: ({ children }) => (
    <div className="flex h-3/4 w-3/4 rounded-lg bg-white p-6 shadow-hovermenu">{children}</div>
  ),
  BoxContent: ({ children }) => (
    <div className="flex h-full w-full flex-col justify-between gap-4">{children}</div>
  ),
  Header: ({ children }) => (
    <div className="flex flex-row items-center justify-between gap-3">{children}</div>
  ),
  Title: ({ children }) => <p className=" text-2xl font-bold leading-none">{children}</p>,
  Cancel: ({ children, ...props }) => <button {...props}>{children}</button>,
  Body: ({ children }) => <div className="h-full overflow-hidden">{children}</div>,
  Footer: ({ children }) => <div className="self-end">{children}</div>,
  Button: ({ children, ...props }) => (
    <button
      className=" box-border flex h-8 w-16 items-center justify-center rounded-md border border-gray-200 px-2 py-1 font-semibold hover:border-none hover:bg-gray-100"
      {...props}
    >
      {children}
    </button>
  ),
};
