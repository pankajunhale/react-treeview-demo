import { useState } from "react";

export default function TreeViewItem({
  id,
  title,
  handleCreateNode,
  handleDeleteNode,
  children,
}) {
  const DEFAULT_NODE_NAME = "New Node";
  const [nodeTitle, setNodeTitle] = useState(title || "");

  const handleAdd = (targetId) => {
    const data = {
      id: new Date().getTime(),
      title: DEFAULT_NODE_NAME,
      targetId,
      children: [],
    };
    handleCreateNode(data);
  };

  const handleDelete = (targetId) => {
    const data = {
      id,
      title: nodeTitle,
      targetId,
    };
    handleDeleteNode(data);
  };

  const renderButton = (id) => {
    return (
      <>
        {id !== "root" ? (
          <>
            <button onClick={() => handleAdd(id)}>Add</button>
            <button onClick={() => handleDelete(id)}>Remove</button>
          </>
        ) : (
          <button onClick={() => handleAdd(id)}>Add</button>
        )}
      </>
    );
  };

  const render = () => {
    if (id && title) {
      return (
        <li key={id}>
          {id}
          <input
            value={nodeTitle}
            onChange={(e) => {
              setNodeTitle(e.target.value);
              console.log(e.target.value);
            }}
            onSubmit={(e) => {
              console.log(e.target.value);
            }}
          />
          {renderButton(id)}
          {children}
        </li>
      );
    } else return null;
  };

  return render();
}
