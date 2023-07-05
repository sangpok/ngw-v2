export const StyledConversationHistory = {
  Container: ({ children, ...props }) => (
    <div className="flex h-full w-full flex-col items-center gap-6 overflow-auto" {...props}>
      {children}
    </div>
  ),
  NoConversationWrapper: ({ children, ...props }) => (
    <div className="flex h-screen w-screen items-center justify-center">{children}</div>
  ),
  NoConversation: ({ children, ...props }) => <p className="">{children}</p>,
};
