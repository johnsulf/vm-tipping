import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HviAlert, HviChipLabel, HviHeading, HviInput, HviLink, HviTable } from '@helsevestikt/hviktor-angular';
import { DataService } from '../../core/data.service';
import { Section } from '../../data/sections';

@Component({
  selector: 'app-leaderboard',
  imports: [RouterLink, HviAlert, HviChipLabel, HviHeading, HviInput, HviLink, HviTable],
  templateUrl: './leaderboard.html',
})
export class LeaderboardPage {
  private readonly data = inject(DataService);

  protected readonly rows = this.data.filteredLeaderboard;
  protected readonly settledCount = this.data.settledCount;
  protected readonly questionCount = this.data.questionCount;
  protected readonly sections = this.data.sections;
  protected readonly activeSection = this.data.activeSection;

  protected setSection(section: Section | 'Alle'): void {
    this.data.activeSection.set(section);
  }
}
