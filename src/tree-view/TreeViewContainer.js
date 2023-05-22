import { useState } from "react";
import TreeViewItem from "../components/TreeViewItem";
import { findObjectById } from "../utils/Utility";

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
    const newTreeView = { ...treeViewData };
    let node = findObjectById(newTreeView, data.targetId);
    if (node) {
      node.children.push(data);
    }
    setTreeViewData(newTreeView);
  };

  const saveNode = (data) => {
    const newTreeView = JSON.parse(JSON.stringify(treeViewData)); //{ ...treeViewData };
    const node = findObjectById(newTreeView, data.id);
    if (node) {
      node.title = data.title;
    }
    setTreeViewData(newTreeView);
  };

  const deleteNode = (data) => {
    const newTreeView = JSON.parse(JSON.stringify(treeViewData)); //{ ...treeViewData };
    let node = findObjectById(newTreeView, data.targetId);
    const parentNode = findObjectById(newTreeView, node.targetId);
    if (parentNode && parentNode.children) {
      console.log("Before fitler:-");
      console.table(parentNode.children);
      const filterChildren = parentNode.children.filter(
        (item) => item.id !== node.id
      );
      console.log("After filter:-");
      console.table(filterChildren);
      parentNode.children.length = 0;
      parentNode.children = [...filterChildren];
      setTreeViewData(newTreeView);
    }
  };

  const renderTreeNew = (nodes) => {
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
      return <h4>Root node does not exist...!</h4>;
    }
  };

  return render();
}
