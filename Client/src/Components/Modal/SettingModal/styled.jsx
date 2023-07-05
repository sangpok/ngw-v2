export const StyledSettingModal = {
  TabWrapper: ({ children }) => (
    <div className="flex h-full border border-gray-200">{children}</div>
  ),
  Tab: ({ children }) => <ul className=" w-1/4  border-r border-r-gray-200">{children}</ul>,
  TabItem: ({ selected, children, ...props }) => (
    <li
      className={`px-2 py-1 hover:${selected ? 'bg-gray-200' : 'bg-gray-100'} ${
        selected ? 'bg-gray-200' : ''
      }`}
      {...props}
    >
      {children}
    </li>
  ),
  TabContent: ({ children }) => <div className=" w-3/4 overflow-y-scroll  p-4 ">{children}</div>,
  Button: ({ children, ...props }) => (
    <button
      className=" box-border flex h-8 w-16 items-center justify-center self-end rounded-md border border-gray-200 px-2 py-1 font-semibold hover:border-none hover:bg-gray-100"
      {...props}
    >
      {children}
    </button>
  ),
};
