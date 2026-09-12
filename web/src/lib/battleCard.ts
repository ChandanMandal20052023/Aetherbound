/**
 * Operative Battle Card Canvas Generator
 * Renders a crisp 1200x675 high-DPI Neo-Brutalist Holographic Dossier
 * for social sharing, discord flexes, and hackathon presentation.
 */

import type { PlayerProfile } from '@/types/player';

export async function generateBattleCardCanvas(player: PlayerProfile): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  const width = 1200;
  const height = 675;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  // 1. Background Fill
  ctx.fillStyle = '#130728';
  ctx.fillRect(0, 0, width, height);

  // 2. Subtle Cyberpunk Grid Lines
  ctx.strokeStyle = 'rgba(54, 35, 84, 0.45)';
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let x = 0; x <= width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // 3. Thick Outer Neo-Brutalist Frame
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#000000';
  ctx.strokeRect(20, 20, width - 40, height - 40);

  // Inner decorative border
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#7ef9c7';
  ctx.strokeRect(26, 26, width - 52, height - 52);

  // 4. Header Bar
  ctx.fillStyle = '#201335';
  ctx.fillRect(32, 32, width - 64, 80);
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#000000';
  ctx.strokeRect(32, 32, width - 64, 80);

  // Header Title
  ctx.fillStyle = '#fad02c';
  ctx.font = '900 16px monospace';
  ctx.fillText('ARCANE OPERATIVE DOSSIER // OFFICIAL RECORD', 56, 62);

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 32px sans-serif';
  ctx.fillText('AETHERBOUND LIFE RPG', 56, 96);

  // Top Right Cycle Pill
  ctx.fillStyle = '#ffb68d';
  ctx.fillRect(width - 290, 48, 230, 44);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3;
  ctx.strokeRect(width - 290, 48, 230, 44);
  ctx.fillStyle = '#000000';
  ctx.font = '900 16px monospace';
  ctx.fillText('CYCLE 3 : MOONFALL', width - 275, 76);

  // 5. Left Column: Avatar Frame
  const avatarX = 56;
  const avatarY = 140;
  const avatarSize = 460;

  ctx.fillStyle = '#170c28';
  ctx.fillRect(avatarX, avatarY, avatarSize, avatarSize);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 6;
  ctx.strokeRect(avatarX, avatarY, avatarSize, avatarSize);

  // Load and draw avatar image
  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = `/avatars/Avatar-${player.avatarIndex}.jpg`;
    await new Promise((resolve) => {
      img.onload = () => {
        ctx.drawImage(img, avatarX + 8, avatarY + 8, avatarSize - 16, avatarSize - 16);
        resolve(true);
      };
      img.onerror = () => resolve(false);
    });
  } catch {}

  // Level Badge Overlay on Avatar
  ctx.fillStyle = '#7ef9c7';
  ctx.fillRect(avatarX + 16, avatarY + avatarSize - 60, 160, 44);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 4;
  ctx.strokeRect(avatarX + 16, avatarY + avatarSize - 60, 160, 44);
  ctx.fillStyle = '#000000';
  ctx.font = '900 20px monospace';
  ctx.fillText(`LVL ${player.stats.level}`, avatarX + 32, avatarY + avatarSize - 31);

  // 6. Right Column: Call-sign & Tactical Stats
  const rightX = 545;

  // Username
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 48px sans-serif';
  ctx.fillText(player.username.toUpperCase(), rightX, 185);

  // Rank Pill
  ctx.fillStyle = '#b892ff';
  const rankText = `RANK: ${player.stats.rank.toUpperCase()}`;
  ctx.font = '900 16px monospace';
  const rankWidth = ctx.measureText(rankText).width + 30;
  ctx.fillRect(rightX, 205, rankWidth, 34);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3;
  ctx.strokeRect(rightX, 205, rankWidth, 34);
  ctx.fillStyle = '#000000';
  ctx.fillText(rankText, rightX + 15, 228);

  // Stat Grid (2x2)
  const stats = [
    { label: 'MOMENTUM STREAK', val: `🔥 ${player.stats.streakDays} DAYS`, color: '#ffb68d' },
    { label: 'COSMIC GOLD', val: `💰 ${player.stats.gold} G`, color: '#fad02c' },
    { label: 'TOTAL XP HARVESTED', val: `⚡ ${player.stats.xp} XP`, color: '#7ef9c7' },
    { label: 'DISCIPLINE MULTIPLIER', val: `✦ ${(1 + Math.min(1.0, player.stats.streakDays * 0.05)).toFixed(2)}x`, color: '#6ee7b7' },
  ];

  const gridStartX = rightX;
  const gridStartY = 265;
  const cardW = 280;
  const cardH = 88;
  const gap = 20;

  stats.forEach((s, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cx = gridStartX + col * (cardW + gap);
    const cy = gridStartY + row * (cardH + gap);

    ctx.fillStyle = '#201335';
    ctx.fillRect(cx, cy, cardW, cardH);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    ctx.strokeRect(cx, cy, cardW, cardH);

    ctx.fillStyle = '#8f82aa';
    ctx.font = '900 12px monospace';
    ctx.fillText(s.label, cx + 16, cy + 28);

    ctx.fillStyle = s.color;
    ctx.font = '900 24px sans-serif';
    ctx.fillText(s.val, cx + 16, cy + 62);
  });

  // 7. Formula / Lore Banner at Bottom Right
  const mathY = 485;
  ctx.fillStyle = '#170c28';
  ctx.fillRect(rightX, mathY, 580, 115);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 4;
  ctx.strokeRect(rightX, mathY, 580, 115);

  ctx.fillStyle = '#7ef9c7';
  ctx.font = '900 13px monospace';
  ctx.fillText('MATHEMATICAL PROGRESSION CURVE:', rightX + 20, mathY + 32);

  ctx.fillStyle = '#fad02c';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('XP_req(L) = 100·L^1.65 + 25·L^2', rightX + 20, mathY + 65);

  ctx.fillStyle = '#bccac1';
  ctx.font = '12px sans-serif';
  ctx.fillText('Engineered for relentless deep work, momentum defence & life mastery.', rightX + 20, mathY + 95);

  return canvas;
}

export function downloadBattleCard(canvas: HTMLCanvasElement, filename: string = 'aetherbound-battle-card.png') {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export async function copyBattleCardToClipboard(canvas: HTMLCanvasElement): Promise<boolean> {
  try {
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          resolve(false);
          return;
        }
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          resolve(true);
        } catch {
          resolve(false);
        }
      }, 'image/png');
    });
  } catch {
    return false;
  }
}
