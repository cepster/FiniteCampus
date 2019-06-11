import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GradebookComponent } from "./gradebook/gradebook.component";

const routes: Routes = [
  { path: "gradebook", component: GradebookComponent },
  { path: "", redirectTo: "/gradebook", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
