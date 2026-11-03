import { useState } from "react";
import type { Candidate, Criterion } from "../types/candidate";

type ResultsPageProps = {
  jobTitle: string;
  candidates: Candidate[];
  shortlistedIds: string[];
  onToggleShortlist: (id: string) => void;
  onBack: () => void;
};

const assessmentLabels: Record<Criterion["assessment"], string> = {
  supported: "Evidence found",
  partial: "Partial evidence",
  unknown: "Needs confirmation",
};

function ResultsPage({
  jobTitle,
  candidates,
  shortlistedIds,
  onToggleShortlist,
  onBack,
}: ResultsPageProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    candidates[0]?.id ?? null,
  );
  const [showShortlistedOnly, setShowShortlistedOnly] = useState(false);

  const visibleCandidates = candidates.filter(
    (candidate) =>
      !showShortlistedOnly || shortlistedIds.includes(candidate.id),
  );

  const selectedCandidate =
    visibleCandidates.find((candidate) => candidate.id === selectedId) ??
    visibleCandidates[0] ??
    null;

  return (
    <>
      <p className="step">STEP 3 OF 3 · REVIEW CANDIDATES</p>

      <h1>Explore candidate experience.</h1>

      <p className="intro">
        Reviewing for <strong>{jobTitle}</strong>
      </p>

      <div className="demo-notice">
        <strong>Demo preview</strong>
        <p>
          These are fictional profiles with fixed electronics criteria. Your
          selected files have not been uploaded or analyzed.
        </p>
      </div>

      <div className="results-toolbar">
        <p aria-live="polite">
          {visibleCandidates.length} profiles · {shortlistedIds.length}{" "}
          shortlisted
        </p>

        <label className="shortlist-filter">
          <input
            type="checkbox"
            checked={showShortlistedOnly}
            onChange={(event) => setShowShortlistedOnly(event.target.checked)}
          />
          Show shortlist only
        </label>
      </div>

      <div className="results-layout">
        <section aria-label="Candidate list">
          {visibleCandidates.length === 0 ? (
            <p className="empty-files">
              No shortlisted candidates yet. Uncheck the filter to view all
              profiles.
            </p>
          ) : (
            <ul className="candidate-list">
              {visibleCandidates.map((candidate) => {
                const isSelected = selectedCandidate?.id === candidate.id;

                return (
                  <li key={candidate.id}>
                    <button
                      type="button"
                      className={`candidate-card ${
                        isSelected ? "is-selected" : ""
                      }`}
                      aria-pressed={isSelected}
                      onClick={() => setSelectedId(candidate.id)}
                    >
                      <strong>{candidate.name}</strong>
                      <span>{candidate.headline}</span>

                      <span className="skill-list">
                        {candidate.skills.map((skill) => (
                          <span className="skill-tag" key={skill}>
                            {skill}
                          </span>
                        ))}
                      </span>

                      {shortlistedIds.includes(candidate.id) && (
                        <span className="shortlist-marker">Shortlisted</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {selectedCandidate && (
          <section
            className="candidate-detail"
            aria-label={`Details for ${selectedCandidate.name}`}
          >
            <p className="detail-eyebrow">CANDIDATE PROFILE</p>
            <h2>{selectedCandidate.name}</h2>
            <p className="candidate-headline">{selectedCandidate.headline}</p>

            <button
              type="button"
              className="shortlist-button"
              aria-pressed={shortlistedIds.includes(selectedCandidate.id)}
              onClick={() => onToggleShortlist(selectedCandidate.id)}
            >
              {shortlistedIds.includes(selectedCandidate.id)
                ? "Remove from shortlist"
                : "Add to shortlist"}
            </button>

            <h3>Experience summary</h3>
            <p className="candidate-summary">{selectedCandidate.summary}</p>

            <h3>Requirement review</h3>

            <div className="criteria-list">
              {selectedCandidate.criteria.map((criterion) => (
                <article className="criterion" key={criterion.requirement}>
                  <h4>{criterion.requirement}</h4>

                  <span className={`assessment ${criterion.assessment}`}>
                    {assessmentLabels[criterion.assessment]}
                  </span>

                  {criterion.evidence ? (
                    <details>
                      <summary>View example evidence</summary>
                      <blockquote>{criterion.evidence}</blockquote>
                    </details>
                  ) : (
                    <p className="missing-evidence">
                      No evidence in this demo profile. Confirm during an
                      interview.
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="results-footer">
        <button type="button" className="back-button" onClick={onBack}>
          ← Back to CV selection
        </button>
      </div>
    </>
  );
}

export default ResultsPage;
