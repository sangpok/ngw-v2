import { More } from '@Icon/More';
import { Reaction } from '@Icon/Reaction';

export const StyledHoverMenu = {
  Container: ({ children }) => (
    <div
      data-component-name="hover-menu"
      className=" absolute right-1 top-1 flex rounded-md border border-white bg-white shadow-hovermenu"
    >
      {children}
    </div>
  ),
  Button: ({ children, ...props }) => (
    <button
      className=" flex h-7 w-7 appearance-none items-center justify-center rounded-md outline-none hover:bg-gray-100 active:bg-gray-200"
      {...props}
    >
      {children}
    </button>
  ),
  MoreIcon: () => <More gray />,
  ReactionIcon: () => <Reaction gray />,
};
