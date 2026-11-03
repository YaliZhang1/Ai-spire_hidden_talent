import { useState } from "react";

type UploadPageProps = {
  jobTitle: string;
  files: File[];
  onFilesChange: (files: File[]) => void;
  onBack: () => void;
  onContinue: () => void;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 20;

function fileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function UploadPage({
  jobTitle,
  files,
  onFilesChange,
  onBack,
  onContinue,
}: UploadPageProps) {
  const [errors, setErrors] = useState<string[]>([]);

  function addFiles(selectedFiles: FileList | null) {
    if (!selectedFiles) return;

    const nextFiles = [...files];
    const messages: string[] = [];

    for (const file of Array.from(selectedFiles)) {
      if (!/\.(pdf|docx)$/i.test(file.name)) {
        messages.push(`${file.name}: use a PDF or DOCX file.`);
        continue;
      }

      if (file.size === 0) {
        messages.push(`${file.name}: this file is empty.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        messages.push(`${file.name}: exceeds the 10 MB limit.`);
        continue;
      }

      const alreadyAdded = nextFiles.some(
        (existing) => fileKey(existing) === fileKey(file),
      );

      if (alreadyAdded) continue;

      if (nextFiles.length >= MAX_FILES) {
        messages.push(`You can select up to ${MAX_FILES} files.`);
        break;
      }

      nextFiles.push(file);
    }

    onFilesChange(nextFiles);
    setErrors(messages);
  }

  function removeFile(fileToRemove: File) {
    onFilesChange(
      files.filter((file) => fileKey(file) !== fileKey(fileToRemove)),
    );
    setErrors([]);
  }

  return (
    <>
      <p className="step">STEP 2 OF 3 · UPLOAD CVS</p>

      <h1>Add your candidate CVs.</h1>

      <p className="intro">
        Reviewing candidates for <strong>{jobTitle}</strong>
      </p>

      <section className="upload-panel" aria-label="CV selection">
        <h2>Select CVs</h2>

        <p className="upload-description">
          Select up to 20 files. PDF or DOCX, up to 10 MB each.
        </p>

        <div className="file-picker">
          <label htmlFor="cv-files">Choose CV files</label>

          <input
            id="cv-files"
            type="file"
            accept=".pdf,.docx"
            multiple
            aria-describedby="upload-note"
            onChange={(event) => {
              addFiles(event.target.files);
              event.target.value = "";
            }}
          />
        </div>

        <p id="upload-note" className="form-note">
          Files are selected locally. Upload and analysis will be available when
          the backend is connected.
        </p>

        {errors.length > 0 && (
          <div className="upload-errors" role="alert">
            {errors.map((message, index) => (
              <p key={`${index}-${message}`}>{message}</p>
            ))}
          </div>
        )}

        <div className="file-list-heading">
          <h3>Selected files</h3>
          <span aria-live="polite">{files.length} / 20</span>
        </div>

        {files.length === 0 ? (
          <p className="empty-files">No CVs selected yet.</p>
        ) : (
          <ul className="file-list">
            {files.map((file) => (
              <li className="file-item" key={fileKey(file)}>
                <div className="file-details">
                  <strong>{file.name}</strong>
                  <span>{formatSize(file.size)} · Ready to upload</span>
                </div>

                <button
                  type="button"
                  className="remove-button"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => removeFile(file)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="upload-actions">
          <button type="button" className="back-button" onClick={onBack}>
            ← Back
          </button>

          <button
            type="button"
            disabled={files.length === 0}
            onClick={onContinue}
          >
            Preview demo results →
          </button>
        </div>
      </section>
    </>
  );
}

export default UploadPage;
