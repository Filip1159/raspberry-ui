import { inject, Injectable, signal } from '@angular/core'
import { RaspberryApi } from './raspberry.api'
import { AuthService } from './auth.service'

@Injectable({ providedIn: 'root' })
export class WebRTCService {
    private api = inject(RaspberryApi)
    private auth = inject(AuthService)

    private stream = signal<MediaStream | null>(null)
    readonly mediaStream = this.stream.asReadonly()

    private _authorized = signal<boolean>(false)
    readonly authorized = this._authorized.asReadonly()

    async cameraOn(): Promise<void> {
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
        })

        pc.ontrack = e => this.stream.set(e.streams[0])

        pc.addTransceiver('video', { direction: 'recvonly' })

        const offer = await pc.createOffer()
        await pc.setLocalDescription(offer)

        this.api.authorizeWebRTC(this.auth.token()!, offer.sdp).subscribe({
            next: res => {
                pc.setRemoteDescription({
                    type: 'answer',
                    sdp: res.toString(),
                }).then(() => this._authorized.set(true))
            },
            error: err => {
                console.error(err)
                alert('WebRTC authorization failure!')
            },
        })
    }
}
