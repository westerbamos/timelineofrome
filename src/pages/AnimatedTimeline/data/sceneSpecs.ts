import { ANIMATED_EVENTS } from './animatedEvents';
import type {
  CinematicSceneSpec,
  SceneAccentPreset,
  SceneAssetVersion,
  SceneCamera,
  SceneLayer,
  SceneSpec,
} from '../types/scene';

import foundingOfRomeBg from '../assets/scenes/founding-of-rome/bg.webp';
import foundingOfRomeMid from '../assets/scenes/founding-of-rome/mid.webp';
import foundingOfRomeFg from '../assets/scenes/founding-of-rome/fg.webp';
import republicEstablishedBg from '../assets/scenes/republic-established/bg.webp';
import republicEstablishedMid from '../assets/scenes/republic-established/mid.webp';
import republicEstablishedFg from '../assets/scenes/republic-established/fg.webp';
import gallicSackBg from '../assets/scenes/gallic-sack/bg.webp';
import gallicSackMid from '../assets/scenes/gallic-sack/mid.webp';
import gallicSackFg from '../assets/scenes/gallic-sack/fg.webp';
import pyrrhicWarBg from '../assets/scenes/pyrrhic-war/bg.webp';
import pyrrhicWarMid from '../assets/scenes/pyrrhic-war/mid.webp';
import pyrrhicWarFg from '../assets/scenes/pyrrhic-war/fg.webp';
import hannibalCrossesAlpsBg from '../assets/scenes/hannibal-crosses-alps/bg.webp';
import hannibalCrossesAlpsMid from '../assets/scenes/hannibal-crosses-alps/mid.webp';
import hannibalCrossesAlpsFg from '../assets/scenes/hannibal-crosses-alps/fg.webp';
import battleCannaeBg from '../assets/scenes/battle-cannae/bg.webp';
import battleCannaeMid from '../assets/scenes/battle-cannae/mid.webp';
import battleCannaeFg from '../assets/scenes/battle-cannae/fg.webp';
import carthageDestroyedBg from '../assets/scenes/carthage-destroyed/bg.webp';
import carthageDestroyedMid from '../assets/scenes/carthage-destroyed/mid.webp';
import carthageDestroyedFg from '../assets/scenes/carthage-destroyed/fg.webp';
import spartacusRevoltBg from '../assets/scenes/spartacus-revolt/bg.webp';
import spartacusRevoltMid from '../assets/scenes/spartacus-revolt/mid.webp';
import spartacusRevoltFg from '../assets/scenes/spartacus-revolt/fg.webp';
import rubiconBg from '../assets/scenes/rubicon/bg.webp';
import rubiconMid from '../assets/scenes/rubicon/mid.webp';
import rubiconFg from '../assets/scenes/rubicon/fg.webp';
import caesarAssassinationBg from '../assets/scenes/caesar-assassination/bg.webp';
import caesarAssassinationMid from '../assets/scenes/caesar-assassination/mid.webp';
import caesarAssassinationFg from '../assets/scenes/caesar-assassination/fg.webp';
import augustusPrincepsBg from '../assets/scenes/augustus-princeps/bg.webp';
import augustusPrincepsMid from '../assets/scenes/augustus-princeps/mid.webp';
import augustusPrincepsFg from '../assets/scenes/augustus-princeps/fg.webp';
import colosseumOpensBg from '../assets/scenes/colosseum-opens/bg.webp';
import colosseumOpensMid from '../assets/scenes/colosseum-opens/mid.webp';
import colosseumOpensFg from '../assets/scenes/colosseum-opens/fg.webp';
import empireMaximumBg from '../assets/scenes/empire-maximum/bg.webp';
import empireMaximumMid from '../assets/scenes/empire-maximum/mid.webp';
import empireMaximumFg from '../assets/scenes/empire-maximum/fg.webp';
import marcusAureliusBg from '../assets/scenes/marcus-aurelius/bg.webp';
import marcusAureliusMid from '../assets/scenes/marcus-aurelius/mid.webp';
import marcusAureliusFg from '../assets/scenes/marcus-aurelius/fg.webp';
import crisisThirdCenturyBg from '../assets/scenes/crisis-third-century/bg.webp';
import crisisThirdCenturyMid from '../assets/scenes/crisis-third-century/mid.webp';
import crisisThirdCenturyFg from '../assets/scenes/crisis-third-century/fg.webp';
import milvianBridgeBg from '../assets/scenes/milvian-bridge/bg.webp';
import milvianBridgeMid from '../assets/scenes/milvian-bridge/mid.webp';
import milvianBridgeFg from '../assets/scenes/milvian-bridge/fg.webp';
import alaricSacksRomeBg from '../assets/scenes/alaric-sacks-rome/bg.webp';
import alaricSacksRomeMid from '../assets/scenes/alaric-sacks-rome/mid.webp';
import alaricSacksRomeFg from '../assets/scenes/alaric-sacks-rome/fg.webp';
import fallWesternEmpireBg from '../assets/scenes/fall-western-empire/bg.webp';
import fallWesternEmpireMid from '../assets/scenes/fall-western-empire/mid.webp';
import fallWesternEmpireFg from '../assets/scenes/fall-western-empire/fg.webp';

import foundingOfRomeBgV2 from '../assets/scenes-v2/founding-of-rome/bg.svg';
import foundingOfRomeMidV2 from '../assets/scenes-v2/founding-of-rome/mid.svg';
import foundingOfRomeFgV2 from '../assets/scenes-v2/founding-of-rome/fg.svg';
import republicEstablishedBgV2 from '../assets/scenes-v2/republic-established/bg.svg';
import republicEstablishedMidV2 from '../assets/scenes-v2/republic-established/mid.svg';
import republicEstablishedFgV2 from '../assets/scenes-v2/republic-established/fg.svg';
import gallicSackBgV2 from '../assets/scenes-v2/gallic-sack/bg.svg';
import gallicSackMidV2 from '../assets/scenes-v2/gallic-sack/mid.svg';
import gallicSackFgV2 from '../assets/scenes-v2/gallic-sack/fg.svg';
import pyrrhicWarBgV2 from '../assets/scenes-v2/pyrrhic-war/bg.svg';
import pyrrhicWarMidV2 from '../assets/scenes-v2/pyrrhic-war/mid.svg';
import pyrrhicWarFgV2 from '../assets/scenes-v2/pyrrhic-war/fg.svg';
import hannibalCrossesAlpsBgV2 from '../assets/scenes-v2/hannibal-crosses-alps/bg.svg';
import hannibalCrossesAlpsMidV2 from '../assets/scenes-v2/hannibal-crosses-alps/mid.svg';
import hannibalCrossesAlpsFgV2 from '../assets/scenes-v2/hannibal-crosses-alps/fg.svg';
import battleCannaeBgV2 from '../assets/scenes-v2/battle-cannae/bg.svg';
import battleCannaeMidV2 from '../assets/scenes-v2/battle-cannae/mid.svg';
import battleCannaeFgV2 from '../assets/scenes-v2/battle-cannae/fg.svg';
import carthageDestroyedBgV2 from '../assets/scenes-v2/carthage-destroyed/bg.svg';
import carthageDestroyedMidV2 from '../assets/scenes-v2/carthage-destroyed/mid.svg';
import carthageDestroyedFgV2 from '../assets/scenes-v2/carthage-destroyed/fg.svg';
import spartacusRevoltBgV2 from '../assets/scenes-v2/spartacus-revolt/bg.svg';
import spartacusRevoltMidV2 from '../assets/scenes-v2/spartacus-revolt/mid.svg';
import spartacusRevoltFgV2 from '../assets/scenes-v2/spartacus-revolt/fg.svg';
import rubiconBgV2 from '../assets/scenes-v2/rubicon/bg.svg';
import rubiconMidV2 from '../assets/scenes-v2/rubicon/mid.svg';
import rubiconFgV2 from '../assets/scenes-v2/rubicon/fg.svg';
import caesarAssassinationBgV2 from '../assets/scenes-v2/caesar-assassination/bg.svg';
import caesarAssassinationMidV2 from '../assets/scenes-v2/caesar-assassination/mid.svg';
import caesarAssassinationFgV2 from '../assets/scenes-v2/caesar-assassination/fg.svg';
import augustusPrincepsBgV2 from '../assets/scenes-v2/augustus-princeps/bg.svg';
import augustusPrincepsMidV2 from '../assets/scenes-v2/augustus-princeps/mid.svg';
import augustusPrincepsFgV2 from '../assets/scenes-v2/augustus-princeps/fg.svg';
import colosseumOpensBgV2 from '../assets/scenes-v2/colosseum-opens/bg.svg';
import colosseumOpensMidV2 from '../assets/scenes-v2/colosseum-opens/mid.svg';
import colosseumOpensFgV2 from '../assets/scenes-v2/colosseum-opens/fg.svg';
import empireMaximumBgV2 from '../assets/scenes-v2/empire-maximum/bg.svg';
import empireMaximumMidV2 from '../assets/scenes-v2/empire-maximum/mid.svg';
import empireMaximumFgV2 from '../assets/scenes-v2/empire-maximum/fg.svg';
import marcusAureliusBgV2 from '../assets/scenes-v2/marcus-aurelius/bg.svg';
import marcusAureliusMidV2 from '../assets/scenes-v2/marcus-aurelius/mid.svg';
import marcusAureliusFgV2 from '../assets/scenes-v2/marcus-aurelius/fg.svg';
import crisisThirdCenturyBgV2 from '../assets/scenes-v2/crisis-third-century/bg.svg';
import crisisThirdCenturyMidV2 from '../assets/scenes-v2/crisis-third-century/mid.svg';
import crisisThirdCenturyFgV2 from '../assets/scenes-v2/crisis-third-century/fg.svg';
import milvianBridgeBgV2 from '../assets/scenes-v2/milvian-bridge/bg.svg';
import milvianBridgeMidV2 from '../assets/scenes-v2/milvian-bridge/mid.svg';
import milvianBridgeFgV2 from '../assets/scenes-v2/milvian-bridge/fg.svg';
import alaricSacksRomeBgV2 from '../assets/scenes-v2/alaric-sacks-rome/bg.svg';
import alaricSacksRomeMidV2 from '../assets/scenes-v2/alaric-sacks-rome/mid.svg';
import alaricSacksRomeFgV2 from '../assets/scenes-v2/alaric-sacks-rome/fg.svg';
import fallWesternEmpireBgV2 from '../assets/scenes-v2/fall-western-empire/bg.svg';
import fallWesternEmpireMidV2 from '../assets/scenes-v2/fall-western-empire/mid.svg';
import fallWesternEmpireFgV2 from '../assets/scenes-v2/fall-western-empire/fg.svg';

type SceneProfile = 'battle' | 'ceremony' | 'collapse' | 'map';

interface SceneSpecVersions {
  v1: CinematicSceneSpec;
  v2?: CinematicSceneSpec;
}

export const PILOT_SCENE_IDS = [
  'founding-of-rome',
  'republic-established',
  'gallic-sack',
  'pyrrhic-war',
  'hannibal-crosses-alps',
  'battle-cannae',
] as const;

const battleProfile: SceneCamera = {
  driftX: 14,
  driftY: -6,
  zoomFrom: 1.03,
  zoomTo: 1.08,
};

const ceremonyProfile: SceneCamera = {
  driftX: -9,
  driftY: -7,
  zoomFrom: 1.02,
  zoomTo: 1.07,
};

const collapseProfile: SceneCamera = {
  driftX: 10,
  driftY: -4,
  zoomFrom: 1.03,
  zoomTo: 1.08,
};

const mapProfile: SceneCamera = {
  driftX: 6,
  driftY: -5,
  zoomFrom: 1.01,
  zoomTo: 1.05,
};

function buildProfileSpec(
  eventId: string,
  bg: string,
  mid: string,
  fg: string,
  profile: SceneProfile,
  accentPreset: SceneAccentPreset,
  accentIntensity?: number
): CinematicSceneSpec {
  const cameraByProfile: Record<SceneProfile, SceneCamera> = {
    battle: battleProfile,
    ceremony: ceremonyProfile,
    collapse: collapseProfile,
    map: mapProfile,
  };

  const layersByProfile: Record<SceneProfile, SceneLayer[]> = {
    battle: [
      { id: 'bg', src: bg, parallax: 0.34, opacity: 1 },
      { id: 'mid', src: mid, parallax: 0.82, opacity: 0.97, blendMode: 'normal' },
      { id: 'fg', src: fg, parallax: 1.14, opacity: 0.72, blendMode: 'screen' },
    ],
    ceremony: [
      { id: 'bg', src: bg, parallax: 0.32, opacity: 1 },
      { id: 'mid', src: mid, parallax: 0.78, opacity: 0.96, blendMode: 'normal' },
      { id: 'fg', src: fg, parallax: 1.08, opacity: 0.64, blendMode: 'screen' },
    ],
    collapse: [
      { id: 'bg', src: bg, parallax: 0.3, opacity: 1 },
      { id: 'mid', src: mid, parallax: 0.74, opacity: 0.95, blendMode: 'normal' },
      { id: 'fg', src: fg, parallax: 1.1, opacity: 0.78, blendMode: 'screen' },
    ],
    map: [
      { id: 'bg', src: bg, parallax: 0.26, opacity: 1 },
      { id: 'mid', src: mid, parallax: 0.68, opacity: 0.92, blendMode: 'normal' },
      { id: 'fg', src: fg, parallax: 1, opacity: 0.56, blendMode: 'soft-light' },
    ],
  };

  return {
    renderMode: 'cinematic-hybrid',
    fallbackIllustrationKey: eventId,
    layers: layersByProfile[profile],
    accentPreset,
    accentIntensity,
    camera: cameraByProfile[profile],
  };
}

const cinematicSceneSpecs: Record<string, SceneSpecVersions> = {
  'founding-of-rome': {
    v1: {
      renderMode: 'cinematic-hybrid',
      fallbackIllustrationKey: 'founding-of-rome',
      layers: [
        { id: 'bg', src: foundingOfRomeBg, parallax: 0.35, opacity: 1 },
        { id: 'mid', src: foundingOfRomeMid, parallax: 0.7, opacity: 0.95, blendMode: 'soft-light' },
        { id: 'fg', src: foundingOfRomeFg, parallax: 1.05, opacity: 0.85, blendMode: 'screen' },
      ],
      accentPreset: 'embers',
      camera: {
        driftX: 14,
        driftY: -8,
        zoomFrom: 1.03,
        zoomTo: 1.08,
      },
    },
    v2: {
      renderMode: 'cinematic-hybrid',
      fallbackIllustrationKey: 'founding-of-rome',
      layers: [
        { id: 'bg', src: foundingOfRomeBgV2, parallax: 0.35, opacity: 1 },
        { id: 'mid', src: foundingOfRomeMidV2, parallax: 0.78, opacity: 0.96, blendMode: 'normal' },
        { id: 'fg', src: foundingOfRomeFgV2, parallax: 1.12, opacity: 0.74, blendMode: 'screen' },
      ],
      accentPreset: 'embers',
      accentIntensity: 0.42,
      camera: {
        driftX: 12,
        driftY: -7,
        zoomFrom: 1.03,
        zoomTo: 1.08,
      },
    },
  },
  'republic-established': {
    v1: buildProfileSpec(
      'republic-established',
      republicEstablishedBg,
      republicEstablishedMid,
      republicEstablishedFg,
      'ceremony',
      'laurel'
    ),
    v2: buildProfileSpec(
      'republic-established',
      republicEstablishedBgV2,
      republicEstablishedMidV2,
      republicEstablishedFgV2,
      'ceremony',
      'laurel',
      0.45
    ),
  },
  'gallic-sack': {
    v1: buildProfileSpec('gallic-sack', gallicSackBg, gallicSackMid, gallicSackFg, 'collapse', 'embers'),
    v2: buildProfileSpec(
      'gallic-sack',
      gallicSackBgV2,
      gallicSackMidV2,
      gallicSackFgV2,
      'collapse',
      'embers',
      0.52
    ),
  },
  'pyrrhic-war': {
    v1: buildProfileSpec('pyrrhic-war', pyrrhicWarBg, pyrrhicWarMid, pyrrhicWarFg, 'battle', 'steel-glint'),
    v2: buildProfileSpec(
      'pyrrhic-war',
      pyrrhicWarBgV2,
      pyrrhicWarMidV2,
      pyrrhicWarFgV2,
      'battle',
      'steel-glint',
      0.48
    ),
  },
  'hannibal-crosses-alps': {
    v1: buildProfileSpec(
      'hannibal-crosses-alps',
      hannibalCrossesAlpsBg,
      hannibalCrossesAlpsMid,
      hannibalCrossesAlpsFg,
      'battle',
      'dust'
    ),
    v2: buildProfileSpec(
      'hannibal-crosses-alps',
      hannibalCrossesAlpsBgV2,
      hannibalCrossesAlpsMidV2,
      hannibalCrossesAlpsFgV2,
      'battle',
      'dust',
      0.43
    ),
  },
  'battle-cannae': {
    v1: buildProfileSpec('battle-cannae', battleCannaeBg, battleCannaeMid, battleCannaeFg, 'battle', 'steel-glint'),
    v2: buildProfileSpec(
      'battle-cannae',
      battleCannaeBgV2,
      battleCannaeMidV2,
      battleCannaeFgV2,
      'battle',
      'steel-glint',
      0.47
    ),
  },
  'carthage-destroyed': {
    v1: buildProfileSpec(
      'carthage-destroyed',
      carthageDestroyedBg,
      carthageDestroyedMid,
      carthageDestroyedFg,
      'collapse',
      'embers'
    ),
    v2: buildProfileSpec(
      'carthage-destroyed',
      carthageDestroyedBgV2,
      carthageDestroyedMidV2,
      carthageDestroyedFgV2,
      'collapse',
      'embers',
      0.54
    ),
  },
  'spartacus-revolt': {
    v1: buildProfileSpec(
      'spartacus-revolt',
      spartacusRevoltBg,
      spartacusRevoltMid,
      spartacusRevoltFg,
      'battle',
      'embers'
    ),
    v2: buildProfileSpec(
      'spartacus-revolt',
      spartacusRevoltBgV2,
      spartacusRevoltMidV2,
      spartacusRevoltFgV2,
      'battle',
      'embers',
      0.5
    ),
  },
  'rubicon': {
    v1: buildProfileSpec('rubicon', rubiconBg, rubiconMid, rubiconFg, 'battle', 'dust'),
    v2: buildProfileSpec('rubicon', rubiconBgV2, rubiconMidV2, rubiconFgV2, 'battle', 'dust', 0.46),
  },
  'caesar-assassination': {
    v1: {
      renderMode: 'cinematic-hybrid',
      fallbackIllustrationKey: 'caesar-assassination',
      layers: [
        { id: 'bg', src: caesarAssassinationBg, parallax: 0.3, opacity: 1 },
        { id: 'mid', src: caesarAssassinationMid, parallax: 0.72, opacity: 0.93, blendMode: 'overlay' },
        { id: 'fg', src: caesarAssassinationFg, parallax: 1.12, opacity: 0.8, blendMode: 'screen' },
      ],
      accentPreset: 'steel-glint',
      camera: {
        driftX: 11,
        driftY: -6,
        zoomFrom: 1.03,
        zoomTo: 1.08,
      },
    },
    v2: {
      renderMode: 'cinematic-hybrid',
      fallbackIllustrationKey: 'caesar-assassination',
      layers: [
        { id: 'bg', src: caesarAssassinationBgV2, parallax: 0.31, opacity: 1 },
        { id: 'mid', src: caesarAssassinationMidV2, parallax: 0.74, opacity: 0.95, blendMode: 'normal' },
        { id: 'fg', src: caesarAssassinationFgV2, parallax: 1.1, opacity: 0.72, blendMode: 'screen' },
      ],
      accentPreset: 'steel-glint',
      accentIntensity: 0.46,
      camera: {
        driftX: 10,
        driftY: -5,
        zoomFrom: 1.03,
        zoomTo: 1.08,
      },
    },
  },
  'augustus-princeps': {
    v1: {
      renderMode: 'cinematic-hybrid',
      fallbackIllustrationKey: 'augustus-princeps',
      layers: [
        { id: 'bg', src: augustusPrincepsBg, parallax: 0.32, opacity: 1 },
        { id: 'mid', src: augustusPrincepsMid, parallax: 0.82, opacity: 1, blendMode: 'normal' },
        { id: 'fg', src: augustusPrincepsFg, parallax: 1.1, opacity: 0.6, blendMode: 'screen' },
      ],
      accentPreset: 'laurel',
      camera: {
        driftX: -10,
        driftY: -7,
        zoomFrom: 1.02,
        zoomTo: 1.07,
      },
    },
    v2: {
      renderMode: 'cinematic-hybrid',
      fallbackIllustrationKey: 'augustus-princeps',
      layers: [
        { id: 'bg', src: augustusPrincepsBgV2, parallax: 0.32, opacity: 1 },
        { id: 'mid', src: augustusPrincepsMidV2, parallax: 0.8, opacity: 0.97, blendMode: 'normal' },
        { id: 'fg', src: augustusPrincepsFgV2, parallax: 1.06, opacity: 0.62, blendMode: 'screen' },
      ],
      accentPreset: 'laurel',
      accentIntensity: 0.44,
      camera: {
        driftX: -9,
        driftY: -6,
        zoomFrom: 1.02,
        zoomTo: 1.07,
      },
    },
  },
  'colosseum-opens': {
    v1: buildProfileSpec(
      'colosseum-opens',
      colosseumOpensBg,
      colosseumOpensMid,
      colosseumOpensFg,
      'ceremony',
      'laurel'
    ),
    v2: buildProfileSpec(
      'colosseum-opens',
      colosseumOpensBgV2,
      colosseumOpensMidV2,
      colosseumOpensFgV2,
      'ceremony',
      'laurel',
      0.44
    ),
  },
  'empire-maximum': {
    v1: buildProfileSpec(
      'empire-maximum',
      empireMaximumBg,
      empireMaximumMid,
      empireMaximumFg,
      'map',
      'none'
    ),
    v2: buildProfileSpec(
      'empire-maximum',
      empireMaximumBgV2,
      empireMaximumMidV2,
      empireMaximumFgV2,
      'map',
      'none',
      0.42
    ),
  },
  'marcus-aurelius': {
    v1: buildProfileSpec(
      'marcus-aurelius',
      marcusAureliusBg,
      marcusAureliusMid,
      marcusAureliusFg,
      'battle',
      'steel-glint'
    ),
    v2: buildProfileSpec(
      'marcus-aurelius',
      marcusAureliusBgV2,
      marcusAureliusMidV2,
      marcusAureliusFgV2,
      'battle',
      'steel-glint',
      0.47
    ),
  },
  'crisis-third-century': {
    v1: buildProfileSpec(
      'crisis-third-century',
      crisisThirdCenturyBg,
      crisisThirdCenturyMid,
      crisisThirdCenturyFg,
      'collapse',
      'dust'
    ),
    v2: buildProfileSpec(
      'crisis-third-century',
      crisisThirdCenturyBgV2,
      crisisThirdCenturyMidV2,
      crisisThirdCenturyFgV2,
      'collapse',
      'dust',
      0.52
    ),
  },
  'milvian-bridge': {
    v1: buildProfileSpec(
      'milvian-bridge',
      milvianBridgeBg,
      milvianBridgeMid,
      milvianBridgeFg,
      'battle',
      'laurel'
    ),
    v2: buildProfileSpec(
      'milvian-bridge',
      milvianBridgeBgV2,
      milvianBridgeMidV2,
      milvianBridgeFgV2,
      'battle',
      'laurel',
      0.46
    ),
  },
  'alaric-sacks-rome': {
    v1: buildProfileSpec(
      'alaric-sacks-rome',
      alaricSacksRomeBg,
      alaricSacksRomeMid,
      alaricSacksRomeFg,
      'collapse',
      'embers'
    ),
    v2: buildProfileSpec(
      'alaric-sacks-rome',
      alaricSacksRomeBgV2,
      alaricSacksRomeMidV2,
      alaricSacksRomeFgV2,
      'collapse',
      'embers',
      0.53
    ),
  },
  'fall-western-empire': {
    v1: buildProfileSpec(
      'fall-western-empire',
      fallWesternEmpireBg,
      fallWesternEmpireMid,
      fallWesternEmpireFg,
      'collapse',
      'dust'
    ),
    v2: buildProfileSpec(
      'fall-western-empire',
      fallWesternEmpireBgV2,
      fallWesternEmpireMidV2,
      fallWesternEmpireFgV2,
      'collapse',
      'dust',
      0.5
    ),
  },
};

const legacySceneSpecs = ANIMATED_EVENTS.reduce<Record<string, SceneSpec>>((acc, event) => {
  acc[event.id] = {
    renderMode: 'legacy-svg',
    fallbackIllustrationKey: event.id,
  };
  return acc;
}, {});

const defaultLegacySpec: SceneSpec = {
  renderMode: 'legacy-svg',
};

function resolveVersionedSpec(
  eventId: string,
  requestedVersion: SceneAssetVersion = 'v2'
): CinematicSceneSpec | undefined {
  const versions = cinematicSceneSpecs[eventId];
  if (!versions) return undefined;
  if (requestedVersion === 'v1') return versions.v1;
  return versions.v2 ?? versions.v1;
}

export const sceneSpecs: Record<string, SceneSpec> = {
  ...legacySceneSpecs,
  ...Object.fromEntries(Object.entries(cinematicSceneSpecs).map(([eventId, versions]) => [eventId, versions.v1])),
};

export function hasSceneVersion(eventId: string, version: SceneAssetVersion): boolean {
  const versions = cinematicSceneSpecs[eventId];
  if (!versions) return false;
  if (version === 'v1') return true;
  return Boolean(versions.v2);
}

export function getSceneSpec(
  eventId: string,
  options?: {
    version?: SceneAssetVersion;
  }
): SceneSpec {
  const requestedVersion = options?.version ?? 'v2';
  const cinematicSpec = resolveVersionedSpec(eventId, requestedVersion);
  if (cinematicSpec) return cinematicSpec;
  return legacySceneSpecs[eventId] ?? defaultLegacySpec;
}

export function getSceneLayerSources(
  eventId: string,
  options?: {
    version?: SceneAssetVersion;
  }
): string[] {
  const spec = getSceneSpec(eventId, options);
  if (spec.renderMode !== 'cinematic-hybrid') return [];
  return spec.layers.map((layer) => layer.src);
}
