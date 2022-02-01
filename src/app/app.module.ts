import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapBoxModule } from './moduleMapBox/mapbox.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MapBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
