import { Component, input } from '@angular/core';
import { HviTag } from '@helsevestikt/hviktor-angular';
import { AnswerCount } from '../core/scoring';

/** Horisontalt søylediagram over svarfordeling. Tallene står i tekst, søylene er dekorative. */
@Component({
  selector: 'app-answer-bars',
  imports: [HviTag],
  template: `
    <ul class="space-y-4">
      @for (item of distribution(); track item.answer) {
        <li>
          <div class="flex flex-wrap items-baseline justify-between gap-x-4">
            <span class="font-medium">
              {{ item.answer }}
              @if (item.status === 'riktig') {
                <hvi-tag size="sm" color="success" class="ms-1 align-middle">Riktig</hvi-tag>
              }
            </span>
            <span class="text-sm text-gray-700">
              {{ item.count }} av {{ total() }}
            </span>
          </div>
          <div class="mt-1 h-3 rounded-full bg-gray-200" aria-hidden="true">
            <div
              class="h-3 rounded-full"
              [class]="barColor(item)"
              [style.width.%]="(item.count / total()) * 100"
            ></div>
          </div>
          @if (showParticipants()) {
            <p class="mt-1 text-sm text-gray-600">{{ names(item) }}</p>
          }
        </li>
      }
    </ul>
  `,
})
export class AnswerBars {
  readonly distribution = input.required<readonly AnswerCount[]>();
  readonly total = input.required<number>();
  readonly showParticipants = input(false);

  protected names(item: AnswerCount): string {
    return item.participants.map((p) => p.name).join(', ');
  }

  protected barColor(item: AnswerCount): string {
    switch (item.status) {
      case 'riktig':
        return 'bg-green-700';
      case 'galt':
        return 'bg-gray-500';
      default:
        return 'bg-[#1466B8]';
    }
  }
}
