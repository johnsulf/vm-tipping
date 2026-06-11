import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/leaderboard/leaderboard').then((m) => m.LeaderboardPage),
    title: 'Leaderboard - VM-tipping 2026',
  },
  {
    path: 'deltaker/:slug',
    loadComponent: () =>
      import('./features/participant/participant').then((m) => m.ParticipantPage),
    title: 'Deltaker - VM-tipping 2026',
  },
  {
    path: 'sporsmal',
    loadComponent: () => import('./features/questions/questions').then((m) => m.QuestionsPage),
    title: 'Spørsmål - VM-tipping 2026',
  },
  {
    path: 'sporsmal/:id',
    loadComponent: () =>
      import('./features/questions/question-detail').then((m) => m.QuestionDetailPage),
    title: 'Spørsmål - VM-tipping 2026',
  },
  {
    path: 'statistikk',
    loadComponent: () => import('./features/stats/stats').then((m) => m.StatsPage),
    title: 'Statistikk - VM-tipping 2026',
  },
  { path: '**', redirectTo: '' },
];
