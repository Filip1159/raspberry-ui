import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { AuthService } from '../../service/auth.service'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [FontAwesomeModule, RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    authService = inject(AuthService)

    faArrowRightFromBracket = faArrowRightFromBracket

    logout() {
        this.authService.logout()
    }
}
