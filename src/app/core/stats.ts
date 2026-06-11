import { Participant, QuestionId } from '../data/predictions.generated';
import { Question, QUESTIONS } from '../data/questions';
import { normalizeAnswer } from './scoring';

export interface ConsensusPick {
  readonly question: Question;
  readonly answer: string;
  readonly count: number;
  readonly total: number;
}

export interface UniqueAnswer {
  readonly question: Question;
  readonly answer: string;
}

export interface OutsiderRow {
  readonly participant: Participant;
  readonly uniqueAnswers: readonly UniqueAnswer[];
}

export interface OptimismRow {
  readonly participant: Participant;
  readonly score: number;
  readonly maxScore: number;
}

/** Spørsmålene der flest er enige, sortert på størst enighet. */
export function topConsensusPicks(participants: readonly Participant[], limit: number): ConsensusPick[] {
  return QUESTIONS.map((question) => {
    const counts = new Map<string, { answer: string; count: number }>();
    for (const participant of participants) {
      const answer = participant.answers[question.id];
      const key = normalizeAnswer(answer);
      const entry = counts.get(key);
      if (entry) entry.count++;
      else counts.set(key, { answer, count: 1 });
    }
    const top = [...counts.values()].sort((a, b) => b.count - a.count)[0];
    return { question, answer: top.answer, count: top.count, total: participants.length };
  })
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/** Deltakere rangert etter antall svar ingen andre har gitt. */
export function outsiders(participants: readonly Participant[]): OutsiderRow[] {
  return participants
    .map((participant) => {
      const uniqueAnswers = QUESTIONS.filter((question) => {
        const own = normalizeAnswer(participant.answers[question.id]);
        return participants.every(
          (other) => other === participant || normalizeAnswer(other.answers[question.id]) !== own,
        );
      }).map((question) => ({ question, answer: participant.answers[question.id] }));
      return { participant, uniqueAnswers };
    })
    .sort(
      (a, b) =>
        b.uniqueAnswers.length - a.uniqueAnswers.length ||
        a.participant.name.localeCompare(b.participant.name, 'nb'),
    );
}

const PROGRESJON_REKKEFOLGE = [
  'de ryker ut i gruppespillet',
  'til 16-delsfinale',
  'til 8-delsfinale',
  'til kvartfinale',
  'til semifinale',
  'til finalen',
  'norge vinner vm',
];

function poengScore(answer: string): number {
  if (answer.startsWith('7')) return 3;
  if (answer.startsWith('4')) return 2;
  if (answer.startsWith('2')) return 1;
  return 0;
}

function haalandScore(answer: string): number {
  if (answer.startsWith('5')) return 3;
  if (answer.startsWith('3')) return 2;
  if (answer.startsWith('1')) return 1;
  return 0;
}

const OPTIMISME_MAKS = 6 + 3 + 2 + 3 + 2 + 4;

/** Rangerer deltakerne etter hvor mye de tror på Norge. */
export function norgeOptimister(participants: readonly Participant[]): OptimismRow[] {
  return participants
    .map((participant) => {
      const a = (id: QuestionId) => participant.answers[id];
      const progresjon = Math.max(0, PROGRESJON_REKKEFOLGE.indexOf(normalizeAnswer(a('norge-progresjon'))));
      const frankrike = normalizeAnswer(a('norge-frankrike')).startsWith('ja')
        ? 2
        : normalizeAnswer(a('norge-frankrike')).startsWith('det blir uavgjort')
          ? 1
          : 0;
      const gruppevinner = normalizeAnswer(a('gruppe-i')) === 'norge' ? 2 : 0;
      const vmVinner = normalizeAnswer(a('vm-vinner')) === 'norge' ? 4 : 0;
      const score =
        progresjon + poengScore(a('norge-poeng')) + frankrike + haalandScore(a('haaland-mal')) + gruppevinner + vmVinner;
      return { participant, score, maxScore: OPTIMISME_MAKS };
    })
    .sort(
      (a, b) => b.score - a.score || a.participant.name.localeCompare(b.participant.name, 'nb'),
    );
}
