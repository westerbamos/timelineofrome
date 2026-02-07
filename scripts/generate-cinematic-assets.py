#!/usr/bin/env python3
"""Legacy v1 generator for cinematic hybrid scene assets.

This script is retained for fallback regeneration of v1 assets.

Outputs per event:
  src/pages/AnimatedTimeline/assets/scenes/<event-id>/{bg,mid,fg}.webp
"""

from __future__ import annotations

import argparse
import math
import os
import random
import struct
import subprocess
import sys
import zlib
from dataclasses import dataclass
from pathlib import Path

W = 1600
H = 900

ROOT = Path('src/pages/AnimatedTimeline/assets/scenes')

PROFILE_BATTLE = 'battle'
PROFILE_CEREMONY = 'ceremony'
PROFILE_COLLAPSE = 'collapse'
PROFILE_MAP = 'map'


@dataclass(frozen=True)
class EventVisual:
    profile: str
    accent: str
    motif: str


EVENTS: dict[str, EventVisual] = {
    'founding-of-rome': EventVisual(PROFILE_BATTLE, 'embers', 'founding'),
    'republic-established': EventVisual(PROFILE_CEREMONY, 'laurel', 'senate-oath'),
    'gallic-sack': EventVisual(PROFILE_COLLAPSE, 'embers', 'burning-city'),
    'pyrrhic-war': EventVisual(PROFILE_BATTLE, 'steel-glint', 'elephant-line'),
    'hannibal-crosses-alps': EventVisual(PROFILE_BATTLE, 'dust', 'alpine-march'),
    'battle-cannae': EventVisual(PROFILE_BATTLE, 'steel-glint', 'encirclement'),
    'carthage-destroyed': EventVisual(PROFILE_COLLAPSE, 'embers', 'carthage-ruin'),
    'spartacus-revolt': EventVisual(PROFILE_BATTLE, 'embers', 'rebel-camp'),
    'rubicon': EventVisual(PROFILE_BATTLE, 'dust', 'river-crossing'),
    'caesar-assassination': EventVisual(PROFILE_COLLAPSE, 'steel-glint', 'senate-fall'),
    'augustus-princeps': EventVisual(PROFILE_CEREMONY, 'laurel', 'imperial-statue'),
    'colosseum-opens': EventVisual(PROFILE_CEREMONY, 'laurel', 'amphitheatre'),
    'empire-maximum': EventVisual(PROFILE_MAP, 'none', 'imperial-map'),
    'marcus-aurelius': EventVisual(PROFILE_BATTLE, 'steel-glint', 'statue-frontier'),
    'crisis-third-century': EventVisual(PROFILE_COLLAPSE, 'dust', 'fractured-city'),
    'milvian-bridge': EventVisual(PROFILE_BATTLE, 'laurel', 'bridge-battle'),
    'alaric-sacks-rome': EventVisual(PROFILE_COLLAPSE, 'embers', 'breach-gates'),
    'fall-western-empire': EventVisual(PROFILE_COLLAPSE, 'dust', 'throne-decline'),
}

MIGRATION_EVENTS = [
    'republic-established',
    'gallic-sack',
    'pyrrhic-war',
    'hannibal-crosses-alps',
    'battle-cannae',
    'carthage-destroyed',
    'spartacus-revolt',
    'rubicon',
    'colosseum-opens',
    'empire-maximum',
    'marcus-aurelius',
    'crisis-third-century',
    'milvian-bridge',
    'alaric-sacks-rome',
    'fall-western-empire',
]

PALETTES = {
    PROFILE_BATTLE: {
        'top': (24, 14, 9),
        'bottom': (84, 40, 28),
        'highlight': (209, 121, 82),
        'shadow': (35, 20, 15),
    },
    PROFILE_CEREMONY: {
        'top': (18, 11, 8),
        'bottom': (67, 35, 25),
        'highlight': (196, 128, 89),
        'shadow': (34, 21, 16),
    },
    PROFILE_COLLAPSE: {
        'top': (14, 10, 8),
        'bottom': (61, 29, 22),
        'highlight': (176, 90, 66),
        'shadow': (29, 18, 14),
    },
    PROFILE_MAP: {
        'top': (32, 18, 12),
        'bottom': (96, 51, 34),
        'highlight': (210, 148, 104),
        'shadow': (45, 26, 19),
    },
}


def clamp(v: float, lo: int = 0, hi: int = 255) -> int:
    if v < lo:
        return lo
    if v > hi:
        return hi
    return int(v)


def hash_noise(x: int, y: int, seed: int) -> float:
    n = x * 374761393 + y * 668265263 + seed * 2147483647
    n = (n ^ (n >> 13)) * 1274126177
    n ^= n >> 16
    return (n & 0xFFFFFFFF) / 0xFFFFFFFF


def chunk(tag: bytes, payload: bytes) -> bytes:
    return (
        struct.pack('>I', len(payload))
        + tag
        + payload
        + struct.pack('>I', zlib.crc32(tag + payload) & 0xFFFFFFFF)
    )


def write_png_rgba(path: Path, w: int, h: int, data: bytearray) -> None:
    raw = bytearray()
    stride = w * 4
    for y in range(h):
        raw.append(0)
        raw.extend(data[y * stride:(y + 1) * stride])

    ihdr = struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0)
    payload = zlib.compress(bytes(raw), 9)
    with path.open('wb') as f:
        f.write(b'\x89PNG\r\n\x1a\n')
        f.write(chunk(b'IHDR', ihdr))
        f.write(chunk(b'IDAT', payload))
        f.write(chunk(b'IEND', b''))


def blend_at(data: bytearray, x: int, y: int, color: tuple[int, int, int], alpha: int) -> None:
    if x < 0 or y < 0 or x >= W or y >= H or alpha <= 0:
        return
    i = (y * W + x) * 4
    dr, dg, db, da = data[i], data[i + 1], data[i + 2], data[i + 3]
    sa = alpha
    oa = sa + (da * (255 - sa) // 255)
    if oa == 0:
        return
    data[i] = (color[0] * sa + dr * (255 - sa)) // 255
    data[i + 1] = (color[1] * sa + dg * (255 - sa)) // 255
    data[i + 2] = (color[2] * sa + db * (255 - sa)) // 255
    data[i + 3] = oa


def draw_soft_ellipse(
    data: bytearray,
    cx: float,
    cy: float,
    rx: float,
    ry: float,
    color: tuple[int, int, int],
    alpha: int,
    feather: float = 0.24,
) -> None:
    min_x = max(0, int(cx - rx * (1 + feather)))
    max_x = min(W - 1, int(cx + rx * (1 + feather)))
    min_y = max(0, int(cy - ry * (1 + feather)))
    max_y = min(H - 1, int(cy + ry * (1 + feather)))

    for y in range(min_y, max_y + 1):
        ny = (y - cy) / ry
        for x in range(min_x, max_x + 1):
            nx = (x - cx) / rx
            d = nx * nx + ny * ny
            if d > 1 + feather:
                continue
            if d <= 1:
                a = alpha
            else:
                t = (d - 1) / feather
                a = int(alpha * max(0.0, 1.0 - t))
            blend_at(data, x, y, color, a)


def draw_soft_rect(
    data: bytearray,
    x0: float,
    y0: float,
    x1: float,
    y1: float,
    color: tuple[int, int, int],
    alpha: int,
    feather: int = 10,
) -> None:
    min_x = max(0, int(x0 - feather))
    max_x = min(W - 1, int(x1 + feather))
    min_y = max(0, int(y0 - feather))
    max_y = min(H - 1, int(y1 + feather))

    for y in range(min_y, max_y + 1):
        for x in range(min_x, max_x + 1):
            dx = max(x0 - x, 0, x - x1)
            dy = max(y0 - y, 0, y - y1)
            d = max(dx, dy)
            if d > feather:
                continue
            t = d / max(1, feather)
            a = int(alpha * (1 - t))
            blend_at(data, x, y, color, a)


def draw_soft_line(
    data: bytearray,
    x0: float,
    y0: float,
    x1: float,
    y1: float,
    thickness: float,
    color: tuple[int, int, int],
    alpha: int,
) -> None:
    steps = int(max(abs(x1 - x0), abs(y1 - y0)) / 3) + 1
    for i in range(steps + 1):
        t = i / max(1, steps)
        x = x0 * (1 - t) + x1 * t
        y = y0 * (1 - t) + y1 * t
        draw_soft_ellipse(data, x, y, thickness, thickness * 0.75, color, alpha, feather=0.32)


def fill_gradient(data: bytearray, top: tuple[int, int, int], bottom: tuple[int, int, int]) -> None:
    for y in range(H):
        t = y / (H - 1)
        r = int(top[0] * (1 - t) + bottom[0] * t)
        g = int(top[1] * (1 - t) + bottom[1] * t)
        b = int(top[2] * (1 - t) + bottom[2] * t)
        for x in range(W):
            i = (y * W + x) * 4
            data[i] = r
            data[i + 1] = g
            data[i + 2] = b
            data[i + 3] = 255


def add_grain(data: bytearray, amount: int, seed: int) -> None:
    for y in range(H):
        for x in range(W):
            n = hash_noise(x, y, seed) - 0.5
            i = (y * W + x) * 4
            delta = int(n * amount)
            data[i] = clamp(data[i] + delta)
            data[i + 1] = clamp(data[i + 1] + delta)
            data[i + 2] = clamp(data[i + 2] + delta)


def add_vignette(data: bytearray, strength: float = 0.48) -> None:
    cx = W * 0.5
    cy = H * 0.52
    max_d = math.sqrt((W * 0.62) ** 2 + (H * 0.62) ** 2)
    for y in range(H):
        for x in range(W):
            dx = x - cx
            dy = y - cy
            d = math.sqrt(dx * dx + dy * dy) / max_d
            f = max(0.0, min(1.0, (d - 0.34) / 0.66))
            dark = 1.0 - strength * (f ** 1.4)
            i = (y * W + x) * 4
            data[i] = int(data[i] * dark)
            data[i + 1] = int(data[i + 1] * dark)
            data[i + 2] = int(data[i + 2] * dark)


def make_background(event_id: str, visual: EventVisual) -> bytearray:
    palette = PALETTES[visual.profile]
    data = bytearray(W * H * 4)
    fill_gradient(data, palette['top'], palette['bottom'])

    # Atmosphere glow
    for y in range(H):
        ty = y / H
        for x in range(W):
            tx = x / W
            i = (y * W + x) * 4
            glow = math.exp(-(((tx - 0.5) / 0.3) ** 2 + ((ty - 0.36) / 0.34) ** 2))
            data[i] = clamp(data[i] + palette['highlight'][0] * glow * 0.18)
            data[i + 1] = clamp(data[i + 1] + palette['highlight'][1] * glow * 0.12)
            data[i + 2] = clamp(data[i + 2] + palette['highlight'][2] * glow * 0.1)

    if visual.profile == PROFILE_BATTLE:
        # Horizon + smoke layers
        for band in range(4):
            y0 = H * (0.58 + band * 0.07)
            draw_soft_line(data, 0, y0, W, y0 + random.uniform(-25, 25), 7 + band * 2, palette['shadow'], 95 - band * 10)
        # Subtle fire glows
        for x in (180, 500, 920, 1320):
            draw_soft_ellipse(data, x, H * 0.74, 200, 70, palette['highlight'], 45, 0.42)

    elif visual.profile == PROFILE_CEREMONY:
        # Column shafts
        for cx in (220, 520, 820, 1120, 1420):
            draw_soft_rect(data, cx - 36, 0, cx + 36, H, palette['shadow'], 80, feather=30)
            draw_soft_rect(data, cx - 16, 0, cx + 16, H, palette['highlight'], 35, feather=20)
        draw_soft_ellipse(data, W * 0.5, H * 0.24, 360, 180, palette['highlight'], 60, 0.35)

    elif visual.profile == PROFILE_COLLAPSE:
        # fractured walls
        for i in range(7):
            x = 100 + i * 220
            draw_soft_rect(data, x, H * 0.56 + (i % 2) * 30, x + 120, H * 0.85, palette['shadow'], 90, 18)
        # cracks
        for i in range(8):
            x0 = random.randint(120, W - 120)
            y0 = random.randint(int(H * 0.55), int(H * 0.85))
            draw_soft_line(data, x0, y0, x0 + random.randint(-90, 90), y0 + random.randint(60, 130), 2.2, (125, 84, 66), 110)

    elif visual.profile == PROFILE_MAP:
        # parchment bands + cartography lines
        for y in range(140, H, 110):
            draw_soft_line(data, 80, y, W - 80, y + random.randint(-24, 24), 2.2, (180, 122, 86), 65)
        for _ in range(10):
            x0 = random.randint(140, W - 140)
            y0 = random.randint(120, H - 120)
            x1 = x0 + random.randint(-240, 240)
            y1 = y0 + random.randint(-160, 160)
            draw_soft_line(data, x0, y0, x1, y1, 1.8, (160, 110, 78), 70)

    add_grain(data, 10, abs(hash(event_id)) % 2000 + 17)
    add_vignette(data, 0.5)
    return data


def motif_shape(data: bytearray, motif: str) -> None:
    clay = (188, 162, 136)
    dark = (92, 70, 56)
    warm = (206, 147, 99)

    if motif == 'senate-oath':
        for i in range(6):
            x = 300 + i * 170
            draw_soft_rect(data, x, 260, x + 74, 760, dark, 210, 16)
        draw_soft_rect(data, 560, 560, 1040, 760, clay, 220, 16)
        draw_soft_ellipse(data, 800, 460, 72, 92, clay, 230, 0.2)
        draw_soft_line(data, 850, 505, 980, 430, 5, clay, 220)

    elif motif == 'burning-city':
        for i in range(7):
            x = 130 + i * 190
            h = random.randint(180, 280)
            draw_soft_rect(data, x, 720 - h, x + 120, 720, dark, 215, 14)
        for x in (280, 620, 980, 1280):
            draw_soft_ellipse(data, x, 520, 90, 160, warm, 80, 0.45)

    elif motif == 'elephant-line':
        draw_soft_ellipse(data, 710, 560, 250, 110, clay, 220, 0.2)
        draw_soft_ellipse(data, 500, 520, 92, 72, clay, 215, 0.2)
        draw_soft_rect(data, 900, 520, 1180, 590, clay, 200, 12)
        for lx in (620, 740, 850, 970):
            draw_soft_rect(data, lx, 620, lx + 36, 790, dark, 215, 10)
        for sx in range(1020, 1450, 70):
            draw_soft_line(data, sx, 540, sx + 140, 520, 2.8, clay, 185)

    elif motif == 'alpine-march':
        draw_soft_line(data, 80, 700, 520, 320, 22, dark, 180)
        draw_soft_line(data, 460, 760, 980, 260, 30, dark, 190)
        draw_soft_line(data, 920, 760, 1520, 360, 24, dark, 185)
        for i in range(9):
            x = 520 + i * 90
            y = 650 - i * 30
            draw_soft_rect(data, x, y, x + 26, y + 88, clay, 205, 8)

    elif motif == 'encirclement':
        draw_soft_ellipse(data, 780, 560, 200, 120, dark, 210, 0.22)
        draw_soft_ellipse(data, 820, 560, 320, 200, clay, 120, 0.26)
        draw_soft_ellipse(data, 820, 560, 420, 280, clay, 70, 0.28)
        for a in range(0, 360, 18):
            x = 820 + math.cos(math.radians(a)) * 420
            y = 560 + math.sin(math.radians(a)) * 280
            draw_soft_ellipse(data, x, y, 10, 10, warm, 120, 0.2)

    elif motif == 'carthage-ruin':
        for i in range(6):
            x = 180 + i * 210
            draw_soft_rect(data, x, 420 + (i % 2) * 30, x + 130, 760, dark, 210, 14)
        draw_soft_line(data, 180, 760, 1420, 760, 6, dark, 180)
        for x in (300, 520, 760, 1040, 1300):
            draw_soft_ellipse(data, x, 560, 95, 145, warm, 85, 0.44)

    elif motif == 'rebel-camp':
        for i in range(10):
            x = 260 + i * 110
            y = 600 + (i % 3) * 12
            draw_soft_ellipse(data, x, y, 28, 44, dark, 220, 0.2)
            draw_soft_line(data, x + 12, y - 22, x + 42, y - 90, 3, clay, 185)
        draw_soft_line(data, 200, 760, 1420, 740, 7, dark, 170)

    elif motif == 'river-crossing':
        draw_soft_line(data, 0, 700, 1600, 640, 18, dark, 175)
        draw_soft_line(data, 0, 730, 1600, 670, 12, clay, 85)
        draw_soft_ellipse(data, 740, 560, 120, 90, clay, 210, 0.2)
        draw_soft_rect(data, 700, 620, 900, 670, dark, 200, 10)
        draw_soft_line(data, 860, 560, 980, 520, 5, clay, 210)

    elif motif == 'amphitheatre':
        draw_soft_ellipse(data, 800, 610, 520, 220, dark, 200, 0.2)
        draw_soft_ellipse(data, 800, 610, 410, 150, clay, 150, 0.25)
        for i in range(16):
            x = 370 + i * 55
            draw_soft_rect(data, x, 470, x + 34, 690, clay, 180, 8)

    elif motif == 'imperial-map':
        draw_soft_rect(data, 320, 500, 1280, 760, dark, 185, 16)
        draw_soft_rect(data, 380, 530, 1220, 720, clay, 210, 12)
        for _ in range(16):
            x0 = random.randint(420, 1160)
            y0 = random.randint(560, 690)
            x1 = x0 + random.randint(-140, 140)
            y1 = y0 + random.randint(-90, 90)
            draw_soft_line(data, x0, y0, x1, y1, 1.8, warm, 130)

    elif motif == 'statue-frontier':
        draw_soft_rect(data, 650, 360, 940, 760, clay, 225, 16)
        draw_soft_ellipse(data, 790, 300, 84, 98, clay, 235, 0.22)
        draw_soft_line(data, 930, 460, 1080, 420, 5, clay, 210)
        draw_soft_line(data, 160, 760, 1440, 730, 8, dark, 165)

    elif motif == 'fractured-city':
        for i in range(7):
            x = 140 + i * 200
            h = random.randint(220, 350)
            draw_soft_rect(data, x, 760 - h, x + 120, 760, dark, 210, 12)
        for _ in range(10):
            x = random.randint(180, 1420)
            y = random.randint(430, 760)
            draw_soft_line(data, x, y, x + random.randint(-120, 120), y + random.randint(40, 130), 2.2, warm, 145)

    elif motif == 'bridge-battle':
        draw_soft_line(data, 220, 700, 1380, 700, 16, dark, 185)
        for i in range(8):
            x = 280 + i * 140
            draw_soft_rect(data, x, 700, x + 26, 810, dark, 195, 8)
        for i in range(10):
            x = 340 + i * 100
            draw_soft_ellipse(data, x, 610 + (i % 2) * 20, 24, 40, clay, 210, 0.2)

    elif motif == 'breach-gates':
        draw_soft_rect(data, 420, 360, 1180, 760, dark, 205, 14)
        draw_soft_rect(data, 730, 500, 880, 760, (20, 12, 9), 255, 8)
        for x in (540, 660, 980, 1080):
            draw_soft_ellipse(data, x, 520, 85, 130, warm, 85, 0.4)

    elif motif == 'throne-decline':
        draw_soft_rect(data, 520, 560, 1080, 770, dark, 205, 14)
        draw_soft_rect(data, 650, 400, 950, 610, clay, 210, 12)
        draw_soft_line(data, 980, 440, 1120, 690, 8, dark, 190)
        draw_soft_line(data, 640, 760, 1040, 760, 7, clay, 140)

    elif motif == 'senate-fall':
        for i in range(6):
            x = 260 + i * 180
            draw_soft_rect(data, x, 230, x + 80, 760, dark, 180, 16)
        draw_soft_ellipse(data, 760, 630, 220, 90, clay, 185, 0.24)

    elif motif == 'imperial-statue':
        draw_soft_rect(data, 640, 320, 960, 770, clay, 220, 16)
        draw_soft_ellipse(data, 800, 260, 84, 100, clay, 230, 0.2)

    elif motif == 'founding':
        draw_soft_ellipse(data, 840, 565, 240, 95, dark, 220, 0.2)
        draw_soft_ellipse(data, 640, 525, 95, 74, dark, 210, 0.2)
        for lx in (760, 840, 930, 1010):
            draw_soft_rect(data, lx, 630, lx + 32, 800, dark, 220, 10)


def make_mid(event_id: str, visual: EventVisual) -> bytearray:
    data = bytearray(W * H * 4)
    motif_shape(data, visual.motif)
    # Universal relief pass for legibility
    draw_soft_ellipse(data, W * 0.5, H * 0.58, 420, 230, (230, 205, 180), 28, 0.36)
    return data


def make_fg(event_id: str, visual: EventVisual) -> bytearray:
    data = bytearray(W * H * 4)

    if visual.accent == 'embers':
        for y in range(int(H * 0.58), H):
            ny = (y - H * 0.78) / (H * 0.24)
            for x in range(W):
                nx = x / W
                wave = math.sin(nx * 12 + ny * 5)
                a = int(max(0.0, 62 * (1 - abs(ny)) + 18 * wave))
                blend_at(data, x, y, (192, 104, 76), min(92, max(0, a)))
        for y in range(0, H, 2):
            for x in range(0, W, 2):
                n = hash_noise(x * 3, y * 2, 711 + abs(hash(event_id)) % 400)
                if n > 0.9972:
                    blend_at(data, x, y, (236, 178, 122), 130)

    elif visual.accent == 'dust':
        for y in range(int(H * 0.48), H):
            for x in range(W):
                n = hash_noise(x, y, 433 + abs(hash(event_id)) % 170)
                if n > 0.992:
                    blend_at(data, x, y, (182, 145, 112), 70)
        draw_soft_ellipse(data, W * 0.5, H * 0.76, 700, 170, (186, 132, 94), 42, 0.4)

    elif visual.accent == 'laurel':
        cx, cy = W * 0.5, H * 0.2
        for k in range(34):
            a = -2.45 + k * (4.9 / 33)
            x = cx + math.cos(a) * 180
            y = cy + math.sin(a) * 88
            draw_soft_ellipse(data, x, y, 14, 8, (188, 143, 61), 120, 0.35)
        for x in range(220, 1380, 120):
            blend_at(data, x, 150 + (x // 120) % 3 * 10, (228, 198, 145), 55)

    elif visual.accent == 'steel-glint':
        for i in range(7):
            x0 = 180 + i * 210
            y0 = 680 - i * 14
            draw_soft_line(data, x0, y0, x0 + 220, y0 - 30, 2.4, (226, 201, 155), 95)
        draw_soft_line(data, 520, 430, 1260, 430, 3.4, (232, 207, 161), 80)

    else:  # none
        for y in range(0, H, 2):
            for x in range(0, W, 2):
                n = hash_noise(x * 2, y * 2, 951)
                if n > 0.9983:
                    blend_at(data, x, y, (220, 184, 142), 45)

    return data


def find_cwebp() -> str:
    env = os.environ.get('CWEBP')
    if env and Path(env).exists():
        return env
    for candidate in ('/opt/homebrew/bin/cwebp', '/usr/local/bin/cwebp'):
        if Path(candidate).exists():
            return candidate
    return 'cwebp'


def to_webp(cwebp_bin: str, rgba: bytearray, output_path: Path) -> None:
    tmp_png = output_path.with_suffix('.tmp.png')
    write_png_rgba(tmp_png, W, H, rgba)
    try:
        subprocess.run(
            [cwebp_bin, '-q', '87', '-alpha_q', '92', str(tmp_png), '-o', str(output_path)],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
    finally:
        if tmp_png.exists():
            tmp_png.unlink()


def generate_event(event_id: str, cwebp_bin: str, overwrite: bool) -> None:
    if event_id not in EVENTS:
        raise ValueError(f'Unknown event id: {event_id}')

    visual = EVENTS[event_id]
    event_dir = ROOT / event_id
    event_dir.mkdir(parents=True, exist_ok=True)

    targets = {
        'bg': event_dir / 'bg.webp',
        'mid': event_dir / 'mid.webp',
        'fg': event_dir / 'fg.webp',
    }

    if not overwrite and all(p.exists() for p in targets.values()):
        return

    bg = make_background(event_id, visual)
    mid = make_mid(event_id, visual)
    fg = make_fg(event_id, visual)

    to_webp(cwebp_bin, bg, targets['bg'])
    to_webp(cwebp_bin, mid, targets['mid'])
    to_webp(cwebp_bin, fg, targets['fg'])


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description='Generate cinematic scene assets')
    parser.add_argument(
        '--events',
        nargs='*',
        help='Event ids to generate. Default: migration set of 15 events.',
    )
    parser.add_argument('--all', action='store_true', help='Generate all 18 events')
    parser.add_argument('--overwrite', action='store_true', help='Overwrite existing assets')
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    if args.all:
        event_ids = list(EVENTS.keys())
    elif args.events:
        event_ids = args.events
    else:
        event_ids = MIGRATION_EVENTS

    cwebp_bin = find_cwebp()
    try:
        subprocess.run([cwebp_bin, '-version'], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception as exc:
        print(f'Unable to execute cwebp via {cwebp_bin}: {exc}', file=sys.stderr)
        return 1

    for event_id in event_ids:
        generate_event(event_id, cwebp_bin, args.overwrite)

    print(f'Generated assets for {len(event_ids)} event(s).')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
