import { Component, inject, OnInit, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { AlarmComponent } from '../alarm/alarm.component';
import { AuthService } from '../../auth.service';

export interface AlarmSchedule {
  day: string;
  hour: number;
  minute: number;
  melody: string;
  enabled: boolean;
}

@Component({
    selector: 'alarm-manager',
    standalone: true,
    imports: [AlarmComponent],
    templateUrl: './alarm-manager.component.html',
    styleUrl: './alarm-manager.component.scss',
})
export class AlarmManagerComponent implements OnInit {
    http = inject(HttpClient)
    auth = inject(AuthService)

    API_URL = 'http://10.148.104.187:8080'

    readonly daysOfWeek = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ];

  schedules = signal<AlarmSchedule[]>([])

  ngOnInit(): void {
    this.http.get<AlarmSchedule[]>(`${this.API_URL}/alarms`, { headers: { Authorization: `Bearer ${this.auth.token()}` } } )
      .subscribe({
        next: res => { console.log(res); this.schedules.set(res) },
        error: err => console.error('Save failed', err)
      });
  }

  // schedules: AlarmSchedule[] = this.daysOfWeek.map(day => ({
  //   day,
  //   hour: 7,
  //   minute: 0,
  //   melody: 'default',
  //   enabled: true
  // }));

  setMinute(day: string, minute: number) {
    this.schedules.set(this.schedules().map(item => {
      if (item.day === day) return {...item, minute}
      else return item
    }))
  }

  setHour(day: string, hour: number) {
    this.schedules.set(this.schedules().map(item => {
      if (item.day === day) return {...item, hour}
      else return item
    }))
  }

  setEnabled(day: string, enabled: boolean) {
    this.schedules.set(this.schedules().map(item => {
      if (item.day === day) return {...item, enabled}
      else return item
    }))
  }

  save(): void {
    this.http.post(`${this.API_URL}/alarms`, this.schedules)
      .subscribe({
        next: () => console.log('Schedule saved'),
        error: err => console.error('Save failed', err)
      });
  }

}
