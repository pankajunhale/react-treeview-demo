import { useState } from "react";
import Button from "react-bootstrap/Button";

export default function TreeViewItem({
  id,
  title,
  handleCreateNode,
  handleDeleteNode,
  handleSaveNode,
  children,
}) {
  const DEFAULT_NODE_NAME = "New Node";
  const [nodeTitle, setNodeTitle] = useState(title || "");
  const [isEditing, setIsEditing] = useState(false);

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
      targetId,
    };
    handleDeleteNode(data);
  };

  const handleSubmit = (e, targetId) => {
    e.preventDefault();
    const data = {
      id,
      title: nodeTitle,
      targetId,
    };
    setIsEditing(false);
    handleSaveNode(data);
  };

  const renderButton = (id) => {
    return (
      <>
        {id !== "root" ? (
          <>
            {" "}
            <Button
              variant="primary"
              size="sm"
              type="button"
              onClick={() => handleAdd(id)}
            >
              Add
            </Button>{" "}
            <Button
              variant="primary"
              size="sm"
              type="button"
              onClick={() => handleDelete(id)}
            >
              Remove
            </Button>
          </>
        ) : (
          <>
            {" "}
            <Button
              variant="primary"
              size="sm"
              type="button"
              onClick={() => handleAdd(id)}
            >
              Add
            </Button>
          </>
        )}
      </>
    );
  };

  const renderForm = (isEditing) => {
    return !isEditing ? (
      <span onClick={() => setIsEditing(true)}>{title}</span>
    ) : (
      <input
        value={nodeTitle}
        onChange={(e) => {
          setNodeTitle(e.target.value);
        }}
      />
    );
  };

  const render = () => {
    if (id && title) {
      return (
        <li key={id}>
          <form onSubmit={(e) => handleSubmit(e, id)}>
            {renderForm(isEditing)}
            {renderButton(id)}
          </form>
          {children}
        </li>
      );
    } else return null;
  };

  return render();
}
