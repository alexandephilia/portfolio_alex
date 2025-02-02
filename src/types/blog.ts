export interface BlogPost {
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  preview: string;
  tags: string[];
  content: {
    introduction: string;
    sections: Array<{
      heading?: string;
      paragraphs: string[];
      quote?: string;
    }>;
  };
} 