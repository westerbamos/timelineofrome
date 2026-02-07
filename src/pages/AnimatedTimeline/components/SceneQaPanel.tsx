import type { AnimatedEvent } from '../data/animatedEvents';
import type { SceneAssetVersion } from '../types/scene';
import styles from './SceneQaPanel.module.css';

export type SceneQaCheckId =
  | 'recognizable'
  | 'historicalCue'
  | 'textReadable'
  | 'depth'
  | 'motion';

export type SceneQaChecklist = Record<SceneQaCheckId, boolean>;

export const SCENE_QA_CHECK_ITEMS: Array<{ id: SceneQaCheckId; label: string }> = [
  { id: 'recognizable', label: 'Subject is recognizable at first glance' },
  { id: 'historicalCue', label: 'Historical cue is clear and event-specific' },
  { id: 'textReadable', label: 'Headline/subtitle remain readable' },
  { id: 'depth', label: 'Layering creates convincing depth' },
  { id: 'motion', label: 'Parallax/motion feels coherent' },
];

interface SceneQaPanelProps {
  events: AnimatedEvent[];
  currentIndex: number;
  sceneVersion: SceneAssetVersion;
  hasV2ForCurrentEvent: boolean;
  isPlaying: boolean;
  checklist: SceneQaChecklist;
  onSelectEvent: (index: number) => void;
  onSceneVersionChange: (version: SceneAssetVersion) => void;
  onTogglePlay: () => void;
  onChecklistChange: (item: SceneQaCheckId, checked: boolean) => void;
}

export function SceneQaPanel({
  events,
  currentIndex,
  sceneVersion,
  hasV2ForCurrentEvent,
  isPlaying,
  checklist,
  onSelectEvent,
  onSceneVersionChange,
  onTogglePlay,
  onChecklistChange,
}: SceneQaPanelProps) {
  const currentEvent = events[currentIndex];
  const completedCount = SCENE_QA_CHECK_ITEMS.filter((item) => checklist[item.id]).length;
  const isPass = completedCount === SCENE_QA_CHECK_ITEMS.length;

  return (
    <aside className={styles.panel} aria-label="Scene quality QA">
      <header className={styles.header}>
        <p className={styles.kicker}>Dev QA</p>
        <h2 className={styles.title}>Scene Review</h2>
      </header>

      <label className={styles.fieldLabel} htmlFor="qa-event-select">
        Event
      </label>
      <select
        id="qa-event-select"
        value={currentIndex}
        className={styles.select}
        onChange={(event) => onSelectEvent(Number(event.target.value))}
      >
        {events.map((event, index) => (
          <option key={event.id} value={index}>
            {event.yearDisplay} - {event.title}
          </option>
        ))}
      </select>

      <div className={styles.row}>
        <span className={styles.fieldLabel}>Version</span>
        <div className={styles.toggleGroup} role="group" aria-label="Scene version">
          <button
            type="button"
            className={sceneVersion === 'v1' ? styles.toggleActive : styles.toggle}
            onClick={() => onSceneVersionChange('v1')}
          >
            v1
          </button>
          <button
            type="button"
            className={sceneVersion === 'v2' ? styles.toggleActive : styles.toggle}
            onClick={() => onSceneVersionChange('v2')}
          >
            v2
          </button>
        </div>
      </div>

      {sceneVersion === 'v2' && !hasV2ForCurrentEvent ? (
        <p className={styles.hint}>No v2 asset exists for this event yet, showing v1 fallback.</p>
      ) : null}

      <div className={styles.row}>
        <span className={styles.fieldLabel}>Autoplay</span>
        <button
          type="button"
          className={isPlaying ? styles.toggleActive : styles.toggle}
          onClick={onTogglePlay}
        >
          {isPlaying ? 'Playing' : 'Paused'}
        </button>
      </div>

      <p className={styles.meta}>
        Reviewing: <strong>{currentEvent.title}</strong>
      </p>

      <fieldset className={styles.checklist}>
        <legend className={styles.fieldLabel}>Quality Checklist</legend>
        {SCENE_QA_CHECK_ITEMS.map((item) => (
          <label key={item.id} className={styles.checkRow}>
            <input
              type="checkbox"
              checked={checklist[item.id]}
              onChange={(event) => onChecklistChange(item.id, event.target.checked)}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </fieldset>

      <footer className={styles.footer}>
        <p className={styles.score}>
          {completedCount}/{SCENE_QA_CHECK_ITEMS.length} checks complete
        </p>
        <p className={isPass ? styles.pass : styles.pending}>{isPass ? 'PASS' : 'Needs work'}</p>
      </footer>
    </aside>
  );
}
