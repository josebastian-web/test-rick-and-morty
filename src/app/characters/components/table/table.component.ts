import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Result } from '../../interfaces/characters.interfaces';

@Component({
  selector: 'characters-table',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent {

  list = input<Result[]>([]);
  errorMessage = input<string | unknown| null>();
  isLoading = input<boolean>(false);

}
