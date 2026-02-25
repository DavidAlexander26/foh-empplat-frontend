import { Component, ViewEncapsulation, signal, inject, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { RequestLogin } from '../../../../core/models/auth.models';
import { AuthStore } from '../../../../core/store/auth.store';
import { Router } from '@angular/router';

interface DocumentType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SignInFormComponent {
  private fb = inject(FormBuilder);
  private authStore = inject(AuthStore);
  public isLoading = this.authStore.isLoading;
  private router = inject(Router);

  constructor() {
    effect(()=>{
      if(this.authStore.isAuthenticated()) {
        this.router.navigate(['/inicio'])
      }
    })
  }

  hidePassword = signal(true);

  documentTypes: DocumentType[] = [
    { value: '141', viewValue: 'DNI' },
    { value: '142', viewValue: 'Pasaporte' },
    { value: '146', viewValue: 'RUC' }
  ];

  signInForm: FormGroup = this.fb.group({
    documentType: ['141', Validators.required],
    documentNumber: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberDocument: [false]
  });

  togglePasswordVisibility(): void {
    this.hidePassword.set(!this.hidePassword());
  }

  onSubmit(): void {
    if (this.signInForm.invalid) return;

    const formValue = this.signInForm.value;

    const body: RequestLogin = {
      tipoDocumento: formValue.documentType,
      dni: formValue.documentNumber,
      contrasenia: formValue.password
    };

    this.authStore.login(body);
  }

  onForgotPassword(): void {
    console.log('Forgot password clicked');
    // Aquí iría la lógica para recuperar contraseña
  }
}
