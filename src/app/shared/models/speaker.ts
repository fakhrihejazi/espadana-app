export interface IData {
  name: string;
  value: string;
}

export interface ILink {
  rel: string;
  href: string;
}

export interface ISpeaker {
  href: string;
  data: IData[];
  links: ILink[];
}

export interface ISpeakerShow extends ISpeaker {
  ishow: boolean | false;
  isChecked: boolean | false;
}

