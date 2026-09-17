import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReportService } from '../services/report.service';
import { ReportType } from '../model/report-type';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {NgForOf} from '@angular/common';
import {MatFormField, MatSelect} from '@angular/material/select';
import {MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  imports: [
    MatCard,
    MatLabel,
    NgForOf,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    FormsModule,
    MatRadioGroup,
    MatRadioButton
  ],
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent {
  @Input() requestId!: string;
  @Input() technicianId!: string;
  @Output() formCompleted = new EventEmitter<void>();

  reportType: ReportType = ReportType.MAINTENANCE;
  description: string = '';

  ReportType = ReportType; // para usar en el template
  typeOptions = Object.values(ReportType);

  constructor(private reportService: ReportService) {}

  submit(): void {
    if (!this.description) return;

    this.reportService.create({
      requestId: this.requestId,
      reportType: this.reportType,
      description: this.description
    }).subscribe(() => {
      this.formCompleted.emit();
      this.description = '';
    });
  }
}
