export interface IData {
  status: string;
  data: ICandy[];
}

export interface ICandy {
  id: number;
  name: string;
  description: string;
  price: number;
  on_sale: boolean;
  images: {
    thumbnail: string;
    large: string;
  };
  stock_status: string;
  stock_quantity: null;
}

export interface IOrderItem {
  product_id: number;
  qty: number;
  item_price: number;
  item_total: number;
}

export interface IOrder {
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_postcode: string;
  customer_city: string;
  customer_email: string;
  order_total: number;
  order_items: IOrderItem[];
}