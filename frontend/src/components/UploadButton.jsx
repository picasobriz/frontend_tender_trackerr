// Pick a file, send it to /api/uploads (Cloudinary) and hand the stored URL to onDone.
export default function UploadButton({ kind, label, onDone }) {
  return (
    <div>
      <label>{label}</label>
      <input type="file" />
    </div>
  );
}