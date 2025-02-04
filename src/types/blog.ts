export interface BlogPost {
  title: string;
  preview: string;
  content: {
    introduction: string;
    sections: {
      heading?: string;
      content: Array<{
        type: "paragraph" | "image";
        text?: string;
        src?: string;
        alt?: string;
        caption?: string;
      }>;
      quote?: string;
      quoteAuthor?: string;
    }[];
  };
  date: string;
  readTime: string;
  category: string;
  author: string;
  tags: string[];
} 