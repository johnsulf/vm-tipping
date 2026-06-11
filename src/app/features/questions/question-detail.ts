import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HviAlert, HviHeading, HviLink } from '@helsevestikt/hviktor-angular';
import { DataService } from '../../core/data.service';
import { CATEGORY_LABELS, QUESTIONS } from '../../data/questions';
import { AnswerBars } from '../../shared/answer-bars';

@Component({
  selector: 'app-question-detail',
  imports: [RouterLink, HviAlert, HviHeading, HviLink, AnswerBars],
  templateUrl: './question-detail.html',
})
export class QuestionDetailPage {
  readonly id = input.required<string>();

  private readonly data = inject(DataService);

  protected readonly categoryLabels = CATEGORY_LABELS;
  protected readonly total = this.data.participants().length;

  protected readonly question = computed(() => QUESTIONS.find((q) => q.id === this.id()));

  protected readonly fasit = computed(() => {
    const question = this.question();
    const value = question ? this.data.fasit()[question.id] : undefined;
    return value?.trim() ? value : undefined;
  });

  protected readonly distribution = computed(() => {
    const question = this.question();
    return question ? this.data.distribution(question.id) : [];
  });
}
