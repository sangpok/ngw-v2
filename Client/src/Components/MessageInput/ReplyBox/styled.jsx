import { Reply } from '@Icon/Reply';

export const StyledReplyBox = {
  Container: ({ children, ...props }) => (
    <div className="mt-2 flex w-full flex-row items-start justify-between gap-2 bg-gray-100 px-1 py-2">
      {children}
    </div>
  ),
  UserProfile: (props) => (
    <picture className="h-4 w-4 overflow-hidden rounded-full">
      <img {...props} className="h-4 w-4 object-cover" />
    </picture>
  ),
  Name: ({ children }) => <p className=" font-bold leading-none">{children}</p>,
  TextContent: ({ children, ...props }) => (
    <p className=" w-full leading-none" {...props}>
      {children}
    </p>
  ),
  ReplyIcon: () => <Reply />,
  CancelButton: ({ children, ...props }) => (
    <button className="h-full" {...props}>
      {children}
    </button>
  ),
  Group: ({ col, full, gap, children }) => (
    <div
      className={`flex ${col ? 'flex-col' : 'flex-row'} ${full ? 'flex-1' : ''} ${
        gap ? `gap-${gap}` : ''
      }`}
    >
      {children}
    </div>
  ),
};
