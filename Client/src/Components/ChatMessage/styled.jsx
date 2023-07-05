export const StyledChatMessage = {
  UserProfile: (props) => (
    <picture className="h-4 w-4 overflow-hidden rounded-full">
      <img {...props} className="h-4 w-4 object-cover" />
    </picture>
  ),
  InfoWrapper: ({ children }) => <div className="flex flex-1 flex-col gap-2">{children}</div>,
  MessageWrapper: ({ children, ...props }) => (
    <div data-component-name="message" className="relative flex w-full gap-2" {...props}>
      {children}
    </div>
  ),
  Group: ({ children, col }) => (
    <div className={` flex ${col ? 'flex-col' : 'flex-row'} gap-2`}>{children}</div>
  ),
  Name: ({ children }) => <p className=" font-bold leading-none">{children}</p>,
  ChatDate: ({ children }) => (
    <p className=" self-end text-sm leading-none text-gray-400">{children}</p>
  ),
  ReactionBadgeWrapper: ({ children, ...props }) => (
    <div className=" flex flex-wrap gap-2">{children}</div>
  ),
};
