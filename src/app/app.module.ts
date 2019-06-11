import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GradebookComponent } from "./gradebook/gradebook.component";
import { NoCacheInterceptorService } from "./no-cache-interceptor.service";

@NgModule({
  declarations: [AppComponent, GradebookComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatGridListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoCacheInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
