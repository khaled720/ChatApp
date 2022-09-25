import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { ChatPageComponent } from './chat-page/chat-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

  


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ChatPageComponent
  
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule, BrowserAnimationsModule,
    RouterModule.forRoot([

      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'chat', component: ChatPageComponent },
      { path: "*", component: HomeComponent }
     

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
