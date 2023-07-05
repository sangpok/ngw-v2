export const StyledProfileModal = {
  Container: ({ children }) => <div className="h-full w-full">{children}</div>,
  Image: (props) => (
    <picture className="h-fit w-fit overflow-hidden rounded-md">
      <img className="h-full w-full object-contain " {...props} />
    </picture>
  ),
};
