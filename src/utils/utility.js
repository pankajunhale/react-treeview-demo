export const findObjectById = (root, targetId) => {
  if (root.id === targetId) {
    return root;
  }
  for (let child of root.children) {
    const foundObject = findObjectById(child, targetId);
    if (foundObject !== null) {
      return foundObject;
    }
  }
  return null;
};
