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

  const shortlistedCount = candidates.filter((candidate) =>
    shortlistedIds.includes(candidate.id),
  ).length;

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
      <p className="step">STEP 2 OF 2 · REVIEW CANDIDATES</p>

      <h1>Explore the talent behind the experience.</h1>

      <p className="intro">
        Reviewing for <strong>{jobTitle}</strong>. Explore skills, supporting
        evidence and questions to follow up.
      </p>

      <div className="demo-notice" role="note">
        <strong>Demo preview</strong>
        <p>
          These fictional profiles use fixed electronics criteria to demonstrate
          the review experience. They have not been matched against your job
          requirements. Live candidate search will be available when the backend
          is connected.
        </p>
      </div>

      <div className="results-toolbar">
        <p aria-live="polite">
          {visibleCandidates.length} profiles · {shortlistedCount} shortlisted
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
            <div className="empty-files" role="status">
              <p>
                {showShortlistedOnly
                  ? "Your shortlist is empty. Add candidates while reviewing their profiles."
                  : "No candidates are available to review."}
              </p>

              {showShortlistedOnly && (
                <button
                  type="button"
                  className="back-button"
                  onClick={() => setShowShortlistedOnly(false)}
                >
                  View all candidates
                </button>
              )}
            </div>
          ) : (
            <ul className="candidate-list">
              {visibleCandidates.map((candidate) => {
                const isSelected = selectedCandidate?.id === candidate.id;
                const isShortlisted = shortlistedIds.includes(candidate.id);

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

                      {isShortlisted && (
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

            <p className="form-note">Candidate ID: {selectedCandidate.id}</p>

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
              {selectedCandidate.criteria.length === 0 ? (
                <p className="missing-evidence">
                  No requirement assessment is available for this profile yet.
                </p>
              ) : (
                selectedCandidate.criteria.map((criterion) => (
                  <article className="criterion" key={criterion.requirement}>
                    <h4>{criterion.requirement}</h4>

                    <span className={`assessment ${criterion.assessment}`}>
                      {assessmentLabels[criterion.assessment]}
                    </span>

                    {criterion.evidence ? (
                      <details>
                        <summary>View supporting evidence</summary>
                        <blockquote>{criterion.evidence}</blockquote>
                      </details>
                    ) : (
                      <p className="missing-evidence">
                        No supporting evidence is provided. This needs
                        confirmation and does not mean the candidate lacks the
                        skill.
                      </p>
                    )}
                  </article>
                ))
              )}
            </div>

            <p className="form-note">
              Use this review to support your assessment. Confirm important
              requirements with the candidate before making a hiring decision.
            </p>
          </section>
        )}
      </div>

      <div className="results-footer">
        <button type="button" className="back-button" onClick={onBack}>
          ← Edit job requirements
        </button>
      </div>
    </>
  );
}

export default ResultsPage;
