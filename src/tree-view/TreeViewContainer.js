import { useState } from "react";
import TreeViewItem from "../components/TreeViewItem";

export default function TreeViewContainer() {
  const initialState = {
    id: "root",
    name: "Parent",
    isExpandable: true,
    children: [
      {
        id: "1",
        name: "Child Node - 1",
      },
      {
        id: "2",
        name: "Child Node - 2",
        isExpandable: true,
        children: [
          {
            id: "2_1",
            name: "Child Node - 2_1",
          },
          {
            id: "2_2",
            name: "Child Node - 2_2",
          },
        ],
      },
    ],
  };

  const [treeViewData, setTreeViewData] = useState(initialState);
  const renderTree = (nodes) => {
    console.log(nodes.children);
    return (
      <>
        {Array.isArray(nodes.children) ? (
          <ul>{nodes.children.map((node) => renderTree(node))}</ul>
        ) : (
          renderNode(nodes)
        )}
      </>
    );
  };

  const renderTreeNew = (nodes) => {
    console.log(nodes.children);
    return (
      <TreeViewItem id={nodes.id} name={nodes.name}>
        {Array.isArray(nodes.children) ? (
          <ul>{nodes.children.map((node) => renderTreeNew(node))}</ul>
        ) : null}
      </TreeViewItem>
    );
  };

  const renderNode = (node) => {
    console.log("renderNode", node);
    return (
      <li key={node.id} id={node.id}>
        {node.name}
      </li>
      //node.name
    );
  };

  const renderChildren = (node) => {
    console.log("renderNode", node);
    return (
      <li key={node.id} id={node.id}>
        {node.name}
      </li>
    );
  };

  const createNode = (node) => {
    console.log("saveNode");
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
