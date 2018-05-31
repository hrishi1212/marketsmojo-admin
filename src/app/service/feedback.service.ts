import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { FRAPI_URL } from './url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Feedback } from "../domain/feedback";
import { Employee } from "../domain/employee";


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
   
    
    


}
