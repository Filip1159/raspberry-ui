import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-video-stream',
  standalone: true,
  imports: [],
  templateUrl: './video-stream.component.html',
  styleUrl: './video-stream.component.scss'
})
export class VideoStreamComponent {
    WHEP_URL = "http://10.174.167.213:8889/cam1/whep";
    API_URL = `https://apt-dane-urgently.ngrok-free.app/flask`
    videostreamOn = true

    constructor(private http: HttpClient, private authService: AuthService) {}

    handleCameraOn(): void {
        console.log('on')
        // this.http.get(`${this.API_URL}/start-cam`).subscribe(data => {
        //     console.log(data)
        // })
        // setTimeout(() => this.videostreamOn = true, 500)
        this.connectToStream()
    }

    handleCameraOff(): void {
        this.http.get(`${this.API_URL}/stop-cam`).subscribe(data => {
            console.log(data)
        })
        this.videostreamOn = false
    }

    async connectToStream(): Promise<void> {    
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }]
        });

        pc.ontrack = (event) => {
            const video = document.querySelector('#video') as HTMLVideoElement
            video.srcObject = event.streams[0];
        };

        pc.addTransceiver('video', { direction: 'recvonly' })

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const resp = await fetch(this.WHEP_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/sdp",
                "Authorization": `Bearer ${this.authService.token()}`
            },
            body: offer.sdp
        });

        console.log(resp)

        if (!resp.ok) {
            console.error("Błąd odpowiedzi WHEP:", await resp.text());
            alert("Błąd autentykacji lub odpowiedzi z MediaMTX. Sprawdź konsolę.");
            return;
        }

        const answerSdp = await resp.text();

        await pc.setRemoteDescription({
            type: "answer",
            sdp: answerSdp
        });

        console.log("Połączenie WebRTC ustanowione!");
    }
}
