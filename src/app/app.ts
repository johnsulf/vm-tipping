import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HviSkipLink } from '@helsevestikt/hviktor-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HviSkipLink],
  templateUrl: './app.html',
})
export class App {}
