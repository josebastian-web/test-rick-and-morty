import { Component, input, output, signal } from '@angular/core';
// Material
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'characters-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchField = signal<string>('');
  filterText = input<string>('');
  searchBy = output<string>();

  clearField () {
    this.searchField.set('');
    this.searchBy.emit('');
  }

  sendNewValue(value: string) {
    setTimeout(() => {
      this.searchBy.emit(value);
    }, 1000)
  }

}
