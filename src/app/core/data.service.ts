import { computed, Injectable, signal, Signal } from '@angular/core';
import { Participant, PARTICIPANTS, QuestionId } from '../data/predictions.generated';
import { QUESTIONS } from '../data/questions';
import { FASIT } from '../data/results';
import { PARTICIPANT_SECTIONS, Section, SECTIONS } from '../data/sections';
import {
  AnswerCount,
  answerDistribution,
  answerStatus,
  AnswerStatus,
  buildLeaderboard,
  LeaderboardRow,
} from './scoring';

const QUESTION_IDS = QUESTIONS.map((q) => q.id);

@Injectable({ providedIn: 'root' })
export class DataService {
  readonly participants: Signal<readonly Participant[]> = computed(() => PARTICIPANTS);
  readonly fasit = computed(() => FASIT);

  readonly sections = SECTIONS;
  readonly activeSection = signal<Section | 'Alle'>('Alle');

  readonly leaderboard: Signal<readonly LeaderboardRow[]> = computed(() =>
    buildLeaderboard(this.participants(), this.fasit(), QUESTION_IDS),
  );

  readonly filteredLeaderboard: Signal<readonly LeaderboardRow[]> = computed(() => {
    const section = this.activeSection();
    if (section === 'Alle') return this.leaderboard();
    return this.leaderboard().filter(
      (row) => PARTICIPANT_SECTIONS[row.participant.slug] === section,
    );
  });

  /** Antall spørsmål som har fått fasit. */
  readonly settledCount = computed(
    () => QUESTION_IDS.filter((id) => (this.fasit()[id] ?? '').trim() !== '').length,
  );

  readonly questionCount = QUESTION_IDS.length;

  participant(slug: string): Participant | undefined {
    return this.participants().find((p) => p.slug === slug);
  }

  leaderboardRow(slug: string): LeaderboardRow | undefined {
    return this.leaderboard().find((row) => row.participant.slug === slug);
  }

  distribution(questionId: QuestionId): AnswerCount[] {
    return answerDistribution(this.participants(), questionId, this.fasit());
  }

  status(questionId: QuestionId, answer: string): AnswerStatus {
    return answerStatus(answer, this.fasit()[questionId]);
  }
}
