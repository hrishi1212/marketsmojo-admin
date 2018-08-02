export class News{
    newsid:number;
    title:string;
    imagepath:string;
    link:string;
    source:string;
    publisheddate:Date;
    description:string;
    newstype:string;
    isdeleted:number;
    mapstock: any[];
    topnews:string;
    delete : string = '<i class="fa fa-trash" aria-hidden="true"></i>';
}