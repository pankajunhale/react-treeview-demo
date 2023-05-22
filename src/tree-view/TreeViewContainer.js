import { useState } from "react";
import TreeViewItem from "../components/TreeViewItem";
import { findObjectById } from "../utils/Utility";
import Alert from "react-bootstrap/Alert";

export default function TreeViewContainer() {
  const initialState = {
    id: "root",
    title: "Parent",
    targetId: "root",
    expanded: true,
    children: [],
  };

  const [treeViewData, setTreeViewData] = useState(initialState);

  const createNode = (data) => {
    console.log("createNode", data);
    const newTreeView = { ...treeViewData };
    let node = findObjectById(newTreeView, data.targetId);
    if (node) {
      node.children.push(data);
    }
    console.log(newTreeView);
    setTreeViewData(newTreeView);
  };

  const saveNode = (data) => {
    console.log("saveNode", data);
    const newTreeView = JSON.parse(JSON.stringify(treeViewData)); //{ ...treeViewData };
    const node = findObjectById(newTreeView, data.id);
    if (node) {
      node.title = data.title;
    }
    console.log(newTreeView);
    setTreeViewData(newTreeView);
  };

  const deleteNode = (data) => {
    //console.log("deleteNode", data);
    const newTreeView = JSON.parse(JSON.stringify(treeViewData)); //{ ...treeViewData };
    let node = findObjectById(newTreeView, data.targetId);
    const parentNode = findObjectById(newTreeView, node.targetId);
    console.log(node, parentNode);
    console.table(parentNode.children);
    if (parentNode && parentNode.children) {
      const filterChildren = parentNode.children.filter(
        (item) => item.id !== node.id
      );
      parentNode.children.length = 0;
      parentNode.children = [...filterChildren];
      console.log(newTreeView);
      setTreeViewData(newTreeView);
    }
  };

  const renderTreeNew = (nodes) => {
    console.log(nodes);
    return (
      <TreeViewItem
        id={nodes.id}
        title={nodes.title}
        handleCreateNode={createNode}
        handleDeleteNode={deleteNode}
        handleSaveNode={saveNode}
      >
        {Array.isArray(nodes.children) ? (
          <ul>{nodes.children.map((node) => renderTreeNew(node))}</ul>
        ) : null}
      </TreeViewItem>
    );
  };

  const render = () => {
    if (treeViewData) {
      return <ul>{renderTreeNew(treeViewData)}</ul>;
    } else {
      return (
        <Alert variant="danger">This is a {variant} alert—check it out!</Alert>
      );
    }
  };

  return render();
}
