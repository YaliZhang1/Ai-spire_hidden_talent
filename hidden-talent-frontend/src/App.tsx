import ResultsPage from "./pages/ResultsPage";
import { demoCandidates } from "./mocks/candidates";
import { useState } from "react";
import UploadPage from "./pages/UploadPage";
import "./App.css";

function App() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="app">
      <header className="header">
        <strong className="brand">Hidden Talent</strong>
        <span>Recruitment Assistant</span>
      </header>

      <main className={`main ${step === 3 ? "main-wide" : ""}`}>
        {step === 1 ? (
          <>
            <p className="step">STEP 1 OF 3 · CREATE A ROLE</p>

            <h1>Find the talent behind the CV.</h1>

            <p className="intro">
              Start with your job requirements, then explore relevant candidate
              experience.
            </p>

            <form
              className="job-form"
              onSubmit={(event) => {
                event.preventDefault();
                setStep(2);
              }}
            >
              <h2>Create a role</h2>

              <label htmlFor="job-title">Job title</label>
              <input
                id="job-title"
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                placeholder="e.g. Electronics Test Technician"
                required
              />

              <label htmlFor="job-description">Job description</label>
              <textarea
                id="job-description"
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
                placeholder="Paste the responsibilities and requirements here..."
                rows={8}
                required
              />

              <button
                type="submit"
                disabled={!jobTitle.trim() || !jobDescription.trim()}
              >
                Continue to upload CVs →
              </button>

              <p className="form-note">
                Your requirements will guide the candidate review.
              </p>
            </form>
          </>
        ) : step === 2 ? (
          <UploadPage
            jobTitle={jobTitle}
            files={files}
            onFilesChange={setFiles}
            onBack={() => setStep(1)}
            onContinue={() => setStep(3)}
          />
        ) : (
          <ResultsPage
            jobTitle={jobTitle}
            candidates={demoCandidates}
            shortlistedIds={shortlistedIds}
            onToggleShortlist={(id) => {
              setShortlistedIds((current) =>
                current.includes(id)
                  ? current.filter((item) => item !== id)
                  : [...current, id],
              );
            }}
            onBack={() => setStep(2)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
