import { useRef, useState } from "react";
import type { FormEvent } from "react";
import ResultsPage from "./pages/ResultsPage";
import type { Candidate } from "./types/candidate";
import { searchCandidates } from "./services/api";
import type { DemoScenario } from "./services/api";
import "./App.css";

function App() {
  const [step, setStep] = useState<1 | 2>(1);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoScenario, setDemoScenario] = useState<DemoScenario>("success");

  const requestInProgress = useRef(false);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      requestInProgress.current ||
      !jobTitle.trim() ||
      !jobDescription.trim()
    ) {
      return;
    }

    requestInProgress.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const results = await searchCandidates(
        {
          jobTitle: jobTitle.trim(),
          jobDescription: jobDescription.trim(),
        },
        demoScenario,
      );

      setCandidates(results);
      setStep(2);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      requestInProgress.current = false;
      setIsLoading(false);
    }
  }

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

            <h1>See the evidence. Discover the potential.</h1>

            <p className="intro">
              Describe your role to explore relevant skills and transferable
              experience in the existing candidate library.
            </p>

            <form
              className="job-form"
              onSubmit={handleSearch}
              aria-busy={isLoading}
            >
              <h2>Who are you looking for?</h2>

              <label htmlFor="job-title">Job title</label>
              <input
                id="job-title"
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                placeholder="e.g. Electronics Test Technician"
                disabled={isLoading}
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
                disabled={isLoading}
                required
              />

              <details>
                <summary>Demo testing options</summary>

                <label htmlFor="demo-scenario">Simulated response</label>
                <select
                  id="demo-scenario"
                  value={demoScenario}
                  onChange={(event) => {
                    setDemoScenario(event.target.value as DemoScenario);
                    setError(null);
                  }}
                  disabled={isLoading}
                >
                  <option value="success">Show sample candidates</option>
                  <option value="empty">No candidates</option>
                  <option value="error">Request failed</option>
                </select>
              </details>

              {error && (
                <p className="form-note" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={
                  isLoading || !jobTitle.trim() || !jobDescription.trim()
                }
              >
                {isLoading
                  ? "Loading demo candidates…"
                  : error
                    ? "Try again →"
                    : "Preview candidate results →"}
              </button>

              <p className="form-note" role="status">
                {isLoading
                  ? "Simulating a request. Please wait…"
                  : "Demo mode: sample profiles only. Live search is not connected yet."}
              </p>

              <p className="form-note">
                No CV upload is needed. The final app will search the existing
                candidate library.
              </p>
            </form>
          </>
        ) : (
          <ResultsPage
            jobTitle={jobTitle}
            candidates={candidates}
            shortlistedIds={shortlistedIds}
            onToggleShortlist={toggleShortlist}
            onBack={() => setStep(1)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
