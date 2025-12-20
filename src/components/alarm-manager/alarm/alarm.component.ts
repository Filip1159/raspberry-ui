import { Component, inject, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { AddLeadZeroPipe } from './add-lead-zero.pipe'
import { AuthService } from '../../../service/auth.service'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { RaspberryApi } from '../../../service/raspberry.api'

@Component({
    selector: 'app-alarm',
    standalone: true,
    imports: [AddLeadZeroPipe, FontAwesomeModule],
    templateUrl: './alarm.component.html',
    styleUrl: './alarm.component.scss',
})
export class AlarmComponent {
    faPlay = faPlay

    api = inject(RaspberryApi)
    auth = inject(AuthService)

    melodies = ['Are you sleeping', 'Nokia', 'Old MacDonald', 'Panic', 'Pink panther', 'Pirates', 'Twinkle']

    play(melody: string) {
        this.api.playMelody(this.auth.token()!, melody).subscribe({
            error: err => console.error('Play failed', err),
        })
    }

    @Input({ required: true })
    form!: FormGroup

    get hour() {
        return this.form.get('hour')!.value
    }

    get minute() {
        return this.form.get('minute')!.value
    }

    incrementHour(): void {
        const h = this.form.get('hour')!
        h.setValue((h.value + 1) % 24)
    }

    decrementHour(): void {
        const h = this.form.get('hour')!
        h.setValue((h.value + 23) % 24)
    }

    incrementMinute(): void {
        const h = this.form.get('minute')!
        h.setValue((h.value + 1) % 60)
    }

    decrementMinute(): void {
        const h = this.form.get('minute')!
        h.setValue((h.value + 59) % 60)
    }

    toggleEnabled(): void {
        const c = this.form.get('enabled')!
        c.setValue(!c.value)
    }

    setMelody(event: Event): void {
        const value = (event.target as HTMLSelectElement).value
        this.form.get('melody')!.setValue(value)
    }
}
