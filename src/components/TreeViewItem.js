export default function TreeViewItem({ id, name, children }) {
  if (id && name) {
    return (
      <li key={id}>
        {name}
        {children}
      </li>
    );
  } else return null;
}
