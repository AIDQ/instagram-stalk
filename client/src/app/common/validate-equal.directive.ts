import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidateEqualDirective), multi: true }
  ]
})
export class ValidateEqualDirective implements Validator {
  constructor( @Attribute('validateEqual') public validateEqual: string,
    @Attribute('reverse') public reverse: string) {
  }

  private get isReverse() {
    if (!this.reverse) {
      return false;
    }
    return this.reverse === 'true' ? true : false;
  }

  validate(c: AbstractControl): { [key: string]: any } {
    const value = c.value;
    const othervalue = c.root.get(this.validateEqual);

    if (othervalue && value !== othervalue.value && !this.isReverse) {
      return {
        validateEqual: false
      };
    }

    if (othervalue && value === othervalue.value && this.isReverse) {
      delete othervalue.errors['validateEqual'];
      if (!Object.keys(othervalue.errors).length) {
        othervalue.setErrors(null);
      }
    }

    if (othervalue && value !== othervalue.value && this.isReverse) {
      othervalue.setErrors({ validateEqual: false });
    }

    return null;
  }
}
