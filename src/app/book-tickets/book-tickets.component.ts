import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { MovieService } from '../services/movie.service';
import { CinemaService } from '../services/cinema.service';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.css']
})
export class BookTicketsComponent implements OnInit {
  movie: any;
  cinemas: any[] = [];
  selectedDate: Date = new Date();
  selectedShowtime: string = '';
  dates: Date[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private movieService: MovieService,
    private cinemaService: CinemaService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.movie = navigation?.extras.state ? navigation.extras.state['movie'] : null;
  }

  ngOnInit(): void {
    this.generateWeekDates();
    this.loadCinemas();
  }


  generateWeekDates() {
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Normalize today to have no time component
    this.selectedDate = new Date(today); // Set selectedDate to today
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      this.dates.push(date);
    }
  }

  loadCinemas() {
    this.cinemaService.getCinemas().subscribe(data => {
      this.cinemas = data;
    }, error => {
      console.error('Error fetching cinemas:', error);
    });
  }

  selectDate(date: Date) {
    this.selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Normalize selected date
  }
  isSelected(date: Date): boolean {
    return this.selectedDate.getDate() === date.getDate() &&
           this.selectedDate.getMonth() === date.getMonth() &&
           this.selectedDate.getFullYear() === date.getFullYear();
  }

  selectShowtime(cinema: any, showtime: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        movie: this.movie,
        cinema: cinema,
        date: this.selectedDate,
        showtime: showtime
      }
    };
    this.router.navigate(['/seat-selection'], navigationExtras);
  }

  goBack() {
    this.location.back();
  }
}
