export const generateTreeNew = (obj) => {
  //console.log(obj);
  // If the argument is not an object or is null, return null
  if (typeof obj !== "object" || obj === null) {
    return null;
  }

  // Initialize an empty result array
  const result = [];
  let i = 0;
  // Iterate over all the keys in the object
  console.log("B:", obj);
  for (const key in obj) {
    console.log(key);
    const childTree = generateTreeNew(obj[key]);
    console.log("K:", childTree);
    // If the child tree is not null, add it to the node's children array
    if (childTree !== null) {
      console.log("has child", obj[key]);
    } else {
      console.log("no child");
    }

    // Add the node to the result array
    //result.push(node);
    // if (childTree !== null && node.expanded) {
    //   node.path = result.length > 0 && result[i].title ? result[i].title : ''
    // }
    i = i + 1;
  }

  // Return the result array
  //console.log(result, "----");
  return result;
};

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
