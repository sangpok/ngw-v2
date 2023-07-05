import { Reply } from '@Icon/Reply';

export const StyledReplyContent = {
  Container: ({ children, ...props }) => (
    <div className="mb-1 flex w-full flex-row items-start justify-between gap-2 rounded-md bg-gray-100 p-3 text-gray-400">
      {children}
    </div>
  ),
  Bold: ({ children }) => <span className=" font-bold leading-none">{children}</span>,
  Name: ({ children }) => <p className=" leading-none">{children}</p>,
  TextContent: ({ children, ...props }) => (
    <p className=" w-full leading-none" {...props}>
      {children}
    </p>
  ),
  ReplyIcon: () => <Reply gray />,
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
