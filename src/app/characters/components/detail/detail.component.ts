import { Component, inject, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// Service
import { CharactersService } from '../../services/characters.service';
// Material
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
// Interfaces
import { Result } from '../../interfaces/characters.interfaces';
import { Episode } from '../../interfaces/episode.interfaces';
import { Location } from '../../interfaces/location.interfaces';

@Component({
  selector: 'characters-detail',
  standalone: true,
  imports: [ MatCardModule, MatButtonModule, CommonModule, MatProgressSpinnerModule ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})

export class DetailComponent implements OnChanges {

  charactersService = inject(CharactersService)
  character = input<Result|null>();
  origin = signal<Location|null>(null);
  location = signal<Location|null>(null);
  episode = signal<Episode|null>(null);

  residentOrigin = signal<Result|null>(null);
  residentLocation = signal<Result|null>(null);

  loadingLocation = signal<boolean>(true);
  loadingOrigin = signal<boolean>(true);
  loadingEpisode = signal<boolean>(true);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['character'].currentValue) {
      this.loadOrigin();
      this.loadLocation();
      this.loadEpisode();
    }
  }

  loadLocation() {
    let urlLocation = this.character()?.location.url;
    let idLocation = urlLocation?.split('/').pop();

    this.charactersService.getLocation(Number(idLocation))
    .subscribe({
      next: ( location ) => {
        this.loadingLocation.set(false);
        this.location.set(location)
        if (location.residents.length > 0) {
          this.loadResident(location.residents[0], 'location');
        }
      },
      error: ( err ) => {
        this.loadingLocation.set(false);
      }
    });
  }

  loadOrigin() {
    let urlOrigin = this.character()?.origin.url;
    let idLocation = urlOrigin?.split('/').pop();

    this.charactersService.getLocation(Number(idLocation))
    .subscribe({
      next: ( origin ) => {
        this.loadingOrigin.set(false);
        this.origin.set(origin)
        if (origin.residents.length > 0) {
          this.loadResident(origin.residents[0], 'origin');
        }
      },
      error: ( err ) => {
        this.loadingOrigin.set(false);
      }
    });
  }

  loadEpisode() {

    let urlEpisode = this.character()?.episode[0];
    let idEpisode = urlEpisode?.split('/').pop();

    this.charactersService.getEpisode(Number(idEpisode))
    .subscribe({
      next: ( episode ) => {
        this.loadingEpisode.set(false);
        this.episode.set(episode)
      },
      error: ( err ) => {
        this.loadingEpisode.set(false);
      }
    });
  }

  loadResident(resident: string, type: string) {
    let idResident = resident.split('/').pop();

    this.charactersService.getCharacter(Number(idResident))
    .subscribe({
      next: ( character ) => {
        if (type === 'location') {
          this.residentLocation.set(character);
        } else {
          this.residentOrigin.set(character);
        }
      },
      error: ( err ) => {
      }
    });
  }

}
