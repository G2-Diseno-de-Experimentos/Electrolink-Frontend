import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleEntity } from '../../model/schedule.entity';
import { ScheduleService } from '../../service/schedule.service';
import { ScheduleActionsComponent } from '../../component/schedule-actions/schedule-actions.component';
import { CreateScheduleComponent } from '../../component/schedule-form/create-schedule.component';
import { ScheduleViewComponent } from '../../component/schedule-view/schedule-view.component';

@Component({
  selector: 'app-schedule-page',
  standalone: true,
  imports: [
    CommonModule,
    ScheduleActionsComponent,
    CreateScheduleComponent
  ],
  templateUrl: './schedule-page.html',
  styleUrls: ['./schedule-page.css']
})
export class SchedulePage {
  schedules: ScheduleEntity[] = [];
  selectedSchedule: ScheduleEntity | null = null;

  constructor(private scheduleService: ScheduleService) {}

  updateSchedules(newSchedules: ScheduleEntity[]) {
    this.schedules = newSchedules;
    this.selectedSchedule = null;
  }

  onEdit(schedule: ScheduleEntity) {
    this.selectedSchedule = { ...schedule };
  }

  onDelete(id: number) {
    this.scheduleService.delete(id).subscribe({
      next: () => {
        this.schedules = this.schedules.filter(s => s.id !== id);
      },
      error: err => console.error('Error deleting schedule', err)
    });
  }

  onScheduleSaved() {
    this.selectedSchedule = null;
    this.scheduleService.getAll().subscribe({
      next: (data) => this.schedules = data,
      error: err => console.error('Error loading schedules', err)
    });
  }

  onCancelEdit() {
    this.selectedSchedule = null;
  }
}
