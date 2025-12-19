import { Component, ChangeDetectorRef, inject, OnInit, signal } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AlarmComponent } from './alarm/alarm.component'
import { AuthService } from '../../service/auth.service'
import { Alarm, RaspberryApi } from '../../service/raspberry.api'

@Component({
    selector: 'alarm-manager',
    standalone: true,
    imports: [AlarmComponent],
    templateUrl: './alarm-manager.component.html',
    styleUrl: './alarm-manager.component.scss',
})
export class AlarmManagerComponent implements OnInit {
    api = inject(RaspberryApi)
    auth = inject(AuthService)
    formBuilder = inject(FormBuilder)
    cd = inject(ChangeDetectorRef)

    alarms: FormArray<FormGroup> = this.formBuilder.array<FormGroup>([]);
    alarmsSignal = signal<FormGroup[]>([])

    ngOnInit(): void {
        this.api.getAlarms(this.auth.token()!).subscribe({
            next: res => {
                res.forEach(a => this.alarms.push(this.createAlarmGroup(a)))
                this.alarmsSignal.set(this.alarms.controls)
            },
            error: err => console.error('Get alarms failed', err)
        })
    }

    private createAlarmGroup(alarm: Alarm): FormGroup {
        return this.formBuilder.group({
            day: [alarm.day],
            hour: [
                alarm.hour,
                [Validators.required, Validators.min(0), Validators.max(23)],
            ],
            minute: [
                alarm.minute,
                [Validators.required, Validators.min(0), Validators.max(59)],
            ],
            enabled: [alarm.enabled],
            melody: [alarm.melody, Validators.required],
        });
    }

    save(): void {
        if (this.alarms?.invalid) {
            this.alarms.markAllAsTouched();
            return;
        }
        this.api.saveAlarms(this.auth.token()!, this.alarms!.value)
            .subscribe({
                next: () => alert('Schedule saved'),
                error: err => console.error('Save failed', err),
            })
    }

}
