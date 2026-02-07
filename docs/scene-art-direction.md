# Scene Art Direction (Animated Timeline)

This document defines how to produce and review cinematic timeline scene art.

## Scope

- Runtime renderer: cinematic-hybrid scene stack (`bg`, `mid`, `fg` layer images + subtle accents).
- New manual art path: `src/pages/AnimatedTimeline/assets/scenes-v2/<event-id>/{bg,mid,fg}.svg`.
- Legacy generator (`scripts/generate-cinematic-assets.py`) remains available for v1 fallback only.

## Visual Constraints

- Event recognizability comes first. A viewer should identify the event in under 2 seconds.
- Preserve timeline palette and mood; avoid bright modern colors.
- Keep lower-left overlay region calm/darker to protect text readability.
- Use layers intentionally:
- `bg`: environment and depth context.
- `mid`: primary narrative subject.
- `fg`: atmospheric framing and foreground silhouettes.

## Quality Rubric

Each scene must pass all checks:

- Subject is recognizable at first glance.
- Historical cue is clear and event-specific.
- Headline/subtitle remain readable on desktop and mobile.
- Layer composition produces clear depth when parallax animates.
- Motion feels coherent and does not distract from narrative focus.

## Composition Checklist

- Include one dominant focal subject in `mid`.
- Keep silhouette contrast strong enough at reduced brightness.
- Avoid generic abstract bars/shapes without semantic meaning.
- Avoid detail overload in the left-lower text zone.
- Validate crop safety at desktop and mobile viewport sizes.

## QA Workflow

Use dev QA mode:

- Open `/animated?qa=1`.
- Switch `v1` and `v2` using the QA panel.
- Review each checklist item and record pass/fail.
- If `v2` is unavailable for an event, app will show `v1` fallback.

## Notes on Assets

- Use original in-repo artwork only for the current rollout.
- Keep files vector (`.svg`) unless a future change explicitly requires raster sources.
- Maintain one `bg`, one `mid`, and one `fg` file per event.

## Full Rollout Complete

Status labels:

- `IMPLEMENTED_PENDING_QA`: v2 assets and scene specs are wired, awaiting full checklist signoff in QA mode.

Current v2 event coverage and acceptance status:

- `founding-of-rome`: `IMPLEMENTED_PENDING_QA`
- `republic-established`: `IMPLEMENTED_PENDING_QA`
- `gallic-sack`: `IMPLEMENTED_PENDING_QA`
- `pyrrhic-war`: `IMPLEMENTED_PENDING_QA`
- `hannibal-crosses-alps`: `IMPLEMENTED_PENDING_QA`
- `battle-cannae`: `IMPLEMENTED_PENDING_QA`
- `carthage-destroyed`: `IMPLEMENTED_PENDING_QA`
- `spartacus-revolt`: `IMPLEMENTED_PENDING_QA`
- `rubicon`: `IMPLEMENTED_PENDING_QA`
- `caesar-assassination`: `IMPLEMENTED_PENDING_QA`
- `augustus-princeps`: `IMPLEMENTED_PENDING_QA`
- `colosseum-opens`: `IMPLEMENTED_PENDING_QA`
- `empire-maximum`: `IMPLEMENTED_PENDING_QA`
- `marcus-aurelius`: `IMPLEMENTED_PENDING_QA`
- `crisis-third-century`: `IMPLEMENTED_PENDING_QA`
- `milvian-bridge`: `IMPLEMENTED_PENDING_QA`
- `alaric-sacks-rome`: `IMPLEMENTED_PENDING_QA`
- `fall-western-empire`: `IMPLEMENTED_PENDING_QA`
