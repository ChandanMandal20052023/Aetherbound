import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';

interface GeneratedQuest {
  title: string;
  description: string;
  category: 'main' | 'side' | 'active';
  rarity: 'trivial' | 'common' | 'rare' | 'epic' | 'legendary';
  risk: 'low' | 'medium' | 'high';
  xpReward: number;
  goldReward: number;
  emoji: string;
  tacticalTip: string;
}

function proceduralDeconstruct(goal: string, difficulty: string = 'balanced'): GeneratedQuest[] {
  const g = goal.trim();
  const lower = g.toLowerCase();

  // Multipliers based on difficulty
  const diffMultiplier = difficulty === 'nightmare' ? 1.5 : difficulty === 'rigorous' ? 1.25 : 1.0;

  // Domain detection
  let domain = 'general';
  let domainEmoji = '⚡';
  if (/code|build|app|deploy|bug|software|dev|git|api|hackathon|test/i.test(lower)) {
    domain = 'tech';
    domainEmoji = '💻';
  } else if (/study|exam|learn|read|course|book|paper|math|physics|notes/i.test(lower)) {
    domain = 'study';
    domainEmoji = '📚';
  } else if (/gym|workout|run|diet|sleep|walk|lift|cardio|stretch/i.test(lower)) {
    domain = 'fitness';
    domainEmoji = '🛡️';
  } else if (/pitch|presentation|investor|client|sales|marketing|slides|deck/i.test(lower)) {
    domain = 'business';
    domainEmoji = '📈';
  } else if (/clean|organize|room|finance|taxes|budget|chores/i.test(lower)) {
    domain = 'life';
    domainEmoji = '🧹';
  }

  // Generate 3 progressive stages
  if (domain === 'tech') {
    return [
      {
        title: `Phase 1: Architecture Blueprint for "${g}"`,
        description: `Map system schemas, interfaces, and prerequisites for ${g}. Isolate core dependencies.`,
        category: 'main',
        rarity: 'common',
        risk: 'low',
        xpReward: Math.round(120 * diffMultiplier),
        goldReward: Math.round(40 * diffMultiplier),
        emoji: '📐',
        tacticalTip: 'Scope out edge cases first to prevent mid-sprint architecture refactors.',
      },
      {
        title: `Phase 2: Core Engineering Sprint on "${g}"`,
        description: `Implement the primary logic, handlers, and core workflow of ${g}. Zero distractions allowed.`,
        category: 'main',
        rarity: 'rare',
        risk: 'medium',
        xpReward: Math.round(250 * diffMultiplier),
        goldReward: Math.round(80 * diffMultiplier),
        emoji: '💻',
        tacticalTip: 'Commit working checkpoints frequently; defend your deep work resonance.',
      },
      {
        title: `Phase 3: Battle-Testing & Polish for "${g}"`,
        description: `Run unit verifications, stress tests, and UI styling polish to ensure flawless stability for ${g}.`,
        category: 'active',
        rarity: 'epic',
        risk: 'high',
        xpReward: Math.round(400 * diffMultiplier),
        goldReward: Math.round(150 * diffMultiplier),
        emoji: '🔥',
        tacticalTip: 'The final 10% polish delivers 90% of user impact during evaluation.',
      },
    ];
  }

  if (domain === 'study') {
    return [
      {
        title: `Stage 1: Concept Deconstruction for "${g}"`,
        description: `Survey core theorems, lecture notes, and fundamental chapters regarding ${g}. Extract cheat sheet.`,
        category: 'main',
        rarity: 'common',
        risk: 'low',
        xpReward: Math.round(110 * diffMultiplier),
        goldReward: Math.round(35 * diffMultiplier),
        emoji: '📖',
        tacticalTip: 'Use Feynman technique: teach the concept aloud to confirm mastery.',
      },
      {
        title: `Stage 2: High-Friction Problem Sets for "${g}"`,
        description: `Solve 5-8 challenging practice problems or case studies without looking at reference answers.`,
        category: 'main',
        rarity: 'rare',
        risk: 'medium',
        xpReward: Math.round(240 * diffMultiplier),
        goldReward: Math.round(75 * diffMultiplier),
        emoji: '🧠',
        tacticalTip: 'Active recall forges neural paths 3x faster than passive re-reading.',
      },
      {
        title: `Stage 3: Timed Mock Exam Boss Run for "${g}"`,
        description: `Simulate a full closed-book test run on ${g} under strict countdown conditions.`,
        category: 'active',
        rarity: 'epic',
        risk: 'high',
        xpReward: Math.round(380 * diffMultiplier),
        goldReward: Math.round(140 * diffMultiplier),
        emoji: '⚔️',
        tacticalTip: 'Review every single error thoroughly to banish conceptual blindspots.',
      },
    ];
  }

  if (domain === 'fitness') {
    return [
      {
        title: `Warmup & Staging for "${g}"`,
        description: `Dynamic mobility drill, hydration infusion, and physical staging for ${g}.`,
        category: 'side',
        rarity: 'common',
        risk: 'low',
        xpReward: Math.round(80 * diffMultiplier),
        goldReward: Math.round(25 * diffMultiplier),
        emoji: '💧',
        tacticalTip: 'Pre-workout mindset sets the intensity floor for the entire session.',
      },
      {
        title: `Main Crucible: Execute "${g}"`,
        description: `Carry out the core physical trial: push past comfort zone with strict biomechanical form.`,
        category: 'main',
        rarity: 'epic',
        risk: 'high',
        xpReward: Math.round(320 * diffMultiplier),
        goldReward: Math.round(100 * diffMultiplier),
        emoji: '🏋️',
        tacticalTip: 'Focus strictly on cadence and breath control during peak exertion.',
      },
      {
        title: `Post-Trial Recovery & Nutrition for "${g}"`,
        description: `Targeted stretching, protein intake, and recovery tracking to solidify physical gains.`,
        category: 'side',
        rarity: 'common',
        risk: 'low',
        xpReward: Math.round(100 * diffMultiplier),
        goldReward: Math.round(30 * diffMultiplier),
        emoji: '🥗',
        tacticalTip: 'Muscle and neurological adaptation happen during recovery, not the workout.',
      },
    ];
  }

  if (domain === 'business') {
    return [
      {
        title: `Narrative Arc & Hook for "${g}"`,
        description: `Distill the core hook, problem statement, and killer differentiator for ${g}.`,
        category: 'main',
        rarity: 'common',
        risk: 'low',
        xpReward: Math.round(130 * diffMultiplier),
        goldReward: Math.round(45 * diffMultiplier),
        emoji: '🎯',
        tacticalTip: 'The first 60 seconds make or break investor and judge attention.',
      },
      {
        title: `Visual Deck & Demo Flow for "${g}"`,
        description: `Draft slide visuals, interactive live demo script, and high-impact proof points.`,
        category: 'main',
        rarity: 'rare',
        risk: 'medium',
        xpReward: Math.round(260 * diffMultiplier),
        goldReward: Math.round(85 * diffMultiplier),
        emoji: '📊',
        tacticalTip: 'Show, do not tell. Live software beats static bullet points every time.',
      },
      {
        title: `Pitch Rehearsal & Q&A Defense for "${g}"`,
        description: `Deliver 3 timed run-throughs without stalling. Anticipate top 5 skeptical questions.`,
        category: 'active',
        rarity: 'legendary',
        risk: 'high',
        xpReward: Math.round(450 * diffMultiplier),
        goldReward: Math.round(180 * diffMultiplier),
        emoji: '👑',
        tacticalTip: 'Answer concisely with conviction. Clarity creates authority.',
      },
    ];
  }

  // Universal fallback for lifestyle / general goals
  return [
    {
      title: `Scouting & Environment Setup for "${g}"`,
      description: `Clear distractions, stage all necessary tools, and establish a 100% focused perimeter for ${g}.`,
      category: 'side',
      rarity: 'common',
      risk: 'low',
      xpReward: Math.round(90 * diffMultiplier),
      goldReward: Math.round(30 * diffMultiplier),
      emoji: '🔍',
      tacticalTip: 'Friction reduction at stage zero guarantees rapid velocity.',
    },
    {
      title: `Core Execution Assault on "${g}"`,
      description: `Attack the highest-leverage subtasks of ${g} in an uninterrupted deep focus sprint.`,
      category: 'main',
      rarity: 'rare',
      risk: 'medium',
      xpReward: Math.round(250 * diffMultiplier),
      goldReward: Math.round(80 * diffMultiplier),
      emoji: '⚔️',
      tacticalTip: 'Silence all notifications. Protect your attention bar as your primary life stat.',
    },
    {
      title: `Victory Seal & Reflection for "${g}"`,
      description: `Verify completion quality, log lessons learned, and harvest your operative rewards.`,
      category: 'active',
      rarity: 'epic',
      risk: 'medium',
      xpReward: Math.round(350 * diffMultiplier),
      goldReward: Math.round(120 * diffMultiplier),
      emoji: domainEmoji,
      tacticalTip: 'Celebrate small milestones to reinforce dopamine loops for consistency.',
    },
  ];
}

export async function POST(req: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { goal, difficulty = 'balanced' } = await req.json();

    if (!goal || typeof goal !== 'string' || !goal.trim()) {
      return NextResponse.json({ error: 'Goal prompt is required' }, { status: 400 });
    }

    const trimmedGoal = goal.trim().slice(0, 300);

    // If Google Gemini API key is provided, attempt structured generation
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const prompt = `You are the Arcane Quest Alchemist in the Neo-Brutalist Life RPG Aetherbound.
Deconstruct the user's real-life goal into a 3-stage RPG quest chain:
Goal: "${trimmedGoal}"
Difficulty: "${difficulty}"

Return strictly valid JSON in this exact format (no markdown, no backticks):
{
  "quests": [
    {
      "title": "Short punchy RPG quest title",
      "description": "Clear actionable task description with tactical flavor",
      "category": "main",
      "rarity": "common",
      "risk": "low",
      "xpReward": 120,
      "goldReward": 40,
      "emoji": "⚔️",
      "tacticalTip": "Brief psychological or productivity tip"
    }
  ]
}`;
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: 'application/json' },
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            if (Array.isArray(parsed.quests) && parsed.quests.length > 0) {
              return NextResponse.json({ quests: parsed.quests });
            }
          }
        }
      } catch (err) {
        // Fallback gracefully to the procedural engine
        console.warn('Gemini API call failed, falling back to procedural alchemy:', err);
      }
    }

    // High-performance procedural deconstruction engine
    const quests = proceduralDeconstruct(trimmedGoal, difficulty);
    return NextResponse.json({ quests });
  } catch (error) {
    console.error('Alchemy error:', error);
    return NextResponse.json({ error: 'Failed to transmute goal into quests' }, { status: 500 });
  }
}
