export interface newsData {
  newsTitle: string;
  content: {
    box1:string,
    box2:string
  };
  image: File | null;
  district: string;
  category: string;
  author: string;
  selectionType: string;
}

export interface NewsArticle {
  _id: string;
  newsTitle: string;
  content: {
    box1:string,
    box2:string
  };
  image: string;
  district: string;
  category:string;
  author: string;
  comments: string[];
  likes: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}