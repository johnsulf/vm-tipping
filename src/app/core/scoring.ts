import { Participant, QuestionId } from '../data/predictions.generated';
import { Fasit } from '../data/results';

export type AnswerStatus = 'riktig' | 'galt' | 'uavklart';

export interface Score {
  readonly points: number;
  readonly correct: number;
  readonly wrong: number;
  readonly pending: number;
  /** Antall spørsmål med fasit (correct + wrong). */
  readonly settled: number;
}

export interface LeaderboardRow {
  readonly rank: number;
  readonly participant: Participant;
  readonly score: Score;
}

export interface AnswerCount {
  readonly answer: string;
  readonly count: number;
  readonly participants: readonly Participant[];
  readonly status: AnswerStatus;
}

/** Normaliserer et svar for sammenligning: trim, små bokstaver, kollapsede mellomrom. */
export function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function answerStatus(answer: string, fasit: string | undefined): AnswerStatus {
  if (fasit === undefined || fasit.trim() === '') {
    return 'uavklart';
  }
  return normalizeAnswer(answer) === normalizeAnswer(fasit) ? 'riktig' : 'galt';
}

export function scoreParticipant(
  participant: Participant,
  fasit: Fasit,
  questionIds: readonly QuestionId[],
): Score {
  let correct = 0;
  let wrong = 0;
  let pending = 0;
  for (const id of questionIds) {
    const status = answerStatus(participant.answers[id], fasit[id]);
    if (status === 'riktig') correct++;
    else if (status === 'galt') wrong++;
    else pending++;
  }
  return { points: correct, correct, wrong, pending, settled: correct + wrong };
}

/**
 * Bygger leaderboard sortert på poeng (synkende), deretter navn (norsk sortering).
 * Delte plasseringer følger standard konkurranserangering: 1, 2, 2, 4.
 */
export function buildLeaderboard(
  participants: readonly Participant[],
  fasit: Fasit,
  questionIds: readonly QuestionId[],
): LeaderboardRow[] {
  const scored = participants
    .map((participant) => ({ participant, score: scoreParticipant(participant, fasit, questionIds) }))
    .sort(
      (a, b) =>
        b.score.points - a.score.points || a.participant.name.localeCompare(b.participant.name, 'nb'),
    );
  const rows: LeaderboardRow[] = [];
  scored.forEach((entry, index) => {
    const rank =
      index > 0 && entry.score.points === rows[index - 1].score.points
        ? rows[index - 1].rank
        : index + 1;
    rows.push({ rank, participant: entry.participant, score: entry.score });
  });
  return rows;
}

/** Svarfordeling for et spørsmål, sortert på antall (synkende), deretter alfabetisk. */
export function answerDistribution(
  participants: readonly Participant[],
  questionId: QuestionId,
  fasit: Fasit,
): AnswerCount[] {
  const groups = new Map<string, { answer: string; participants: Participant[] }>();
  for (const participant of participants) {
    const answer = participant.answers[questionId];
    const key = normalizeAnswer(answer);
    const group = groups.get(key);
    if (group) {
      group.participants.push(participant);
    } else {
      groups.set(key, { answer, participants: [participant] });
    }
  }
  return [...groups.values()]
    .map((group) => ({
      answer: group.answer,
      count: group.participants.length,
      participants: group.participants,
      status: answerStatus(group.answer, fasit[questionId]),
    }))
    .sort((a, b) => b.count - a.count || a.answer.localeCompare(b.answer, 'nb'));
}
