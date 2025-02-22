import { Component, input, output } from '@angular/core';

@Component({
  selector: 'characters-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  currentPage = input<number>(1);
  totalPages = input<number>();
  changePage = output<number>();

  pageSelect(page: number) {
    this.changePage.emit(page);
  }
}
