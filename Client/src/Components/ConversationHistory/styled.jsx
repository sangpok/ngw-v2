import { forwardRef } from 'react';

export const StyledConversationHistory = {
  Container: forwardRef(({ children, ...props }, ref) => (
    <div
      className="flex h-full w-full flex-col items-center gap-6 overflow-auto"
      {...props}
      ref={ref}
    >
      {children}
    </div>
  )),
  NoConversationWrapper: ({ children, ...props }) => (
    <div className="flex h-screen w-screen items-center justify-center">{children}</div>
  ),
  NoConversation: ({ children, ...props }) => <p className="">{children}</p>,
};
