export const StyledUserTab = {
  Container: ({ children }) => <div className="flex flex-col gap-8">{children}</div>,
  Group: ({ col, gap, children }) => (
    <div className={`flex ${col ? 'flex-col' : 'flex-row'} ${gap ? `gap-${gap}` : ''}`}>
      {children}
    </div>
  ),
  PropertyName: ({ children }) => <p className="text-lg font-semibold leading-none">{children}</p>,
  PropertyDescribe: ({ children }) => (
    <p className=" self-end text-sm font-light leading-none text-gray-500">{children}</p>
  ),
  Input: (props) => (
    <input
      className=" appearance-none border-b border-gray-200 py-1 font-normal outline-none"
      {...props}
    />
  ),
  ErrorLabel: ({ children }) => <p className=" text-red-500">{children}</p>,
  ImageWrapper: ({ children }) => (
    <div className=" m-auto my-4 h-16 w-16 overflow-hidden rounded-full">{children}</div>
  ),
};
