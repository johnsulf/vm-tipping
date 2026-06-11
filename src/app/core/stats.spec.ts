import { Participant } from '../data/predictions.generated';
import { QUESTIONS } from '../data/questions';
import { closestTwin, identicalGroups, identicalWith, mostSimilarPairs } from './stats';

function deltaker(name: string, fyll: string, avvik: Partial<Record<string, string>> = {}): Participant {
  const answers = Object.fromEntries(
    QUESTIONS.map((q) => [q.id, avvik[q.id] ?? fyll]),
  ) as Participant['answers'];
  return { name, slug: name.toLowerCase(), timestamp: '', answers };
}

describe('identicalGroups', () => {
  it('finner grupper som har svart helt likt, uavhengig av store/små bokstaver', () => {
    const a = deltaker('Anna', 'Mexico');
    const b = deltaker('Bjørn', ' MEXICO ');
    const c = deltaker('Carl', 'Mexico', { 'vm-vinner': 'Norge' });
    const groups = identicalGroups([a, b, c]);
    expect(groups).toHaveLength(1);
    expect(groups[0].map((p) => p.name)).toEqual(['Anna', 'Bjørn']);
  });

  it('returnerer tom liste når ingen er like', () => {
    const a = deltaker('Anna', 'Mexico');
    const b = deltaker('Bjørn', 'Spania');
    expect(identicalGroups([a, b])).toEqual([]);
  });
});

describe('identicalWith', () => {
  it('finner de andre i samme gruppe, men ikke deltakeren selv', () => {
    const a = deltaker('Anna', 'Mexico');
    const b = deltaker('Bjørn', 'Mexico');
    const c = deltaker('Carl', 'Spania');
    expect(identicalWith(a, [a, b, c]).map((p) => p.name)).toEqual(['Bjørn']);
    expect(identicalWith(c, [a, b, c])).toEqual([]);
  });
});

describe('mostSimilarPairs og closestTwin', () => {
  const a = deltaker('Anna', 'Mexico');
  const b = deltaker('Bjørn', 'Mexico', { 'vm-vinner': 'Norge' });
  const c = deltaker('Carl', 'Spania');

  it('rangerer par etter antall like svar', () => {
    const pairs = mostSimilarPairs([a, b, c], 2);
    expect(pairs[0].a.name).toBe('Anna');
    expect(pairs[0].b.name).toBe('Bjørn');
    expect(pairs[0].alike).toBe(QUESTIONS.length - 1);
    expect(pairs[0].total).toBe(QUESTIONS.length);
  });

  it('finner nærmeste tvilling for en deltaker', () => {
    const twin = closestTwin(c, [a, b, c]);
    expect(twin?.alike).toBe(0);
    expect(closestTwin(a, [a, b, c])?.other.name).toBe('Bjørn');
  });
});
