import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [],
  templateUrl: './label.component.html',
  styleUrl: './label.component.css',
})
export class LabelComponent {
  @Input() labelName: string = 'Label';
  @Input() customText: string = 'Example';
}
