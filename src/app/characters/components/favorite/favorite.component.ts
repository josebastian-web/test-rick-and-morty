import { Component, input, output } from '@angular/core';
// Material
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Result } from '../../interfaces/characters.interfaces';


@Component({
  selector: 'characters-favorite',
  standalone: true,
  imports: [
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {
  list = input<Result[]>();
  idRemove = output<number>();
  character = output<Result>();

  removeFavorite(id: number) {
    this.idRemove.emit(id);
  }

  loadDetail(character: Result) {
    this.character.emit(character);
  }

}
