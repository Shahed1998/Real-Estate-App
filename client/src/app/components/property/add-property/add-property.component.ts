import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  addPropertyForm!: FormGroup;
  fb = inject(FormBuilder);
  @ViewChild('pricingArea') pA!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.addPropertyFormBuilder();
  }

  addPropertyFormBuilder() {
    this.addPropertyForm = this.fb.group({
      // Basic info tab
      name: [null, [Validators.required, Validators.minLength(5)]],
      type: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
  }

  get Name() {
    return this.addPropertyForm.get('name') as FormControl;
  }

  get Type() {
    return this.addPropertyForm.get('type') as FormControl;
  }

  get Price() {
    return this.addPropertyForm.get('price') as FormControl;
  }

  nextBtn(event: Event, openTab: string) {
    if (openTab === 'pricingArea') this.pA.nativeElement.click();
  }

  onSubmit() {}
}
