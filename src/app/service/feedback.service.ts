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


@Injectable()
export class FeedbackService {

    private Feedback;
    constructor(private http: Http,
        private httpc: HttpClient) { }

        getFeedbackDetails(id){
            if(id !== 0){
                return this.http.get(CMS_URL + '/common_feedback/getFeedbackDetails?login_id='+ id).map((response: Response) => {
                    if (response.json().code) {
                        return response.json().data
                    }
                }
                )  
            }else{
                return this.http.get(CMS_URL + '/common_feedback/getFeedbackDetails').map((response: Response) => {
                    if (response.json().code) {
                        return response.json().data
                    }
                }
                )
            }
            
        }

        getEmployeelist(){
            return this.http.get(CMS_URL + '/common_feedback/getEmployeeList').map((response: Response) => {
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
            
            return this.http.post(CMS_URL + '/common_feedback/updateFeedbackDetails', body, 
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
            return this.http.post(CMS_URL + '/common_feedback/getFeedbackReply',body).map((response: Response) => {
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
            return this.http.post(CMS_URL + '/common_feedback/updateFeedbackReply',body,{headers:headers}).map((response: Response) => {
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
            return this.http.post(CMS_URL + '/common_feedback/insertFeedbackReply',body,{headers:headers}).map((response: Response) => {
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
            return this.http.post(CMS_URL + '/common_feedback/sendReplyEmail',body,{headers:headers}).map((response: Response) => {
                if (response.json().code == 200) {
                    return response.json().data
                }
            }
            )
        }
}
