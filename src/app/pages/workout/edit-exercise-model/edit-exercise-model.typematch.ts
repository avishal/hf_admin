import { FormGroup } from '@angular/forms';

// password and confirm password match
export function TypeMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        
        if (control.value == 0) {
            matchingControl.setErrors({ typeMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}
