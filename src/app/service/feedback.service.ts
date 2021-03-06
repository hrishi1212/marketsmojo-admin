import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { FRAPI_URL } from './url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Feedback } from "../domain/feedback";
import { Employee } from "../domain/employee";
import { FeedbackRequest } from "../domain/feedback.request";
import { FeedbackReplyRequest } from "../domain/feedbackReply.request";
import { UpdateFeedbackReplyRequest } from "../domain/updateFeedbackReply.request";
import { sendEmail } from "../domain/sendemail";
import { CMS_URL } from './url.service';
import { FeedbackPage } from "../domain/feedbackpage";


@Injectable()
export class FeedbackService {

    private Feedback;
    constructor(private http: Http,
        private httpc: HttpClient) { }

        getFeedbackDetails(page:FeedbackPage){
                var headers = new Headers();
                headers.append('Content-Type', 'application/x-www-form-urlencoded');        
                var body = JSON.stringify(page);  
                return this.httpc.post<Feedback>(CMS_URL + '/feedback/getFeedbackDetails',body);
        }

        getFeedbackDetailsEmployee(id){
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');        
            var body = JSON.stringify(id);  
            return this.httpc.post<Feedback>(CMS_URL + '/feedback/getFeedbackDetailsEmployee',body);
        }

        getEmployeelist(){
            return this.http.get(CMS_URL + '/feedback/getEmployeeList').map((response: Response) => {
                if (response.json().code == 200) {
                    return response.json().data
                }
            }
            )
        }
   
        updateFeedback(feedbackRequest: FeedbackRequest) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');        
            var body = JSON.stringify(feedbackRequest);
            
            return this.http.post(CMS_URL + '/feedback/updateFeedbackDetails', body, 
            { headers : headers}).map((response: Response) => {
                if (response.json().code == 200) {
                    return response.json().data
                }
            }
            )
        }
    
        getFeedbackReply(feedbackReplyRequest:FeedbackReplyRequest){
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');        
            var body = JSON.stringify(feedbackReplyRequest);
            return this.http.post(CMS_URL + '/feedback/getFeedbackReply',body).map((response: Response) => {
                if (response.json().code == 200) {
                    return response.json().data
                }
            }
            )  
        }

        updateFeedbackReply(replyrequest :UpdateFeedbackReplyRequest ){
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');        
            var body = JSON.stringify(replyrequest);
            return this.http.post(CMS_URL + '/feedback/updateFeedbackReply',body,{headers:headers}).map((response: Response) => {
                if (response.json().code == 200) {
                    return response.json().data
                }
            }
            )
        }

        InsertFeedbackReply(replyrequest :UpdateFeedbackReplyRequest ){
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');        
            var body = JSON.stringify(replyrequest);
            return this.http.post(CMS_URL + '/feedback/insertFeedbackReply',body,{headers:headers}).map((response: Response) => {
                if (response.json().code == 200) {
                    return response.json().data
                }
            }
            )
        }

        sendEmail(sendEmail:sendEmail){
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');        
            var body = JSON.stringify(sendEmail);
            return this.http.post(CMS_URL + '/feedback/sendReplyEmail',body,{headers:headers}).map((response: Response) => {
                if (response.json().code == 200) {
                    return response.json().data
                }
            }
            )
        }
}
