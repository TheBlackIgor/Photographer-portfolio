export interface HeaderDocumentI {
  _id: string;
  id: string;
  sections: SectionI[];
  title: string;
  description: string;
}

export interface SectionI {
  title: string;
  content: string;
  image: string;
}
