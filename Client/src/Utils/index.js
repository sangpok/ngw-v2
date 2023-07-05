export const currentRelativeTime = (commentDate) => {
  return new Intl.RelativeTimeFormat('ko', {
    numeric: 'auto',
  }).format(Math.ceil((new Date(commentDate) - new Date()) / (1000 * 60 * 60 * 24)), 'days');
};
