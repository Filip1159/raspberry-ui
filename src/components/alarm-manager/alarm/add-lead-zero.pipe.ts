import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'addLeadZero',
})
export class AddLeadZeroPipe implements PipeTransform {
    transform(value: number, length: number): string {
        return value.toString().padStart(length, '0')
    }
}
