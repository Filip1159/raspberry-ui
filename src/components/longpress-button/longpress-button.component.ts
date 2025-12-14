import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core'
import { Subject, Subscription, timer } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

@Component({
    selector: 'longpress-button',
    templateUrl: './longpress-button.component.html',
})
export class LongPressButton implements OnDestroy {
    @Input() intervalMs = 200

    @Output() press = new EventEmitter<void>()

    private stop$ = new Subject<void>()
    private subscription?: Subscription

    onPressStart(): void {
        this.stop$ = new Subject<void>()

        this.subscription = timer(0, this.intervalMs)
            .pipe(takeUntil(this.stop$))
            .subscribe(() => {
                this.press.emit()
            })
    }

    onPressEnd(): void {
        this.stop$.next()
        this.stop$.complete()
        this.subscription?.unsubscribe()
    }

    ngOnDestroy(): void {
        this.onPressEnd()
    }
}
