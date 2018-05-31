import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Feedback } from "../../../domain/feedback";
import { FeedbackService } from "../../../service/feedback.service";
import { ViewEncapsulation } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Employee } from "../../../domain/employee";
import {SelectItem} from 'primeng/api';

@Component({
    selector: 'feedback-root',
    styleUrls: ['./feedback.component.css'],
    templateUrl: './feedback.component.html',
    providers: [FeedbackService]
})
export class FeedbackComponent {

    feedback: Feedback = new Feedback();
    employee: Employee = new Employee();
    displayDialog: boolean;
    selectedFeedback: Feedback;
    loading: boolean;
    arrayfeedback: Feedback[];
    employeeArray: Employee[];
    selectedAssign: Employee;
    assign :SelectItem[] =[];
    constructor(private _feedback: FeedbackService) { }

    ngOnInit() {
        this.getFeedbackDetails();
        this.getemployee();
    }

    getFeedbackDetails() {
        this.loading = true;
        this._feedback.getFeedbackDetails().subscribe(
            (data: any) => {
                this.arrayfeedback = data;
                console.log(this.arrayfeedback);
                this.loading = false;
            })

    }

    selectFeedback(feedback: Feedback) {
        this.selectedFeedback = feedback;
        this.displayDialog = true;
    }

    getemployee() {
        this.loading = true;
        this._feedback.getEmployeelist().subscribe(
            (data: any) => {
                this.employeeArray = data;
                console.log(this.employeeArray);
                this.employeeArray.forEach(element => {
                    this.assign.push({label:element.name,value:element._id});
                });
                this.loading = false;
            })
    }
}
