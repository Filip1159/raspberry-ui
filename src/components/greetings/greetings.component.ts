import { Component, inject } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { RaspberryApi } from '../../service/raspberry.api'

@Component({
    selector: 'greetings',
    standalone: true,
    imports: [FontAwesomeModule, ReactiveFormsModule],
    templateUrl: './greetings.component.html',
    styleUrl: './greetings.component.scss',
})
export class GreetingsComponent {
    private api = inject(RaspberryApi)

    faPaperPlane = faPaperPlane

    form = new FormGroup({
        text: new FormControl('', { validators: Validators.required, nonNullable: true }),
    })

    send() {
        this.api.sendGreeting(this.form.controls.text.value).subscribe({
            next: () => {
                alert('Greeting send! Thank you!')
                this.form.controls.text.reset()
            },
            error: () => alert('Failed to save greeting :( My bad...'),
        })
    }
}
