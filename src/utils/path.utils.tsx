export const getUserIdFromPath = (path: string): string => {
  const slicedPath = path.split('/');
  const userId = slicedPath[slicedPath.length - 1];
  return userId;
};
