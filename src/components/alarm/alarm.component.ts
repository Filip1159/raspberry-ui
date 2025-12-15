import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
    selector: 'app-alarm',
    standalone: true,
    imports: [],
    templateUrl: './alarm.component.html',
    styleUrl: './alarm.component.scss',
})
export class AlarmComponent {
    @Input({required: true}) day!: string
    @Input({required: true}) hour!: number
    @Input({required: true}) minute!: number

    @Output() onDayChanged = new EventEmitter<string>()
    @Output() onHourChanged = new EventEmitter<number>()
    @Output() onMinuteChanged = new EventEmitter<number>()
}
