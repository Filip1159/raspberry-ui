import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-video-stream',
  standalone: true,
  imports: [],
  templateUrl: './video-stream.component.html',
  styleUrl: './video-stream.component.scss'
})
export class VideoStreamComponent {
    API_URL = `https://apt-dane-urgently.ngrok-free.app/flask`
    videostreamOn = false

    constructor(private http: HttpClient) {}

    handleCameraOn(): void {
        console.log('on')
        this.http.get(`${this.API_URL}/start-cam`).subscribe(data => {
            console.log(data)
        })
        setTimeout(() => this.videostreamOn = true, 500)
    }

    handleCameraOff(): void {
        this.http.get(`${this.API_URL}/stop-cam`).subscribe(data => {
            console.log(data)
        })
        this.videostreamOn = false
    }
}
