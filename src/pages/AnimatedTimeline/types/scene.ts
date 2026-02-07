export type SceneRenderMode = 'legacy-svg' | 'cinematic-hybrid';
export type SceneAssetVersion = 'v1' | 'v2';

export type SceneAccentPreset = 'embers' | 'dust' | 'laurel' | 'steel-glint' | 'none';

export interface SceneLayer {
  id: string;
  src: string;
  parallax: number;
  opacity: number;
  blendMode?: 'normal' | 'screen' | 'overlay' | 'soft-light' | 'multiply' | 'lighten';
}

export interface SceneCamera {
  driftX: number;
  driftY: number;
  zoomFrom: number;
  zoomTo: number;
}

interface BaseSceneSpec {
  renderMode: SceneRenderMode;
  fallbackIllustrationKey?: string;
}

export interface LegacySceneSpec extends BaseSceneSpec {
  renderMode: 'legacy-svg';
}

export interface CinematicSceneSpec extends BaseSceneSpec {
  renderMode: 'cinematic-hybrid';
  layers: SceneLayer[];
  accentPreset: SceneAccentPreset;
  accentIntensity?: number;
  camera: SceneCamera;
}

export type SceneSpec = LegacySceneSpec | CinematicSceneSpec;
