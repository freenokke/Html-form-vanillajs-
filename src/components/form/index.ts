import BaseComponent from "../../utils/baseComponent";
import { dateInputValidation, emailInputValidation, passwordConfirmationValidation, passwordValidation, textInputValidation } from "../../utils/formValidation";
import Template from './template.html?raw';

export class Form extends BaseComponent {
  private isDirty = false;
  private nameInput: HTMLInputElement;
  private surnameInput: HTMLInputElement;
  private emailInput: HTMLInputElement;
  private passwordInput: HTMLInputElement;
  private confirmPasswordInput: HTMLInputElement;
  private birthdayDateInput: HTMLInputElement;
  private formValidation: Record< string, boolean>;
  private form: HTMLFormElement;

  constructor(parentNode: HTMLElement | null) {
    super('div', ['form-container'], parentNode, Template, {});
  }

  public init() {
    this.determineFormElements();
    this.initEventListeners()
  }

  private initEventListeners() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const isValid = this.checkValidation();
      if (isValid) {
        const formData = new FormData(this.form)
        await this.successfulSubmit(formData);
        this.isDirty = false;
        this.form.reset();
      } else {
        this.isDirty = true;
        this.showErrors()
      }
    })
    this.initInputsListeners()
  }

  private determineFormElements() {
    this.form = this.node.querySelector("form")
    this.nameInput = this.node.querySelector("input[name='name']");
    this.surnameInput = this.node.querySelector("input[name='surname']");
    this.emailInput = this.node.querySelector("input[name='email']");
    this.passwordInput = this.node.querySelector("input[name='password']");
    this.confirmPasswordInput = this.node.querySelector("input[name='confirm-password']");
    this.birthdayDateInput = this.node.querySelector("input[name='birthday']");
  }

  private checkValidation() {
    const validationResult: Record< string, boolean> = {
      nameInput: textInputValidation(this.nameInput.value),
      surnameInput: textInputValidation(this.surnameInput.value),
      emailInput: emailInputValidation(this.emailInput.value),
      passwordInput: passwordValidation(this.passwordInput.value),
      confirmPasswordInput: passwordConfirmationValidation(this.passwordInput.value, this.confirmPasswordInput.value),
      birthdayDateInput: dateInputValidation(this.birthdayDateInput.value),
    };
    this.formValidation = validationResult;
    return Object.values(validationResult).every((value) => value)
  }

  async successfulSubmit(data: FormData) {
    const body = JSON.stringify({
      name: data.get('name') as string,
      surname: data.get('surname') as string,
      email: data.get('email') as string,
      birthday: data.get('birthday') as string,
      password: data.get('password') as string,
      confirmedPassword: data.get('confirm-password') as string
    })
    
    const req = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    })
    const response = await req.json()
    console.log(body, response)
  }

  private showErrors() {
    if (!this.formValidation.nameInput) {
      this.displayErrorBlock(this.nameInput)
    }
    if (!this.formValidation.surnameInput) {
      this.displayErrorBlock(this.surnameInput)
    }
    if (!this.formValidation.emailInput) {
      this.displayErrorBlock(this.emailInput)
    }
    if (!this.formValidation.birthdayDateInput) {
      this.displayErrorBlock(this.birthdayDateInput)
    }
    if (!this.formValidation.passwordInput) {
      this.displayErrorBlock(this.passwordInput)
    }
    if (!this.formValidation.confirmPasswordInput) {
      this.displayErrorBlock(this.confirmPasswordInput)
    }
  }

  private displayErrorBlock(element: HTMLInputElement) {
    element.parentElement.nextElementSibling.classList.remove('hidden');
    element.classList.add('border', 'border-red-600')
  }

  private hideErrorBlock(element: HTMLInputElement) {
    element.parentElement.nextElementSibling.classList.add('hidden');
    element.classList.remove('border', 'border-red-600')
  }

  private initInputsListeners() {
    this.nameInput.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      if (!textInputValidation(target.value) && this.isDirty) {
        this.displayErrorBlock(this.nameInput)
      } else {
        this.hideErrorBlock(this.nameInput);
      }
    })
    this.surnameInput.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      if (!textInputValidation(target.value) && this.isDirty) {
        this.displayErrorBlock(this.surnameInput)
      } else {
        this.hideErrorBlock(this.surnameInput);
      }
    })
    this.emailInput.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      if (!emailInputValidation(target.value) && this.isDirty) {
        this.displayErrorBlock(this.emailInput)
      } else {
        this.hideErrorBlock(this.emailInput);
      }
    })
    this.birthdayDateInput.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      if (!dateInputValidation(target.value) && this.isDirty) {
        this.displayErrorBlock(this.birthdayDateInput)
      } else {
        this.hideErrorBlock(this.birthdayDateInput);
      }
    })
    this.passwordInput.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      if (!passwordValidation(target.value) && this.isDirty) {
        this.displayErrorBlock(this.passwordInput)
      } else {
        this.hideErrorBlock(this.passwordInput);
      }
    })
    this.confirmPasswordInput.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      if (!passwordConfirmationValidation(this.passwordInput.value, target.value) && this.isDirty) {
        this.displayErrorBlock(this.confirmPasswordInput)
      } else {
        this.hideErrorBlock(this.confirmPasswordInput);
      }
    })
  }
}