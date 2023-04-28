import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  addPropertyForm!: FormGroup;
  fb = inject(FormBuilder);

  constructor() {}

  ngOnInit(): void {
    this.addPropertyFormBuilder();
  }

  addPropertyFormBuilder() {
    this.addPropertyForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {}
}
