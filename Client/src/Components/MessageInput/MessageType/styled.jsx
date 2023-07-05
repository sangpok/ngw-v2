import { Open } from '@Icon/Open';

export const StyledMessageType = {
  Container: ({ children, ...props }) => (
    <div
      className=" relative flex min-w-max cursor-pointer select-none items-center justify-center gap-0.5 rounded-3xl bg-gray-100 px-3 py-1 text-base font-semibold"
      {...props}
    >
      {children}
    </div>
  ),
  Icon: ({ children }) => <span className=" mr-1.5 font-tossface">{children}</span>,
  OpenIcon: ({ isOpened, ...props }) => (
    <Open
      className={`transition-transform ${isOpened ? 'rotate-180' : 'rotate-0'} ease-in-out`}
      {...props}
    />
  ),
  TypeBox: ({ children, ...props }) => (
    <div
      className="absolute bottom-full left-0 z-50 mb-2 w-full min-w-max overflow-hidden rounded-lg bg-white py-1 shadow-hovermenu"
      {...props}
    >
      <ul className="w-full">{children}</ul>
    </div>
  ),
  TypeItem: ({ children, ...props }) => (
    <li className="w-full px-3 py-1 font-medium hover:cursor-pointer hover:bg-gray-100" {...props}>
      {children}
    </li>
  ),
};
