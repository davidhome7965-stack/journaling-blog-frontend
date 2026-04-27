export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
  tags: string[];
  excerpt?: string;
}

export interface CreatePostInput {
  title: string;
  slug: string;
  content: string;
  author: string;
  tags: string[];
}

export interface UpdatePostInput {
  title?: string;
  slug?: string;
  content?: string;
  author?: string;
  tags?: string[];
}

export interface TechniqueData {
  id: number;
  name: string;
  description: string;
  details: string;
  tags: string[];
  prompts: string[];
  image?: string;
}