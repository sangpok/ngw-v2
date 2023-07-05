import { forwardRef } from 'react';

export const StyledEmojiPicker = {
  Container: ({ children, ...props }) => (
    <div
      data-component-name="emoji-picker"
      className=" absolute right-0 top-10 z-50 flex h-60 w-60 flex-col gap-2 rounded-md border border-white bg-white p-2 shadow-hovermenu"
      {...props}
    >
      {children}
    </div>
  ),
  ItemList: ({ children, ...props }) => (
    <div
      className=" flex h-full w-full touch-pan-y flex-wrap items-start justify-between  gap-1 overflow-auto overflow-x-hidden"
      {...props}
    >
      {children}
    </div>
  ),
  Item: ({ children, ...props }) => (
    <button
      className=" ease-[cubic-bezier(0.075, 0.82, 0.165, 1)] flex scale-100 items-center justify-center border-none bg-none font-tossface text-2xl transition-transform duration-100 hover:scale-125 active:scale-95"
      {...props}
    >
      {children}
    </button>
  ),
  CategoryList: forwardRef(({ children, ...props }, ref) => (
    <div
      className="flex touch-pan-x overflow-y-hidden whitespace-nowrap py-0 scrollbar-none" //gradient-mask-r-80
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )),
  Category: ({ children, selected, ...props }) => (
    <button
      className={`text-md flex items-center justify-center rounded-full border-none ${
        selected ? 'bg-gray-200' : 'bg-none'
      } p-2 hover:cursor-pointer ${selected ? 'font-bold' : ''} hover:${
        selected ? 'bg-gray-200' : 'bg-gray-100'
      } hover:font-bold`}
      {...props}
    >
      {children}
    </button>
  ),
  CategoryIcon: ({ children }) => <span className="mr-1 font-tossface">{children}</span>,
  NoReactions: ({ children }) => (
    <span className="w-full self-center justify-self-center text-center text-sm text-gray-500">
      {children}
    </span>
  ),
};
