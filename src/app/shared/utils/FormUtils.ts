import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { fixNumberCurrencyToString } from "./currencyUtils";

export class FormUtils {
    static getTextError(errors: ValidationErrors) {
        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'Este campo es requerido';
                case 'min':
                    return `Valor mínimo debe ser ${errors['min']}`;
                case 'insufficientFunds':  //  NUEVO MENSAJE
                    return 'El monto supera el saldo disponible de la cuenta';
                default:
                    return `Error de validación no controlado ${key}`;
            }
        }
        return null;
    }

    static min(minValue: number) {
        return (control: AbstractControl) => {
            const value = fixNumberCurrencyToString(control.value);
            if (!value) {
                return { min: minValue }
            }
            if (parseFloat(value) < minValue) {
                return { min: minValue }
            }
            return null
        }
    }

    static isValidField(form: FormGroup, fieldName: string): boolean | null {
        return (
            !!form.controls[fieldName].errors && form.controls[fieldName].touched
        );

    }

    static getFieldError(form: FormGroup, fieldName: string): string | null {
        if (!form.controls[fieldName]) return null;
        const errors = form.controls[fieldName].errors ?? {};
        return FormUtils.getTextError(errors);
    }

}
