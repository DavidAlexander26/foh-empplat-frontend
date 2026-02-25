import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../components/sidebar/sidebar';
import { HeaderComponent } from '../../components/header';

@Component({
  selector: 'app-client-layout',
  imports: [RouterOutlet, Sidebar,HeaderComponent],
  templateUrl: './client-layout.html',
  styles: ``,
})
export class ClientLayout {

}
