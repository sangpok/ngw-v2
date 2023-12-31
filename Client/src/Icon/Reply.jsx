export const Reply = ({ gray, width = '24px', height = '24px' }) => {
  return (
    <svg
      className={`${gray ? 'fill-gray-400' : ''}`}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.75 4.75L4.75 7.75C4.75 8.375 4.96875 8.90625 5.40625 9.34375C5.84375 9.78125 6.375 10 7 10L13.9 10L11.2 7.3L12.25 6.25L16.75 10.75L12.25 15.25L11.2 14.2L13.9 11.5L7 11.5C5.9625 11.5 5.078 11.1342 4.3465 10.4027C3.615 9.67125 3.2495 8.787 3.25 7.75L3.25 4.75L4.75 4.75Z" />
    </svg>
  );
};
