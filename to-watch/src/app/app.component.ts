// import { CatalogComponent } from './catalog/catalog.component';
// import { HomeComponent } from './home/home.component';
import { ErrorMsgComponent } from './core/error-msg/error-msg.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FooterComponent } from './footer/footer.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent, FooterComponent, ErrorMsgComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
