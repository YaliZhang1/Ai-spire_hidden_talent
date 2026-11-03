import { useState } from "react";
import ResultsPage from "./pages/ResultsPage";
import { demoCandidates } from "./mocks/candidates";
import "./App.css";

function App() {
  const [step, setStep] = useState<1 | 2>(1);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  function toggleShortlist(id: string) {
    setShortlistedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <div className="app">
      <header className="header">
        <strong className="brand">Hidden Talent</strong>
        <span>Recruitment Assistant</span>
      </header>

      <main className={`main ${step === 2 ? "main-wide" : ""}`}>
        {step === 1 ? (
          <>
            <p className="step">STEP 1 OF 2 · DEFINE YOUR ROLE</p>

            <h1>Find the talent behind the CV.</h1>

            <p className="intro">
              Describe your role to explore relevant skills and transferable
              experience in the existing candidate library.
            </p>

            <form
              className="job-form"
              onSubmit={(event) => {
                event.preventDefault();

                if (!jobTitle.trim() || !jobDescription.trim()) {
                  return;
                }

                setStep(2);
              }}
            >
              <h2>Who are you looking for?</h2>

              <label htmlFor="job-title">Job title</label>
              <input
                id="job-title"
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                placeholder="e.g. Electronics Test Technician"
                required
              />

              <label htmlFor="job-description">
                Job description and requirements
              </label>
              <textarea
                id="job-description"
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
                placeholder="Describe the responsibilities, essential skills and any training you can provide..."
                rows={8}
                required
              />

              <button
                type="submit"
                disabled={!jobTitle.trim() || !jobDescription.trim()}
              >
                Preview candidate results →
              </button>

              <p className="form-note">
                No CV upload is needed. The final app will search the existing
                candidate library.
              </p>

              <p className="form-note">
                Demo mode: the next page shows sample candidates. Live search
                will be available when the backend is connected.
              </p>
            </form>
          </>
        ) : (
          <>
            <p className="step">STEP 2 OF 2 · REVIEW CANDIDATES</p>

            <p className="form-note" role="note">
              Demo results — these sample candidates have not been matched
              against your job requirements.
            </p>

            <ResultsPage
              jobTitle={jobTitle}
              candidates={demoCandidates}
              shortlistedIds={shortlistedIds}
              onToggleShortlist={toggleShortlist}
              onBack={() => setStep(1)}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
