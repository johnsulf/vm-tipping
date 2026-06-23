import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  HviAlert,
  HviButton,
  HviChipLabel,
  HviHeading,
  HviInput,
  HviLink,
  HviTable,
  HviToggleGroup,
  HviToggleGroupItem,
} from '@helsevestikt/hviktor-angular';
import { DataService } from '../../core/data.service';
import { PARTICIPANT_SECTIONS, Section } from '../../data/sections';

@Component({
  selector: 'app-leaderboard',
  imports: [
    DecimalPipe,
    RouterLink,
    HviAlert,
    HviButton,
    HviChipLabel,
    HviHeading,
    HviInput,
    HviLink,
    HviTable,
    HviToggleGroup,
    HviToggleGroupItem,
  ],
  templateUrl: './leaderboard.html',
})
export class LeaderboardPage {
  private readonly data = inject(DataService);

  protected readonly view = signal<'spillere' | 'seksjoner'>('spillere');
  protected readonly rows = this.data.filteredLeaderboard;
  protected readonly settledCount = this.data.settledCount;
  protected readonly questionCount = this.data.questionCount;
  protected readonly sections = this.data.sections;
  protected readonly activeSection = this.data.activeSection;
  protected readonly sectionRanks = this.data.sectionRanks;
  protected readonly sectionLeaderboard = this.data.sectionLeaderboard;

  protected setSection(section: Section | 'Alle'): void {
    this.data.activeSection.set(section);
  }

  protected sectionOf(slug: string): string {
    return PARTICIPANT_SECTIONS[slug] ?? '';
  }

  protected sectionRankOf(slug: string): number | undefined {
    return this.sectionRanks().get(slug);
  }
}
