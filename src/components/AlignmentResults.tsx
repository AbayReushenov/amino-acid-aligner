import { AlignmentResult } from '@/types/aminoAcid.types';
import React from "react";

const AlignmentResults: React.FC<AlignmentResult> = ({ sequence1, sequence2, stats }) => (
  <div className="results-section">
    <h2>Alignment Results</h2>
    <div className="alignment-container">
      <div className="sequence-row">
        <div className="sequence-label">Sequence 1:</div>
        <div className="sequence-display">{sequence1}</div>
      </div>
      <div className="sequence-row">
        <div className="sequence-label">Sequence 2:</div>
        <div className="sequence-display">{sequence2}</div>
      </div>
    </div>
    <div className="alignment-stats">
      <div className="stats-item"><span>Length:</span><span>{stats.length}</span></div>
      <div className="stats-item"><span>Matches:</span><span>{stats.matches}</span></div>
      <div className="stats-item"><span>Differences:</span><span>{stats.differences}</span></div>
      <div className="stats-item"><span>Similarity:</span><span>{stats.similarity}%</span></div>
    </div>
  </div>
);

export default AlignmentResults;
