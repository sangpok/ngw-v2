export const StyledMoreMenu = {
  Container: ({ children, ...props }) => (
    <div
      data-component-name="more-menu"
      className="absolute right-0 top-10 z-50 flex w-auto rounded-md border border-white bg-white py-1 shadow-hovermenu"
      {...props}
    >
      {children}
    </div>
  ),
  ItemList: ({ children, ...props }) => (
    <ul className="w-full" {...props}>
      {children}
    </ul>
  ),
  Item: ({ children, red, ...props }) => (
    <li
      className={`w-full min-w-max px-3 py-1 font-semibold hover:cursor-pointer hover:bg-gray-100 ${
        red ? 'text-red-500' : ''
      }`}
      {...props}
    >
      {children}
    </li>
  ),
  Icon: ({ children }) => <span className=" mr-1 font-tossface">{children}</span>,
};
