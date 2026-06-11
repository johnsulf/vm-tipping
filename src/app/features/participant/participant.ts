import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HviAlert, HviCard, HviHeading, HviLink, HviTag } from '@helsevestikt/hviktor-angular';
import { DataService } from '../../core/data.service';
import { AnswerStatus } from '../../core/scoring';
import { CATEGORIES, CATEGORY_LABELS, Question, QUESTIONS } from '../../data/questions';

interface AnswerRow {
  readonly question: Question;
  readonly answer: string;
  readonly status: AnswerStatus;
}

interface CategoryGroup {
  readonly label: string;
  readonly answers: readonly AnswerRow[];
}

export const STATUS_LABELS: Record<AnswerStatus, string> = {
  riktig: 'Riktig',
  galt: 'Galt',
  uavklart: 'Uavklart',
};

export const STATUS_COLORS: Record<AnswerStatus, 'success' | 'danger' | 'neutral'> = {
  riktig: 'success',
  galt: 'danger',
  uavklart: 'neutral',
};

@Component({
  selector: 'app-participant',
  imports: [RouterLink, HviAlert, HviCard, HviHeading, HviLink, HviTag],
  templateUrl: './participant.html',
})
export class ParticipantPage {
  readonly slug = input.required<string>();

  private readonly data = inject(DataService);

  protected readonly statusLabels = STATUS_LABELS;
  protected readonly statusColors = STATUS_COLORS;
  protected readonly participantCount = this.data.participants().length;

  protected readonly row = computed(() => this.data.leaderboardRow(this.slug()));

  protected readonly groups = computed<readonly CategoryGroup[]>(() => {
    const participant = this.row()?.participant;
    if (!participant) {
      return [];
    }
    return CATEGORIES.map((category) => ({
      label: CATEGORY_LABELS[category],
      answers: QUESTIONS.filter((question) => question.category === category).map((question) => ({
        question,
        answer: participant.answers[question.id],
        status: this.data.status(question.id, participant.answers[question.id]),
      })),
    }));
  });
}
