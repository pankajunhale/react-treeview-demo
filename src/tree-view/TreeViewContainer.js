import { useState } from "react";
import TreeViewItem from "../components/TreeViewItem";
import { findObjectById } from "../utils/utility";

export default function TreeViewContainer() {
  const initialState = {
    id: "root",
    title: "Parent",
    targetId: "root",
    expanded: true,
    children: [],
  };

  const [treeViewData, setTreeViewData] = useState(initialState);

  const renderTreeNew = (nodes) => {
    console.log(nodes.children);
    return (
      <TreeViewItem
        id={nodes.id}
        title={nodes.title}
        handleCreateNode={createNode}
        handleDeleteNode={deleteNode}
      >
        {Array.isArray(nodes.children) ? (
          <ul>{nodes.children.map((node) => renderTreeNew(node))}</ul>
        ) : null}
      </TreeViewItem>
    );
  };

  const createNode = (data) => {
    console.log("saveNode", data);
    const newTreeView = { ...treeViewData };
    let node = findObjectById(newTreeView, data.targetId);
    if (node) {
      node.children.push(data);
    }
    console.log(newTreeView);
    setTreeViewData(newTreeView);
  };

  const deleteNode = (data) => {
    //console.log("deleteNode", data);
    const newTreeView = { ...treeViewData };
    const node = findObjectById(newTreeView, data.targetId);
    const parentNode = findObjectById(newTreeView, node.targetId);
    console.log(node, parentNode);
    console.table(parentNode.children);
    if (parentNode && parentNode.children) {
      const filterChildren = parentNode.children.filter(
        (item) => item.id !== node.id
      );
      console.table(filterChildren);
      parentNode.children = [...filterChildren];
      setTreeViewData(newTreeView);
    }
  };

  const render = () => {
    if (treeViewData) {
      return <ul>{renderTreeNew(treeViewData)}</ul>;
    } else {
      return <h1>Root node does not exist..!</h1>;
    }
  };

  return render();
}
