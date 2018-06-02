import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Feedback } from "../../../domain/feedback";
import { FeedbackService } from "../../../service/feedback.service";
import { ViewEncapsulation } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Employee } from "../../../domain/employee";
import { SelectItem } from 'primeng/api';
import { FeedbackRequest } from "../../../domain/feedback.request";
import { FeedbackReply } from "../../../domain/feedbackReply";
import { FeedbackReplyRequest } from "../../../domain/feedbackReply.request";
import { ListboxModule } from 'primeng/listbox';
import { UpdateFeedbackReplyRequest } from "../../../domain/updateFeedbackReply.request";

@Component({
    selector: 'feedback-root',
    styleUrls: ['./feedback.component.css'],
    templateUrl: './feedback.component.html',
    providers: [FeedbackService]
})
export class FeedbackComponent {

    feedback: Feedback = new Feedback();
    employee: Employee = new Employee();
    feedbackRequest: FeedbackRequest = new FeedbackRequest();
    feedbackReply: FeedbackReply = new FeedbackReply();
    feedbackReplyRequest: FeedbackReplyRequest = new FeedbackReplyRequest();
    updatefeedback: UpdateFeedbackReplyRequest = new UpdateFeedbackReplyRequest();

    selectedFeedback: Feedback;
    selectedreply: FeedbackReply;
    displayDialog: boolean;
    loading: boolean;

    arrayfeedback: Feedback[];
    employeeArray: Employee[];
    FeedbackReply: FeedbackReply[];
    selectedAssign: any;
    assign: SelectItem[] = [];
    status: SelectItem[] = [];
    selectedStatus: any;


    constructor(private _feedback: FeedbackService) {

        this.status = [{ label: 'select status', value: 0 },
        { label: 'PENDING', value: 1 },
        { label: 'INPROCESS', value: 2 },
        { label: 'COMPLETE', value: 3 },
        { label: 'OTHER', value: 4 },
        ]

    }

    ngOnInit() {
        this.getFeedbackDetails();
    }

    getFeedbackDetails() {
        this.loading = true;
        this._feedback.getFeedbackDetails().subscribe(
            (data: any) => {
                if (data) {
                    this.arrayfeedback = data;
                    this.getemployee();

                } else {
                    this.loading = false;
                }

            })

    }

    selectFeedback(feedback: Feedback) {
        this.selectedFeedback = feedback
        this.displayDialog = true;
        this.getFeedbackReply(feedback._id);
    }

    save() {
        this.sendFeedbackRequest(this.selectedFeedback);
    }

    getemployee() {
        this.loading = true;
        this._feedback.getEmployeelist().subscribe(
            (data: any) => {
                this.employeeArray = data;
                this.assign = [
                    { label: 'Select Employee', value: "0" }
                ];
                this.employeeArray.forEach(element => {
                    this.assign.push(
                        { label: element.name, value: element._id });
                });
                this.loading = false;
            })
    }

    sendFeedbackRequest(feedback: Feedback) {
        this.selectedFeedback = feedback;
        console.log(feedback.date);
        if (!feedback.date) {
            feedback.date = new Date();
        }
        this.feedbackRequest.date = feedback.date;
        this.feedbackRequest._id = feedback._id;
        this.feedbackRequest.name = feedback.name;
        this.feedbackRequest.page = feedback.page;
        this.feedbackRequest.status = this.selectedStatus;
        this.feedbackRequest.assign = this.selectedAssign;
        this.feedbackRequest.suggestion = feedback.suggestion;
        this.feedbackRequest.type = feedback.type;
        if(this.updatefeedback.reply){
            this.updateReply();
        }
        this._feedback.updateFeedback(this.feedbackRequest).subscribe(
            (data: any) => {
                if (data !== 'undefinded') {
                    this.getFeedbackDetails();
                    this.displayDialog = false;
                }

            })

    }
    getFeedbackReply(id) {
        this.feedbackReplyRequest.fid = id;
        this.loading = true;
        this._feedback.getFeedbackReply(this.feedbackReplyRequest).subscribe(
            (data: any) => {
                this.FeedbackReply = data;
                console.log(this.FeedbackReply);
                this.loading = false;
            })

    }

    updateReply(){
        this.updatefeedback._id = 4;
        this._feedback.updateFeedbackReply(this.updatefeedback).subscribe(
            (data: any) => {
                console.log(data);
                this.getFeedbackReply(4);
            })
    }
}