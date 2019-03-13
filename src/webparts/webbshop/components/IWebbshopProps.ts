export interface IWebbshopProps {
  description: string;
  produktList: ISPList[];
  userId: number; 
  
  handleSPDataUpdate(userId: number, products: ISPList2[]);
  orderAndProductHandler(orderId: number, products: ISPList2[]);
  orderListSP(): Promise<ISecondList[]>;
  orderAndProductList(): Promise<ISPList3[]>;
  // handleSPDataUpdate(id: number, userId: any): Promise<ISecondList[]>;
  // orderList(): Promise<ISecondList[]>;
  // handleDataUpdate(id: number): Promise<ISecondList[]>;
}

export interface ISPList {
  Id: number;
  Title: string;
  ECWS_x002e_Price: number;
  ECWS_x002e_Category: string;
  ECWS_x002e_ImageUrl: {
    Description: string,
    Url: string
  };
}

export interface ISPList2 { 
  Id: number;  
  ECWS_x002e_Price: number;
  ECWS_x002e_ImageUrl: {
    Description: string,
    Url: string
  };
}

export interface ISecondList {
  Id: number;
  Title: string;
  ECWS_x002e_User: string;
  ECWS_x002e_Date: Date;
}

export interface ISPList3 {
  Title: string;
  ECWS_x002e_Order: string;
  ECWS_x002e_Product: string;
}