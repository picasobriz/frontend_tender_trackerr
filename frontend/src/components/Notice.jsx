// Red error / green success message. Renders nothing when there is no text.
export default function Notice({ type = "error", children }) {
  return children ? <p className={`notice ${type}`}>{children}</p> : null;
}

