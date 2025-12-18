import { Component, EventEmitter, Input, Output } from '@angular/core'
import { AddLeadZeroPipe } from './add-lead-zero.pipe'

@Component({
    selector: 'app-alarm',
    standalone: true,
    imports: [AddLeadZeroPipe],
    templateUrl: './alarm.component.html',
    styleUrl: './alarm.component.scss',
})
export class AlarmComponent {
    @Input({required: true}) day!: string
    @Input({required: true}) hour!: number
    @Input({required: true}) minute!: number
    @Input({required: true}) enabled!: boolean

    @Output() onHourChanged = new EventEmitter<number>()
    @Output() onMinuteChanged = new EventEmitter<number>()
    @Output() onEnabledChanged = new EventEmitter<boolean>()

    incrementHour() {
        this.onHourChanged.emit((this.hour + 1) % 24)
    }

    decrementHour() {
        this.onHourChanged.emit((this.hour + 23) % 24) 
    }

    incrementMinute() {
        this.onMinuteChanged.emit((this.minute + 1) % 60)
    }

    decrementMinute() {
        this.onMinuteChanged.emit((this.minute + 59) % 60)
    }

    toggleEnabled() {
        this.onEnabledChanged.emit(!this.enabled)
    }
}
