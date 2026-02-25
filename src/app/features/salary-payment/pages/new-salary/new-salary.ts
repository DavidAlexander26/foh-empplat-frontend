import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackButton } from '../../../../shared/components/back-button/back-button';
import { MatButtonModule } from '@angular/material/button';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { FohGrid } from '../../../../shared/layouts/foh-grid/foh-grid';
import { FohCol } from '../../../../shared/layouts/foh-col/foh-col';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from "@angular/common";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Alert } from '../../../../shared/components/alert/alert';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, provideNativeDateAdapter } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import {
  LuxonDateAdapter,
  MAT_LUXON_DATE_ADAPTER_OPTIONS,
} from '@angular/material-luxon-adapter';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

export const LUXON_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'dd/MM/yyyy',
    timeInput: 'hh:mm a',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd/MM/yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
    timeInput: 'hh:mm a',
    timeOptionLabel: 'hh:mm a',
  },
};


@Component({
  selector: 'app-new-salary',
  imports: [
    BackButton,
    MatButtonModule,
    MatStepperModule,
    FohGrid,
    MatCardModule,
    FohCol,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTimepickerModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatChipsModule,
    CommonModule
  ],
  providers: [
    provideNativeDateAdapter(),
    {
      provide: DateAdapter,
      useClass: LuxonDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_LUXON_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    { provide: MAT_LUXON_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } },
    { provide: MAT_DATE_FORMATS, useValue: LUXON_DATE_FORMATS },
  ],
  templateUrl: './new-salary.html',
  styleUrl: './new-salary.scss',
})
export class NewSalary {
  stepper = viewChild.required<MatStepper>('salaryStepper');

  fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');
  fileInputReload = viewChild.required<ElementRef<HTMLInputElement>>('fileInputReload');

  fileControl = new FormControl<string | null>(null, Validators.required);
  fileName = signal('');
  isDragging = signal(false);
  minDate = new Date();
  isValidating = signal(false);

  private file: File | null = null;
  private allowedFiles = ['.txt', '.csv'];

  // Formulario del primer paso
  uploadForm: FormGroup = new FormGroup({
    archivo: new FormControl<File | null>(null, Validators.required)
  });

  // Formulario del segundo paso
  validationForm: FormGroup = new FormGroup({
    nombreLote: new FormControl('', [Validators.required, Validators.minLength(3)]),
    programarHora: new FormControl(''),
    programarDia: new FormControl('')
  });

  // Señales para los datos de validación del servicio
  validationData = signal<any | null>(null);
  isFileValid = signal(false);
  hasObservations = signal(false);

  matSort = viewChild(MatSort);
  matPaginator = viewChild(MatPaginator);
  page = signal(0);
  size = signal(20);
  totalRecords = signal(0);
  pageSizeOptions = [5, 10, 25, 100];
  displayedColumns: string[] = [
    'cuentaCargo',
    'monto',
    'moneda',
    'nombreColaborador',
    'numeroCuentaCci',
    'estado',
    'observacion',
  ];
  dataSource = new MatTableDataSource<any>();


  constructor(private snackBar: MatSnackBar) {
    this.dataSource.data = [
      { cuentaCargo: '1234567890', monto: 1500.00, moneda: 'PEN', nombreColaborador: 'Juan Pérez García', numeroCuentaCci: '00212345678901234567', estado: 'Válido', observacion: '' },
      { cuentaCargo: '0987654321', monto: 2300.50, moneda: 'USD', nombreColaborador: 'María López Martínez', numeroCuentaCci: '00298765432109876543', estado: 'Válido', observacion: '' },
      { cuentaCargo: '5555444433', monto: 890.75, moneda: 'PEN', nombreColaborador: 'Carlos Rodríguez Silva', numeroCuentaCci: '00255554444333322221', estado: 'Observado', observacion: 'CCI inválido' },
      { cuentaCargo: '1122334455', monto: 3200.00, moneda: 'USD', nombreColaborador: 'Ana Torres Flores', numeroCuentaCci: '00211223344556677889', estado: 'Válido', observacion: '' },
      { cuentaCargo: '9988776655', monto: 1750.25, moneda: 'PEN', nombreColaborador: 'Luis Ramírez Castro', numeroCuentaCci: '00299887766554433221', estado: 'Observado', observacion: 'Monto excede límite' }
    ];

  }

  fileSelected(): boolean {
    return this.file !== null;
  }

  private validateFileType(file: File): boolean {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    const isValid = this.allowedFiles.includes(extension);

    if (!isValid) {
      this.snackBar.openFromComponent(Alert, {
        data: { message: 'Solo se permiten archivos .txt o .csv', type: 'error' },
        panelClass: [`alert-error`],
        duration: 4000
      })
    }

    return isValid;
  }

  onDropzoneClick() {
    this.fileInput().nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (this.validateFileType(file)) {
        this.file = file;
        this.fileName.set(file.name);
        this.fileControl.setValue(file.name);

        this.uploadForm.patchValue({ archivo: file });
        // Resetear estado de validación cuando se carga un nuevo archivo
        this.resetValidationState();
      }

      input.value = '';
    }
  }


  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];

      if (this.validateFileType(file)) {
        this.file = file;
        this.fileName.set(file.name);
        this.fileControl.setValue(file.name);

        this.uploadForm.patchValue({ archivo: file });
        // Resetear estado de validación cuando se carga un nuevo archivo
        // this.resetValidationState();
      }
    }
  }

  private resetValidationState() {
    this.isFileValid.set(false);
    this.hasObservations.set(false);
    this.validationData.set(null);
    this.validationForm.reset();
    // this.dataSource.data = [];
  }

  validateFile() {
    if (!this.file) return;

    this.isValidating.set(true);
    console.log('Validando archivo:', this.file.name);

    setTimeout(() => {
      // this.snackBar.openFromComponent(Alert, {
      //   data: { message: 'No cumple con las reglas', type: 'error' },
      //   panelClass: [`alert-error`],
      //   duration: 8000
      // })
      const mockResponse = {
        isValid: true,
        monto: 12000.00,
        moneda: 'USD',
        totalLineas: 5,
        lineasValidas: 3,
        lineasObservadas: 0,
        // lineasObservadas: 2,
        observaciones: [
          { linea: 3, mensaje: 'CCI inválido' },
          { linea: 5, mensaje: 'Monto excede límite' }
        ],
        lineas: [
          { cuentaCargo: '1234567890', monto: 1500.00, moneda: 'PEN', nombreColaborador: 'Juan Pérez García', numeroCuentaCci: '00212345678901234567', estado: 'Válido', observacion: '' },
          { cuentaCargo: '0987654321', monto: 2300.50, moneda: 'USD', nombreColaborador: 'María López Martínez', numeroCuentaCci: '00298765432109876543', estado: 'Válido', observacion: '' },
          { cuentaCargo: '5555444433', monto: 890.75, moneda: 'PEN', nombreColaborador: 'Carlos Rodríguez Silva', numeroCuentaCci: '00255554444333322221', estado: 'Observado', observacion: 'CCI inválido' },
          { cuentaCargo: '1122334455', monto: 3200.00, moneda: 'USD', nombreColaborador: 'Ana Torres Flores', numeroCuentaCci: '00211223344556677889', estado: 'Válido', observacion: '' },
          { cuentaCargo: '9988776655', monto: 1750.25, moneda: 'PEN', nombreColaborador: 'Luis Ramírez Castro', numeroCuentaCci: '00299887766554433221', estado: 'Observado', observacion: 'Monto excede límite' }
        ]
      };
      this.processValidationResponse(mockResponse);
    }, 1500);
  }
  private processValidationResponse(response: any) {
    this.isValidating.set(false);
    this.validationData.set(response);
    this.isFileValid.set(response.isValid);
    this.hasObservations.set(response.lineasObservadas > 0);

    // this.dataSource.data = response.lineas;

    this.snackBar.openFromComponent(Alert, {
      data: {
        message: this.hasObservations()
          ? `Archivo validado con ${response.lineasObservadas} observaciones`
          : 'Archivo validado correctamente',
        type: this.hasObservations() ? 'warning' : 'success'
      },
      panelClass: [this.hasObservations() ? 'alert-warning' : 'alert-success'],
      duration: 4000
    });

    // Avanzar al siguiente paso
    this.stepper().next();
  }

  onReloadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (this.validateFileType(file)) {
        this.file = file;
        this.fileName.set(file.name);
        this.uploadForm.patchValue({ archivo: file });
        // Volver a validar automáticamente el nuevo archivo
        // un dialog
        this.snackBar.openFromComponent(Alert, {
          data: { message: 'Archivo recargado. Validando...', type: 'info' },
          panelClass: ['alert-info'],
          duration: 2000
        });
        this.validateFile();
      }

      input.value = '';
    }

    
  }

  canSubmitFile(): boolean {
    // Solo se puede enviar si:
    // 1. El archivo es válido
    // 2. No hay observaciones
    // 3. El formulario de validación es válido (nombre de lote requerido)
    return this.isFileValid() &&
      !this.hasObservations() &&
      this.validationForm.valid;
  }

  downloadObservations() {
    if (!this.hasObservations() || !this.validationData()) {
      this.snackBar.openFromComponent(Alert, {
        data: { message: 'No hay observaciones para descargar', type: 'info' },
        panelClass: ['alert-info'],
        duration: 3000
      });
      return;
    }

    console.log('Descargando observaciones:', this.validationData()?.observaciones);
    // Aquí iría tu lógica de descarga de observaciones
    // this.salaryService.downloadObservations(...)
  }

  submitFile(){
    console.log("next")
    // este next steep este dentro un dialog mientras carga

    this.stepper().next();


  }
  getEstadoClass(estado: string): string {
    return `status-${estado.toLowerCase()}`
  }
}

export default NewSalary;