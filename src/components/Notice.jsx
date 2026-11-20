export default function Notice({ children }) {
  return children ? <div className="notice">{children}</div> : null;
}
