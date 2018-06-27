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
import {EditorModule} from 'primeng/editor';
import { sendEmail } from "../../../domain/sendemail";
import {FieldsetModule} from 'primeng/fieldset';
import {InputTextModule} from 'primeng/inputtext';

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
    sendemail : sendEmail = new sendEmail();

    selectedFeedback: Feedback;
    selectedreply: FeedbackReply;
    displayDialog: boolean;
    displayReply: boolean;
    loading: boolean;
    assignID :string = localStorage.getItem("login_id");

    arrayfeedback: Feedback[];
    assignfeedback : Feedback[];
    employeeArray: Employee[];
    FeedbackReply: FeedbackReply[];
    selectedAssign: any;
    assign: SelectItem[] = [];
    status: SelectItem[] = [];
    selectedStatus: any;

    text1: string = '<div>Hello User!</div><div>MarketsMojo <b>Editor</b> Rocks</div><div><br></div>';

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
        this._feedback.getFeedbackDetails(0).subscribe(
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
        this.selectedFeedback = feedback;
        this.displayDialog = true;
        
    }
    onRowSelect(event){
        this.selectedFeedback.suggestion= event.data.suggestion;
        this.selectedFeedback.page = event.data.page;
        this.selectedFeedback.status = event.data.status;
        this.selectedFeedback.type = event.data.type;
        this.displayDialog = true;
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
        if (!feedback.date) {
            feedback.date = new Date();
        }
        this.feedbackRequest.date = feedback.date;
        this.feedbackRequest._id = feedback._id;
        this.feedbackRequest.name = feedback.name;
        this.feedbackRequest.page = feedback.page;
        this.feedbackRequest.status = this.selectedStatus;
        if(this.selectedStatus == 1){
            this.feedbackRequest.status_name = "PENDING";
        }else if(this.selectedStatus == 2){
            this.feedbackRequest.status_name = "INPROCESS";
        }else if(this.selectedStatus == 3){
            this.feedbackRequest.status_name = "COMPLETE";
        }else if(this.selectedStatus == 4){
            this.feedbackRequest.status_name = "OTHER";
        }
        this.feedbackRequest.assign = this.selectedAssign;
       this.employeeArray.forEach(value=>{
        if(this.selectedAssign == value._id){
            this.feedbackRequest.assign_id = value.login_id;
            this.feedbackRequest.assign_name = value.name;
        }
       });
        this.feedbackRequest.suggestion = feedback.suggestion;
        this.feedbackRequest.type = feedback.type;
        
        this._feedback.updateFeedback(this.feedbackRequest).subscribe(
            (data: any) => {
                if (data) {
                    this.getFeedbackDetails();
                    this.displayDialog = false;
                }
                this.getfeedbackDetailsId();
            })

    }
    
    getFeedbackReply(fid) {
        this.feedbackReplyRequest.fid = fid;
        this.loading = true;
        this._feedback.getFeedbackReply(this.feedbackReplyRequest).subscribe(
            (data: any) => {
                this.FeedbackReply = data;
               if(this.FeedbackReply){
                this.FeedbackReply.forEach(value=>{
                    this.employeeArray.forEach(element=>{
                        if(value.eid == element._id){
                            value.e_name = element.name;
                        }
                    });
                });
               }
                
                this.loading = false;
            })

    }

    SendReply(){
        this.sendemail.message="<div>Hello User!</div><div>MarketsMojo <b>Editor</b> Rocks</div><div><br></div>";
        this.displayReply = true;
    }
  

    getfeedbackDetailsId(){
        this.loading = true;
        this._feedback.getFeedbackDetails(this.assignID).subscribe(
            (data: any) => {
                if (data) {
                    this.assignfeedback = data;
                    this.getemployee();
                    this.loading = false;
                } else {
                    this.assignfeedback =[];
                    this.loading = false;
                }

            })
    }

    handleChange(event){
        if(event.index == 1){
            this.getfeedbackDetailsId();
        }else if(event.index == 0){
            this.getFeedbackDetails();
        }
    }

    sendEmailReply(selectedFeedback){
       
        this.sendemail.to_email = selectedFeedback.email;
        this.sendemail.to_name= selectedFeedback.name;
        this._feedback.sendEmail(this.sendemail).subscribe(
            (data: any) => {
                this.displayReply = false;
            });

            var userid  = localStorage.getItem("userid");

            this.updatefeedback.fid = selectedFeedback._id;
            this.updatefeedback.eid = userid;
            this.updatefeedback.reply = this.sendemail.message;
            this._feedback.InsertFeedbackReply(this.updatefeedback).subscribe(
                (data: any) => {
                    this.getFeedbackReply(selectedFeedback._id);
                })
    }

    selectEmailFeedback(feedback: Feedback) {
        this.sendemail.message="<div>Hello User!</div><div>MarketsMojo <b>Editor</b> Rocks</div><div><br></div>";
        this.selectedFeedback = feedback
        this.getFeedbackReply(feedback._id);
        this.displayReply = true;
        
    }

    Emailsave() {
        
        this.sendEmailReply(this.selectedFeedback);
    }
}