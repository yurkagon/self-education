import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';

import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';

import { FilterBySearch } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FilterBySearch
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
