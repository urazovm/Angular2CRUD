import {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {ApiService} from './api.service';

@Component({
    selector: 'login',
    template: `
        <h4>Login</h4>

        <span *ngIf="loginError">
            Invalid Email/Password Combination. 
            Please Try Again.
            <br>
            <br>
        </span>

        <form #f="ngForm" (ngSubmit)="onSubmit(email.value, password.value)">
            <label for="email">Email</label>
            <input type="email" #email id="email" required>

            <label for="password">Password</label>
            <input type="password" #password required>

            <button type="submit">Submit</button>
            <a href="create">Create Account</a>
        </form>
    `
})
export class AccountLoginComponent {
    public loginError = false; // True if there is a login error.

    /**
     * AccountLoginComponent Constructor.
     *
     * @param {Router} _router - Private Router injected into this component.
     * @param {ApiService} _apiService - Private ApiService injected into this component.
     * Note: Underscore convention in Angular 2 signifies a private variable.
     */
    constructor(private _router: Router,
                private _apiService: ApiService) {}

    /**
     * Submit click handler.
     */
    onSubmit(email, password) {
        this.loginError = false;

        this._apiService.loginAccount(email, password, success => {
            if (success) {
                this._router.navigate(['Dashboard/Contacts']);
            } else {
                this.loginError = true;
            }
        });
    }
}