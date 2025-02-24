import { Component, inject, signal } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
// Component
import { DetailComponent } from '../../components/detail/detail.component';
import { TableComponent } from '../../components/table/table.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { SearchComponent } from '../../components/search/search.component';
import { FavoriteComponent } from '../../components/favorite/favorite.component';
import { MatCardModule } from '@angular/material/card';
// Interfaces
import { Result } from '../../interfaces/characters.interfaces';
import { SummaryComponent } from '../../../shared/components/summary/summary.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    DetailComponent,
    TableComponent,
    PaginationComponent,
    SearchComponent,
    FavoriteComponent,
    MatCardModule,
    SummaryComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  charactersService = inject(CharactersService);
  isLoading = signal<boolean>(false);
  isLoadingAll = signal<boolean>(false);
  isError = signal<string|null>(null);
  isErrorAll = signal<string|null>(null);
  charactersList = signal<Result[]>([]);
  currentPage = signal<number>(1);
  totalItems = signal<number>(0);
  totalPages = signal<number>(0);
  detailCharacter = signal<Result|null>(null);
  searchName = signal<string>('');
  searchSpecies = signal<string>('');
  listFavorite = signal<Result[]>([]);
  totalSpecies = signal<number>(0);
  totalType = signal<number>(0);

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    if ( this.isLoading() ) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.charactersService.getListCharacters(
      this.currentPage(),
      this.searchName(),
      this.searchSpecies()
    )
    .subscribe({
      next: ( response ) => {
        this.isLoading.set(false);
        this.isError.set(null);
        this.charactersList.set(response.results);
        this.totalItems.set(response.info.count);
        this.totalPages.set(response.info.pages);
        this.totalSpecies.set(this.countFilterBy(response.results, 'species'));
        this.totalType.set(this.countFilterBy(response.results, 'type'));
      },
      error: ( err ) => {
        this.isLoading.set(false);
        this.charactersList.set([]);
        this.totalItems.set(0);
        this.totalPages.set(0);
        this.isError.set(err);
        this.totalSpecies.set(0);
        this.totalType.set(0);
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadCharacters();
  }

  showDetail(detail: Result|null) {
    this.detailCharacter.set(detail);
  }

  searchByName(value: string) {
    this.searchName.set(value);
    this.loadCharacters();
  }

  searchBySpecies(value: string) {
    this.searchSpecies.set(value);
    this.loadCharacters();
  }

  addToFavorite(character: Result) {

    let findCharacter = this.listFavorite().find(fav => fav.id === character.id);

    if (!findCharacter) {
      this.listFavorite.update(values => {
        return [...values, character]
      });
    }
  }

  removeFavorite(id: number) {

    this.listFavorite.update(values => {
      let index = values.findIndex(val => val.id === id);
      values.splice(index, 1);
      return [...values];
    });
  }


  countFilterBy(list: Result[], filterProp:'species'|'type' ): number {

    let accElemets: Result[] = [];

    let total: number = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i][filterProp] !== '') {
        let findCoincidence = accElemets.find(
          el => el[filterProp] === list[i][filterProp]
        );

        if (!findCoincidence) {
          total++;
          accElemets.push(list[i]);
        }
      }
    }
    return total;
  }

}
