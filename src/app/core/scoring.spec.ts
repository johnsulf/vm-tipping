import { Participant, QuestionId } from '../data/predictions.generated';
import { Fasit } from '../data/results';
import {
  answerDistribution,
  answerStatus,
  buildLeaderboard,
  normalizeAnswer,
  scoreParticipant,
} from './scoring';

const QUESTION_IDS: QuestionId[] = ['apningskamp-vinner', 'apningskamp-mal', 'apningskamp-straffe'];

function deltaker(name: string, answers: Partial<Record<QuestionId, string>>): Participant {
  return {
    name,
    slug: name.toLowerCase(),
    timestamp: '6/11/2026 10:00:00',
    answers: answers as Record<QuestionId, string>,
  };
}

describe('normalizeAnswer', () => {
  it('ignorerer store/små bokstaver og ekstra mellomrom', () => {
    expect(normalizeAnswer('  Sør-Afrika  ')).toBe('sør-afrika');
    expect(normalizeAnswer('Nei,  Frankrike   vinner')).toBe('nei, frankrike vinner');
  });
});

describe('answerStatus', () => {
  it('er uavklart uten fasit', () => {
    expect(answerStatus('Mexico', undefined)).toBe('uavklart');
    expect(answerStatus('Mexico', '  ')).toBe('uavklart');
  });

  it('matcher normalisert', () => {
    expect(answerStatus(' mexico ', 'Mexico')).toBe('riktig');
    expect(answerStatus('Sør-Afrika', 'Mexico')).toBe('galt');
  });
});

describe('scoreParticipant', () => {
  it('gir 1 poeng per riktig og teller uavklarte', () => {
    const p = deltaker('Erlend', {
      'apningskamp-vinner': 'Mexico',
      'apningskamp-mal': '3',
      'apningskamp-straffe': 'Nei',
    });
    const fasit: Fasit = { 'apningskamp-vinner': 'Mexico', 'apningskamp-mal': '2' };
    const score = scoreParticipant(p, fasit, QUESTION_IDS);
    expect(score).toEqual({ points: 1, correct: 1, wrong: 1, pending: 1, settled: 2 });
  });
});

describe('buildLeaderboard', () => {
  const fasit: Fasit = { 'apningskamp-vinner': 'Mexico', 'apningskamp-mal': '3' };
  const deltakere = [
    deltaker('Cecilie', { 'apningskamp-vinner': 'Mexico', 'apningskamp-mal': '2' }),
    deltaker('Arnt', { 'apningskamp-vinner': 'Mexico', 'apningskamp-mal': '3' }),
    deltaker('Bjørn', { 'apningskamp-vinner': 'Mexico', 'apningskamp-mal': '1' }),
    deltaker('Dina', { 'apningskamp-vinner': 'Uavgjort', 'apningskamp-mal': '1' }),
  ];

  it('bruker delte plasseringer (1, 2, 2, 4)', () => {
    const rows = buildLeaderboard(deltakere, fasit, QUESTION_IDS);
    expect(rows.map((r) => [r.rank, r.participant.name, r.score.points])).toEqual([
      [1, 'Arnt', 2],
      [2, 'Bjørn', 1],
      [2, 'Cecilie', 1],
      [4, 'Dina', 0],
    ]);
  });

  it('sorterer likt plasserte alfabetisk på norsk', () => {
    const rows = buildLeaderboard(deltakere, fasit, QUESTION_IDS);
    expect(rows[1].participant.name).toBe('Bjørn');
    expect(rows[2].participant.name).toBe('Cecilie');
  });
});

describe('answerDistribution', () => {
  it('grupperer normaliserte svar og markerer status', () => {
    const deltakere = [
      deltaker('A', { 'apningskamp-vinner': 'Mexico' }),
      deltaker('B', { 'apningskamp-vinner': ' mexico' }),
      deltaker('C', { 'apningskamp-vinner': 'Sør-Afrika' }),
    ];
    const rows = answerDistribution(deltakere, 'apningskamp-vinner', {
      'apningskamp-vinner': 'Mexico',
    });
    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({ answer: 'Mexico', count: 2, status: 'riktig' });
    expect(rows[1]).toMatchObject({ answer: 'Sør-Afrika', count: 1, status: 'galt' });
  });
});
