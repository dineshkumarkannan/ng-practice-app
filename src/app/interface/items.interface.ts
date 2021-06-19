export interface Item {
    name: string;
    count: number;
  }

  export interface Items {
    items: Item[];
    basket?: String[];
  }