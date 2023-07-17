export interface HeaderDocumentI {
  _id: string;
  id: string;
  sections: SectionI[]; // TODO type for sections
  title: string;
  description: string;
}

export interface SectionI {
  title: string;
  content: string;
  image: string;
}
