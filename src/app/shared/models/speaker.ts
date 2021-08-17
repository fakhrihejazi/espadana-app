export interface Data {
  name: string;
  value: string;
}

export interface Link {
  rel: string;
  href: string;
}

export interface Speaker {
  href: string;
  data: Data[];
  links: Link[];
}
