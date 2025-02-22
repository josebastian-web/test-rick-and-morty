import { Component, inject, signal } from '@angular/core';
import { DetailComponent } from '../../components/detail/detail.component';
import { TableComponent } from '../../components/table/table.component';
import { CharactersService } from '../../services/characters.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { SearchComponent } from '../../components/search/search.component';
// Interfaces
import { Result } from '../../interfaces/characters.interfaces';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    DetailComponent,
    TableComponent,
    PaginationComponent,
    SearchComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  charactersService = inject(CharactersService);
  isLoading = signal<boolean>(false);
  isError = signal<string|null>(null);
  charactersList = signal<Result[]>([]);
  currentPage = signal<number>(1);
  totalItems = signal<number>(0);
  totalPages = signal<number>(0);

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    if ( this.isLoading() ) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.charactersService.getItems(this.currentPage())
    .subscribe({
      next: ( response ) => {
        this.isLoading.set(false);
        this.isError.set(null);
        this.charactersList.set(response.results);
        this.totalItems.set(response.info.count);
        this.totalPages.set(response.info.pages);
      },
      error: ( err ) => {
        this.isLoading.set(false);
        this.charactersList.set([]);
        this.totalItems.set(0);
        this.totalPages.set(0);
        this.isError.set(err);
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadCharacters();
  }


}
