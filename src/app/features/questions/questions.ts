import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HviHeading, HviLink, HviTag } from '@helsevestikt/hviktor-angular';
import { DataService } from '../../core/data.service';
import { CATEGORIES, CATEGORY_LABELS, Question, QUESTIONS } from '../../data/questions';

interface QuestionRow {
  readonly question: Question;
  readonly fasit: string | undefined;
}

interface CategoryGroup {
  readonly label: string;
  readonly questions: readonly QuestionRow[];
}

@Component({
  selector: 'app-questions',
  imports: [RouterLink, HviHeading, HviLink, HviTag],
  templateUrl: './questions.html',
})
export class QuestionsPage {
  private readonly data = inject(DataService);

  protected readonly settledCount = this.data.settledCount;
  protected readonly questionCount = this.data.questionCount;

  protected readonly groups = computed<readonly CategoryGroup[]>(() =>
    CATEGORIES.map((category) => ({
      label: CATEGORY_LABELS[category],
      questions: QUESTIONS.filter((question) => question.category === category).map((question) => {
        const fasit = this.data.fasit()[question.id];
        return { question, fasit: fasit?.trim() ? fasit : undefined };
      }),
    })),
  );
}
