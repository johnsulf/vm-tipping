import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HviCard, HviHeading, HviLink } from '@helsevestikt/hviktor-angular';
import { DataService } from '../../core/data.service';
import { norgeOptimister, outsiders, topConsensusPicks } from '../../core/stats';
import { AnswerBars } from '../../shared/answer-bars';

@Component({
  selector: 'app-stats',
  imports: [RouterLink, HviCard, HviHeading, HviLink, AnswerBars],
  templateUrl: './stats.html',
})
export class StatsPage {
  private readonly data = inject(DataService);

  protected readonly total = this.data.participants().length;

  protected readonly vmVinnerFordeling = computed(() => this.data.distribution('vm-vinner'));

  protected readonly konsensus = computed(() => topConsensusPicks(this.data.participants(), 5));

  protected readonly outsidere = computed(() => outsiders(this.data.participants()).slice(0, 3));

  protected readonly optimister = computed(() => norgeOptimister(this.data.participants()));

  protected readonly toppOptimister = computed(() => this.optimister().slice(0, 3));

  protected readonly pessimist = computed(() => this.optimister().at(-1));
}
