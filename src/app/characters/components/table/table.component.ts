import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// Interfaces
import { Result } from '../../interfaces/characters.interfaces';

@Component({
  selector: 'characters-table',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent {

  list = input<Result[]>([]);
  errorMessage = input<string | unknown| null>();
  isLoading = input<boolean>(false);
  addToFavorite = output<Result>();

  detail = output<Result | null>();

  showDetail(character: Result|null) {
    this.detail.emit(character);
  }

  addFavorite(character: Result) {
    this.addToFavorite.emit(character);
  }

}
