export type Company = {
  _id: string;
  company_name: string;
  location: string;
  website: string;
  company_size: string;
  company_founded: string;
  industry: string;
  company_type: string;
  logo_image_url: string;
  review_count: number;
  interview_count: number;
  difficult_rating: number;
  acceptance_rate: number;
  offer_count: number;
  common_job_posts: string[];
}

type ReviewDesc = {
  desc: string;
  questions: string[];
  _id: string;
}

export type Interview = {
  _id: string;
  user_id: string;
  company_id: string;
  title: string;
  job_title: string;
  job_field: string;
  interview_date: Date;
  review: ReviewDesc;
  positive_flag: boolean;
  job_offer_flag: boolean;
  difficulty_rating: number;
  created_date: Date;
  modified_date: Date;
}

export type Job ={
  _id: string;
  company_id: string;
  job_title: string;
  term: string;
  location: string;
  job_link: string;
  multiple_jobs_available: boolean;
  category: string;
  open_status: boolean;
}

type CritiqueDesc = {
  desc: string;
  pros: string[];
  cons: string[];
  _id: string;
}

export type Critique = {
  _id: string;
  user_id: string;
  job_title: string;
  job_field: string;
  months_length: number;
  review: CritiqueDesc;
  likes: number,
  dislikes: number,
  rating: number,
  created_date: Date,
  modified_date: Date;
}


