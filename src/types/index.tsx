export interface IPhoto {
  id: number | string;
  src: {
    medium: string;
    large: string;
  };
  title: string;
  dateTaken: string;
  alt: string | null;
  photographer: string;
  width: number;
  height: number;
  top: number;
  left: number;
  renderedHeight: number;
}

export interface ISearchContext {
  query: string;
  setQuery: (query: string) => void;
}