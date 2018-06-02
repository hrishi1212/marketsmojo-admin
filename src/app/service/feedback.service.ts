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


@Injectable()
export class FeedbackService {

    private Feedback;
    constructor(private http: Http,
        private httpc: HttpClient) { }

        getFeedbackDetails(){
            return this.http.get(FRAPI_URL + '/common_feedback/getFeedbackDetails').map((response: Response) => {
                if (response.json().code == 200) {
                    return response.json().data
                }
            }
            )
        }

        getEmployeelist(){
            return this.http.get(FRAPI_URL + '/common_feedback/getEmployeeList').map((response: Response) => {
                if (response.json().code == 200) {
                    return response.json().data
                }
            }
            )
        }
   
        updateFeedback(feedbackRequest: FeedbackRequest) {
            console.log(typeof feedbackRequest);
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');        
            var body = JSON.stringify(feedbackRequest);
            
            return this.http.post(FRAPI_URL + '/common_feedback/updateFeedbackDetails', body, 
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
            return this.http.get(FRAPI_URL + '/common_feedback/getFeedbackReply').map((response: Response) => {
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
            return this.http.post(FRAPI_URL + '/common_feedback/updateFeedbackReply',body,{headers:headers}).map((response: Response) => {
                if (response.json().code == 200) {
                    return response.json().data
                }
            }
            )
        }

}
