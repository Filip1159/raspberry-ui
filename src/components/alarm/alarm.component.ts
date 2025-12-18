import { Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { AddLeadZeroPipe } from './add-lead-zero.pipe'
import { HttpClient } from '@angular/common/http'
import { AuthService } from '../../auth.service'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

@Component({
    selector: 'app-alarm',
    standalone: true,
    imports: [AddLeadZeroPipe, FontAwesomeModule],
    templateUrl: './alarm.component.html',
    styleUrl: './alarm.component.scss',
})
export class AlarmComponent {
    http = inject(HttpClient)
    auth = inject(AuthService)

    faPlay = faPlay

    API_URL = 'http://10.148.104.187:8080'

    @Input({ required: true }) day!: string
    @Input({ required: true }) hour!: number
    @Input({ required: true }) minute!: number
    @Input({ required: true }) enabled!: boolean
    @Input({ required: true }) melody!: string

    melodies = ['Are you sleeping', 'Nokia', 'Old MacDonald', 'Panic', 'Pink panther', 'Pirates', 'Twinkle']

    @Output() hourChanged = new EventEmitter<number>()
    @Output() minuteChanged = new EventEmitter<number>()
    @Output() enabledChanged = new EventEmitter<boolean>()
    @Output() melodyChanged = new EventEmitter<string>()

    incrementHour() {
        this.hourChanged.emit((this.hour + 1) % 24)
    }

    decrementHour() {
        this.hourChanged.emit((this.hour + 23) % 24)
    }

    incrementMinute() {
        this.minuteChanged.emit((this.minute + 1) % 60)
    }

    decrementMinute() {
        this.minuteChanged.emit((this.minute + 59) % 60)
    }

    toggleEnabled() {
        this.enabledChanged.emit(!this.enabled)
    }

    setMelody(event: Event) {
        this.melodyChanged.emit((event.target as HTMLSelectElement).value)
    }

    play(melody: string) {
        this.http
            .post(`${this.API_URL}/play`, JSON.stringify({ melody }), {
                headers: { Authorization: `Bearer ${this.auth.token()}`, 'Content-Type': 'application/json' },
            })
            .subscribe({
                error: err => console.error('Play failed', err),
            })
    }
}
