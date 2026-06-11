import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HviAlert, HviHeading, HviLink, HviTable } from '@helsevestikt/hviktor-angular';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-leaderboard',
  imports: [RouterLink, HviAlert, HviHeading, HviLink, HviTable],
  templateUrl: './leaderboard.html',
})
export class LeaderboardPage {
  private readonly data = inject(DataService);

  protected readonly rows = this.data.leaderboard;
  protected readonly settledCount = this.data.settledCount;
  protected readonly questionCount = this.data.questionCount;
}
