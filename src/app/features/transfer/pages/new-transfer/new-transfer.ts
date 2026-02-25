import { BackButton } from '../../../../shared/components/back-button/back-button';
import { Component, computed, inject, signal, viewChild, effect, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SecurityModal } from '../../../../shared/components/security-modal/security-modal';
import { MatCardModule } from '@angular/material/card';
import { FohGrid } from '../../../../shared/layouts/foh-grid/foh-grid';
import { FohCol } from '../../../../shared/layouts/foh-col/foh-col';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { TransferService } from '../../service/transfer-service';
import { debounceTime, distinctUntilChanged, firstValueFrom, map, of, startWith, tap } from 'rxjs';
import { Account, AvailableType, FrequentOperation, TransferResponse, TransferSuccessResponse, TransferType } from '../../interfaces/transfer.model';
import { AccountAmountPipe } from '../../pipe/account-amount-pipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alert } from '../../../../shared/components/alert/alert';
import { DateFormatPipe } from '../../../../shared/pipes/date-format-pipe';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-pipe';
import { FrequentOperationStore } from '../../store/frequent.store';
import { CurrencyMask } from '../../../../shared/directives/currency-mask';
import { convertToCurrencyFormat, fixNumberCurrencyToString } from '../../../../shared/utils/currencyUtils';
import { FormUtils } from '../../../../shared/utils/FormUtils';
import { LoadingModal } from '../../../../shared/components/loading-modal/loading-modal';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-transfer',
  imports: [
    BackButton,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatChipsModule,
    CommonModule,
    MatDialogModule,
    FohGrid,
    FohCol,
    RouterLink,
    AccountAmountPipe,
    DateFormatPipe,
    CurrencyFormatPipe,
    CurrencyMask

  ],
  templateUrl: './new-transfer.html',
})
export class NewTransfer implements AfterViewInit, OnDestroy {
  private _formBuilder = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  frequentStore = inject(FrequentOperationStore)
  initialValue: FrequentOperation | null = null

  loadingCreateDraftTransfer = signal(false)
  formUtils = FormUtils;
  ngAfterViewInit(): void {
    this.initialValue = this.frequentStore.frequentOperationSelected()
    if (this.initialValue) {
      this.showTransferChannel.set(true);
      this.preFillForm(this.initialValue);
    }
  }

  ngOnDestroy(): void {
    this.frequentStore.clean()
  }

  stepper = viewChild.required<MatStepper>('transferStepper');
  transferService = inject(TransferService);

  documentTypes = [
    { value: 'dni', viewValue: 'DNI' },
    { value: 'ce', viewValue: 'CE' },
    { value: 'pasaporte', viewValue: 'Pasaporte' },
  ];

  typeTransferMap = [
    {
      value: 'OWN_ACCOUNT',
      viewValue: 'Financiera oh',
    },
    {
      value: 'INTERBANK',
      viewValue: 'CCI',
    },
  ];

  isCCISelected = false;
  isSaveAsFrequent = signal(false);
  showTransferChannel = signal(false);
  resultTransfer = signal<TransferSuccessResponse["data"] | null>(null)

  transferFormGroup = this._formBuilder.group({
    chargeAccountCtrl: ['', Validators.required],
    transferTypeCtrl: [
      { value: this.typeTransferMap[0].value, disabled: true },
      Validators.required,
    ],
    //  regla del backend (/^[0-9]{13,20}$/)
    destinationAccountCtrl: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]{13,20}$/)
      ]
    ],
    accountHolderNameCtrl: [{ value: '', disabled: true }, Validators.required],
    fullNameOrBusinessNameCtrl: [''],
    documentTypeCtrl: [''],
    documentNumberCtrl: [''],
    currencyCtrl: ['PEN', Validators.required],
    amountCtrl: [
      '',
      [Validators.required, FormUtils.min(1)],
    ],
    transferChannelCtrl: [''],
    commissionCtrl: [{ value: '0.00', disabled: true }],
    reasonCtrl: ['', Validators.required],
    saveAsFrequentCtrl: [false],
    frequentOperationNameCtrl: [''],
  });

  accountsResource = rxResource({
    stream: () =>
      this.transferService.getAccounts().pipe(
        map((response) => {
          if (!response.success) {
            throw new Error(response.message || 'Error al obtener cuentas');
          }
          return response.data;
        }),
        tap((data) => {
          if (this.frequentStore.frequentOperationSelected()) {
            const sourceAccount = data.find(dt => dt.accountNumber == this.frequentStore.frequentOperationSelected()?.sourceAccountNumber)
            this.transferFormGroup.patchValue({
              chargeAccountCtrl: sourceAccount?.accountId
            })
            this.transferFormGroup.get('transferTypeCtrl')?.enable();
          }
        })
      ),
  });

  accountsMap = computed(() => {
    if (!this.accountsResource.hasValue()) return null;
    return this.accountsResource.value()!.reduce((acc: Record<string, Account>, curr) => {
      acc[`${curr.accountId}`] = curr;
      return acc;
    }, {});
  });

  transferChannelConfig = rxResource({
    stream: () =>
      this.transferService.getTransferChannelConfiguration().pipe(
        map((response) => {
          if (!response.success) {
            throw new Error(response.message || 'Error al obtener cuentas');
          }
          return response.data;
        })
      ),
  });

  amountSignal = toSignal(
    this.transferFormGroup
      .get('amountCtrl')!
      .valueChanges.pipe(
        startWith(this.transferFormGroup.get('amountCtrl')!.value ?? 0),
        map(value => fixNumberCurrencyToString(value + '') ?? '0'),
        // map(val=>isNaN(parseFloat(val)) ? '0':val)
      )
  );
  // chargeAccountCtrl:

  preFillForm(operacion: FrequentOperation) {
    this.isCCISelected = operacion.recipientType === this.typeTransferMap[1].value;
    this.transferFormGroup.patchValue({
      currencyCtrl: operacion.currency,
      // destinationAccountCtrl: operacion.recipientCci || operacion.recipientAccountNumber,
      // accountHolderNameCtrl: operacion.recipientName,
      // fullNameOrBusinessNameCtrl: operacion.recipientName,
      reasonCtrl: operacion.description,
      // amountCtrl: convertToCurrencyFormat(operacion.amount?.toString()),
      transferTypeCtrl: operacion.recipientType,
      transferChannelCtrl: operacion.priority
      // frequentOperationNameCtrl: operacion.operationName,
    }, { emitEvent: true });

    if (!this.isCCISelected) {
      this.transferFormGroup.patchValue({
        destinationAccountCtrl: operacion.recipientCci
      })
    } else {
      this.transferFormGroup.patchValue({
        destinationAccountCtrl: operacion.recipientCci,
        fullNameOrBusinessNameCtrl: operacion.recipientName,
        documentNumberCtrl: operacion.recipientDocumentNumber,
        documentTypeCtrl: operacion.recipientDocumentType.toLowerCase()
      })
    }
  }

  transferChannelOptions = computed(() => {
    if (!this.amountSignal()) return null;
    console.log({ ammount: this.amountSignal() })
    const currency = this.transferFormGroup.get('currencyCtrl')?.value;
    if (!this.transferChannelConfig.hasValue()) return null;


    const tiposDisponiblesConfig = this.transferChannelConfig
      .value()
      .amountRanges.filter((rango) => {
        const limites = rango.limits[currency!];
        if (!limites) return null;
        const monto = this.amountSignal()!;
        console.log({ monto })
        const minValido = parseFloat(monto) >= limites.min;
        const maxValido = limites.max == null || parseFloat(monto) <= limites.max;
        return minValido && maxValido;
      })[0];
    let response: (TransferType & { comision?: AvailableType['commission'] })[] | null = [];
    tiposDisponiblesConfig.availableTypes.forEach((tipo) => {
      const temporal = this.transferChannelConfig
        .value()
        ?.transferTypes.filter((val) => val.id == tipo.id)[0] as TransferType;
      response?.push(temporal);
    });
    response = response.map((res) => {
      const index = tiposDisponiblesConfig.availableTypes.findIndex((t) => t.id == res.id);
      return {
        ...res,
        comision: tiposDisponiblesConfig.availableTypes[index].commission,
      };
    });
    return response.sort((a, b) => a.order - b.order);
  });

  comissionEffect = effect(() => {
    const channelOptions = this.transferChannelOptions()

    if (!channelOptions) return
    const channelSelected = this.transferFormGroup.get('transferChannelCtrl')?.value
    if (!channelSelected) return;
    if (channelOptions && channelSelected) {
      const search = channelOptions.filter(opt => opt.id === channelSelected)

      if (!search.length) return
      const { comision } = search[0]

      this.transferFormGroup.patchValue(
        {
          commissionCtrl: comision![this.transferFormGroup.get('currencyCtrl')?.value!].toString(),
        },
        { emitEvent: false }
      );
    }
  })

  destinationAccount = toSignal(
    this.transferFormGroup.get('destinationAccountCtrl')!.valueChanges.pipe(
      startWith(''),
      debounceTime(800),
      distinctUntilChanged(),
      map((value) => (value || '').trim())
    ),
    { initialValue: '' }
  );

  destinationAccountResource = rxResource({
    params: () => ({ destinationAccount: this.destinationAccount() }),
    stream: ({ params }) => {
      const acc = (params.destinationAccount || '').trim();

      // No llamo al backend si está vacío
      if (!acc) {
        return of(null);
      }

      // No llamo al backend si NO cumple el regex del Swagger
      if (!/^[0-9]{13,20}$/.test(acc)) {
        return of(null);
      }

      // No llamo si no es tipo Financiera Oh
      if (this.transferFormGroup.get('transferTypeCtrl')?.value !== this.typeTransferMap[0].value) {
        return of(null);
      }

      //  si todo está OK, llamo a la API
      return this.transferService.getDestinationAccount(acc);
    },
  });


  accountHolderEffect = effect((onCleanup) => {
    if (!this.destinationAccountResource.hasValue()) return;
    if (this.destinationAccountResource.isLoading()) return;
    const response = this.destinationAccountResource.value();
    if (response) {
      this.transferFormGroup.patchValue(
        {
          accountHolderNameCtrl: response.data.holderName!,
        },
        { emitEvent: false }
      );
    }
  });

  async startTransferFlow() {
    if (!this.transferFormGroup.valid) return;
    this.loadingCreateDraftTransfer.set(true)
    const formData = this.transferFormGroup.getRawValue();

    const account = this.accountsResource.value()?.find(acc => acc.accountId === formData.chargeAccountCtrl!)
    let toSend: any = {
      sourceAccountNumber: account?.accountNumber,
      type: formData.transferTypeCtrl!,
      amount: parseFloat(fixNumberCurrencyToString(formData.amountCtrl!)!),
      currency: formData.currencyCtrl!,
      description: formData.reasonCtrl!,
      saveAsFrequent: formData.saveAsFrequentCtrl!,
      frequentAlias: formData.frequentOperationNameCtrl!,
      destinationCCI: formData.destinationAccountCtrl!,
      commission: formData.commissionCtrl!,
    };
    if (formData.transferTypeCtrl! == this.typeTransferMap[0].value) { // internal transfer
      toSend = {
        ...toSend,
        beneficiaryName: formData.accountHolderNameCtrl!,
        beneficiaryDocumentType: this.destinationAccountResource.value()?.data.holderDocumentType.toUpperCase(),
        beneficiaryDocumentNumber:
          this.destinationAccountResource.value()?.data.holderDocumentNumber,
        priority: null
      };
    } else { // interbank transfer
      toSend = {
        ...toSend,
        beneficiaryName: formData.fullNameOrBusinessNameCtrl!,
        beneficiaryDocumentType: formData.documentTypeCtrl!.toUpperCase(),
        beneficiaryDocumentNumber: formData.documentNumberCtrl!,
        priority: this.transferFormGroup.get('transferChannelCtrl')?.value?.toUpperCase()
      };
      console.log(toSend)
    }
    //llamar backend para crear el BORRADOR
    const validateAndCreateDraftTransfer$ = this.transferService.validateAndCreateDraftTransfer(toSend);
    // const { message, success,data, errors } = await firstValueFrom(validateAndCreateDraftTransfer$)
    const dialogRef = this.dialog.open(LoadingModal, {
      disableClose: true,
      width: "100%",
      maxWidth: "534px",
      data: {
        action$: validateAndCreateDraftTransfer$,
        loadingMessage: 'Creando transferencia ...'
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        this.loadingCreateDraftTransfer.set(false)
        return;
      }
      if (!result.success) {
        this._snackBar.openFromComponent(Alert, {
          data: { message: result.message, type: 'error' },
          panelClass: [`alert-error`]
        })
        this.loadingCreateDraftTransfer.set(false)
        return;
      }

      if (result.data.requiresApproval) {
        this.resultTransfer.set(result.data);
        this.stepper().next();
        return;
      }
      const securityModalRef = this.dialog.open(SecurityModal, {
        disableClose: true,
        width: "100%",
        maxWidth: "534px",
        data: {
          transferId: result.data.transferId,
          confirmTransfer$: (transferId: string, credentials: any) =>
            this.transferService.confirmTransfer(transferId, credentials),
        },
      });

      securityModalRef.afterClosed().subscribe((result) => {
        this.loadingCreateDraftTransfer.set(false)
        if (result) {
          if (result.success) {
            this.resultTransfer.set(result.data)
            this.stepper().next();
          } else {
            this._snackBar.openFromComponent(Alert, {
              data: { message: result.message, type: 'error' },
              panelClass: [`alert-error`]
            })
          }
        }
      });
    })

  }
  onChargeAccountChange() {
    this.frequentStore.clean()
    const chargeAccount = this.transferFormGroup.get('chargeAccountCtrl')?.value;
    this.transferFormGroup
      .get('currencyCtrl')
      ?.setValue(this.accountsMap()![chargeAccount!].currency);
    const transferChannelCtrl = this.transferFormGroup.get('transferChannelCtrl');
    this.transferFormGroup.get('amountCtrl')?.reset();
    transferChannelCtrl?.clearValidators();
    transferChannelCtrl?.updateValueAndValidity();
    this.transferFormGroup.get('transferChannelCtrl')?.setValue('');
    this.transferFormGroup.get("reasonCtrl")?.setValue("")

    this.showTransferChannel.set(false);

    if (chargeAccount) {
      this.transferFormGroup.get('transferTypeCtrl')?.enable();
    } else {
      this.transferFormGroup.get('transferTypeCtrl')?.disable();
      this.transferFormGroup.get('transferTypeCtrl')?.setValue('');
    }
  }

  onTransferTypeChange(value: string) {
    this.isCCISelected = value === this.typeTransferMap[1].value;

    const fullNameCtrl = this.transferFormGroup.get('fullNameOrBusinessNameCtrl');
    const documentTypeCtrl = this.transferFormGroup.get('documentTypeCtrl');
    const documentNumberCtrl = this.transferFormGroup.get('documentNumberCtrl');
    const accountHolderCtrl = this.transferFormGroup.get('accountHolderNameCtrl');

    if (value === this.typeTransferMap[1].value) {
      // CCI seleccionado: Nombre completo y documentos son requeridos
      fullNameCtrl?.setValidators([Validators.required]);
      documentTypeCtrl?.setValidators([Validators.required]);
      documentNumberCtrl?.setValidators([Validators.required]);
      accountHolderCtrl?.clearValidators();
    } else {
      // Financiera OH: Titular es requerido
      fullNameCtrl?.clearValidators();
      documentTypeCtrl?.clearValidators();
      documentNumberCtrl?.clearValidators();
      accountHolderCtrl?.setValidators([Validators.required]);
    }

    fullNameCtrl?.updateValueAndValidity();
    documentTypeCtrl?.updateValueAndValidity();
    documentNumberCtrl?.updateValueAndValidity();
    accountHolderCtrl?.updateValueAndValidity();
  }

  onSaveAsFrequentChange(checked: boolean) {
    this.isSaveAsFrequent.set(checked);

    const frequentOperationNameCtrl = this.transferFormGroup.get('frequentOperationNameCtrl');
    if (checked) {
      frequentOperationNameCtrl?.setValidators([Validators.required]);
    } else {
      frequentOperationNameCtrl?.clearValidators();
    }
    frequentOperationNameCtrl?.updateValueAndValidity();
  }

  onAmountChange(amountTarget: string) {
    console.log('onAmountChange: ', amountTarget)
    const fixAmount = fixNumberCurrencyToString(amountTarget);
    if (!fixAmount || isNaN(Number(fixAmount))) {
      return;
    }

    const amountCtrl = this.transferFormGroup.get('amountCtrl');
    const transferChannelCtrl = this.transferFormGroup.get('transferChannelCtrl');

    const amount = this.transferFormGroup.get('amountCtrl')?.value;


    transferChannelCtrl?.clearValidators();
    transferChannelCtrl?.updateValueAndValidity();


    if (!amount || amount === '' || amount == null || parseFloat(fixNumberCurrencyToString(amount)!) <= 0) {
      this.showTransferChannel.set(false);
      return;
    }


    const chargeAccountId = this.transferFormGroup.get('chargeAccountCtrl')?.value;
    const accountsMap = this.accountsMap();
    if (chargeAccountId && accountsMap) {
      const account = accountsMap[chargeAccountId];


      const availableBalance =
        (account as any).availableBalance ??
        (account as any).balance ??
        (account as any).amount;

      const numericAmount = parseFloat(fixNumberCurrencyToString(amount)!);

      if (availableBalance != null && numericAmount > availableBalance) {

        amountCtrl?.setErrors({
          ...(amountCtrl.errors || {}),
          insufficientFunds: true,
        });
      } else {

        if (amountCtrl?.errors) {
          const { insufficientFunds, ...rest } = amountCtrl.errors;
          amountCtrl.setErrors(Object.keys(rest).length ? rest : null);
        }
      }
    }
    this.showTransferChannel.set(true);
    transferChannelCtrl?.setValidators([Validators.required]);
    if (this.transferChannelOptions()!.length > 0) {
      this.transferFormGroup.patchValue({
        transferChannelCtrl: this.transferChannelOptions()![0].id,
      });
    }

    transferChannelCtrl?.updateValueAndValidity();
  }

}

export default NewTransfer;
