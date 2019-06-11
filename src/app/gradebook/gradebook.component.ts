import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import * as toastr from "toastr";

export interface FakeGradebook {
  id: number;
  studentName: string;
  additionWorksheetScore: FakeScore;
  subtractionWorksheetScore: FakeScore;
  multiplicationWorksheetScore: FakeScore;
  divisionWorksheetScore: FakeScore;
}

export interface FakeScore {
  score: string;
  dirty: boolean;
}

export interface ScoreToSave {
  studentName: string;
  assignmentName: string;
  score: string;
}

@Component({
  selector: "app-gradebook",
  templateUrl: "./gradebook.component.html",
  styleUrls: ["./gradebook.component.scss"]
})
export class GradebookComponent implements OnInit {
  displayedColumns: string[] = [
    "studentName",
    "additionWorksheetScore",
    "subtractionWorksheetScore",
    "multiplicationWorksheetScore",
    "divisionWorksheetScore"
  ];

  dataSource: FakeGradebook[] = [
    {
      id: 1,
      studentName: "Bart Simpson",
      additionWorksheetScore: {
        score: "5",
        dirty: false
      },
      subtractionWorksheetScore: {
        score: "6",
        dirty: false
      },
      multiplicationWorksheetScore: {
        score: "3",
        dirty: false
      },
      divisionWorksheetScore: {
        score: "1",
        dirty: false
      }
    },
    {
      id: 2,
      studentName: "Milhouse Van Houten",
      additionWorksheetScore: {
        score: "6",
        dirty: false
      },
      subtractionWorksheetScore: {
        score: "8",
        dirty: false
      },
      multiplicationWorksheetScore: {
        score: "7",
        dirty: false
      },
      divisionWorksheetScore: {
        score: "6",
        dirty: false
      }
    },
    {
      id: 3,
      studentName: "Lisa Simpson",
      additionWorksheetScore: {
        score: "10",
        dirty: false
      },
      subtractionWorksheetScore: {
        score: "10",
        dirty: false
      },
      multiplicationWorksheetScore: {
        score: "10",
        dirty: false
      },
      divisionWorksheetScore: {
        score: "10",
        dirty: false
      }
    },
    {
      id: 4,
      studentName: "Martin Prince",
      additionWorksheetScore: {
        score: "10",
        dirty: false
      },
      subtractionWorksheetScore: {
        score: "10",
        dirty: false
      },
      multiplicationWorksheetScore: {
        score: "10",
        dirty: false
      },
      divisionWorksheetScore: {
        score: "10",
        dirty: false
      }
    }
  ];

  public saving = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchNotifications();
  }

  fetchNotifications() {
    setInterval(() => {
      console.log("Getting notifications");
      this.http
        .get<string[]>("http://localhost:4000/newNotifications")
        .subscribe((notifications: string[]) => {
          if (notifications.length > 0) {
            notifications.forEach(n => {
              toastr.success(n);
            });
          }
        });
    }, 2000);
  }

  recordChange(score: FakeScore, event) {
    score.dirty = true;
    score.score = event.target.value;
  }

  save() {
    this.saving = true;
    const dirtyScores: ScoreToSave[] = this.dataSource
      .map(g => {
        let collection: ScoreToSave[] = [];

        if (g.additionWorksheetScore.dirty) {
          collection.push({
            studentName: g.studentName,
            assignmentName: "Addition Worksheet",
            score: g.additionWorksheetScore.score
          });
        }
        if (g.subtractionWorksheetScore.dirty) {
          collection.push({
            studentName: g.studentName,
            assignmentName: "Subtraction Worksheet",
            score: g.subtractionWorksheetScore.score
          });
        }
        if (g.multiplicationWorksheetScore.dirty) {
          collection.push({
            studentName: g.studentName,
            assignmentName: "Multiplication Worksheet",
            score: g.multiplicationWorksheetScore.score
          });
        }
        if (g.divisionWorksheetScore.dirty) {
          collection.push({
            studentName: g.studentName,
            assignmentName: "Division Worksheet",
            score: g.divisionWorksheetScore.score
          });
        }

        return collection;
      })
      .reduce((s: ScoreToSave[], s2: ScoreToSave[]) => [...s, ...s2]);

    if (dirtyScores.length > 0) {
      this.http
        .post("http://localhost:4000/saveGradebook", dirtyScores)
        .subscribe(res => {
          this.saving = false;
        });

      this.markAllClean();
    } else {
      this.saving = false;
    }
  }

  markAllClean() {
    this.dataSource = this.dataSource.map(fg => {
      fg.additionWorksheetScore.dirty = false;
      fg.subtractionWorksheetScore.dirty = false;
      fg.multiplicationWorksheetScore.dirty = false;
      fg.divisionWorksheetScore.dirty = false;

      return fg;
    });
  }
}
