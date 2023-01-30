import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Error } from './error';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ErrorComponent>,@Inject(MAT_DIALOG_DATA) public error:Error) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }


}
