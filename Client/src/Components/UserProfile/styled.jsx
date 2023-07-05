export const StyledUserProfile = {
  ImgWrapper: ({ size, children }) => (
    <picture
      className={`${
        size ? `h-${size} w-${size}` : 'h-4 w-4'
      } min-w-max overflow-hidden rounded-full bg-gray-500`}
    >
      {children}
    </picture>
  ),
  Image: ({ size, ...props }) => (
    <img className={`${size ? `h-${size} w-${size}` : 'h-4 w-4'} object-cover`} {...props} />
  ),
};
