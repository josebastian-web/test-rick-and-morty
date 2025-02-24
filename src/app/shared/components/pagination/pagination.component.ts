import { Component, input, output } from '@angular/core';
// Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'characters-pagination',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  currentPage = input<number>(1);
  totalPages = input<number>();
  changePage = output<number>();
  isLoading = input<boolean>();

  pageSelect(page: number) {
    this.changePage.emit(page);
  }
}
