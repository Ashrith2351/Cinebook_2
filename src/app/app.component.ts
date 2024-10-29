// app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchText: string = '';
  filteredMovies: any[] = [];
  allMovies: any[] = []; // Store all movies for index lookup

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((movies: any[]) => {
      this.allMovies = movies; // Store all movies on init
    });
  }

  onSearchChange(): void {
    if (this.searchText) {
      this.filteredMovies = this.allMovies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchText.toLowerCase()));
    } else {
      this.filteredMovies = [];
    }
  }

  navigateToMovieDetails(movieTitle: string): void {
    const index = this.allMovies.findIndex(movie => movie.title === movieTitle);
    this.router.navigate(['/movie', index]);
    this.searchText = ''; // Clear the search input after navigation
    this.filteredMovies = []; // Clear the dropdown
  }
}
