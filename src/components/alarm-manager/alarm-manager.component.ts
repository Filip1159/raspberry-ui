import { Component, inject } from '@angular/core'
import { AlarmComponent } from '../alarm/alarm.component';
import { HttpClient } from '@angular/common/http';

export interface AlarmSchedule {
  day: string;
  hour: number;
  minute: number;
  melody: string;
}

@Component({
    selector: 'alarm-manager',
    standalone: true,
    imports: [AlarmComponent],
    templateUrl: './alarm-manager.component.html',
    styleUrl: './alarm-manager.component.scss',
})
export class AlarmManagerComponent {
    http = inject(HttpClient)

    readonly daysOfWeek = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ];

  schedules: AlarmSchedule[] = this.daysOfWeek.map(day => ({
    day,
    hour: 7,
    minute: 0,
    melody: 'default'
  }));

  save(): void {
    this.http.post('/api/schedule', this.schedules)
      .subscribe({
        next: () => console.log('Schedule saved'),
        error: err => console.error('Save failed', err)
      });
  }

}
