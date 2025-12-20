import { Component } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faChess, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { faDuolingo, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

@Component({
    selector: 'about-me',
    imports: [FontAwesomeModule],
    templateUrl: './about-me.component.html',
    styleUrl: './about-me.component.scss',
})
export class AboutMe {
    faChess = faChess
    faUpRightFromSquare = faUpRightFromSquare
    faDuolingo = faDuolingo
    faGithub = faGithub
    faLinkedinIn = faLinkedinIn
}
