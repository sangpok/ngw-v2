export const StyledReactionBadge = {
  Container: ({ children }) => (
    <div className=" w-fit select-none rounded-3xl bg-gray-100 px-3 py-1">{children}</div>
  ),
  Icon: ({ children }) => <span className=" mr-1.5 font-tossface">{children}</span>,
  Label: ({ children }) => <span className=" font-semibold">{children}</span>,
};
