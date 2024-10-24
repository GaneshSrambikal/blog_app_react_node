export const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('');
};
