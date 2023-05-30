import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
// import { AppRoutingModule } from './app-routing.module';

import { Routes, RouterModule } from '@angular/router';
import { ParentService } from './parent.service';

const appRoutes: Routes = [
  { path: '', component: ParentComponent},
  { path: 'child/:parentId', component: ChildComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ParentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
