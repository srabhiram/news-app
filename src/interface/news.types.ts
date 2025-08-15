export interface News {
    id?:string,
    news_title: string,
    content?: string,
    content_1:string,
    content_2?:string,
    author:string,
    image:string,
    category:string,
    district:string,
    views:number,
    created_at:Date,
    updated_at:Date
}