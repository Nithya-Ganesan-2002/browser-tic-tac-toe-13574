import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Controls - action panel under the board.
 * Props:
 * - mode: 'pvp' | 'ai'
 * - onModeChange: (newMode) => void
 * - onReset: () => void
 * - xStarts: boolean
 * - onToggleStarter: () => void
 */
export default function Controls({
  mode,
  onModeChange,
  onReset,
  xStarts,
  onToggleStarter,
}) {
  return (
    <div className="controls">
      <div className="mode-toggle" role="group" aria-label="Game mode selection">
        <button
          type="button"
          className={`btn ${mode === 'pvp' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onModeChange('pvp')}
          aria-pressed={mode === 'pvp'}
        >
          Player vs Player
        </button>
        <button
          type="button"
          className={`btn ${mode === 'ai' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onModeChange('ai')}
          aria-pressed={mode === 'ai'}
        >
          Player vs Computer
        </button>
      </div>

      <div className="options">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onReset}
        >
          Reset
        </button>

        <button
          type="button"
          className="btn btn-accent"
          onClick={onToggleStarter}
          title="Toggle starter"
        >
          {xStarts ? 'X starts' : 'O starts'}
        </button>
      </div>
    </div>
  );
}
