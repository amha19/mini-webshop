import { ISPList, ISecondList, ISPList3, ISPList2, IWebbshopProps } from "./IWebbshopProps";
import { SPHttpClient } from '@microsoft/sp-http';
import { sp, List } from "sp-pnp-js";
import { Guid } from "guid-typescript";


export interface IGetDataService {
    getData(): Promise<ISPList[]>;
    //for mock data
    handleMyList2(id: number): Promise<ISecondList[]>;
    getOrderList(): Promise<ISecondList[]>;
    //for SP data
    handleOrderList(userId: number, product: ISPList2[]);
    getOrderListSP(): Promise<ISecondList[]>;
    handleOrderAndProduct(orderId: number, products: ISPList2[]);
    getOrderAndProductList(): Promise<ISPList3[]>

    // handleOrderList(id: number, userId: any): Promise<ISecondList[]>;
}

export class MockDataService implements IGetDataService {
    getOrderId() {
        throw new Error("Method not implemented.");
    }
    getOrderAndProductList(): Promise<ISPList3[]> {
        throw new Error("Method not implemented.");
    }
    handleOrderAndProduct() {
        throw new Error("Method not implemented.");
    }
    constructor() {
        this.handleMyList2 = this.handleMyList2.bind(this);
    }

    private myList: ISPList[] = [
        {
            Id: 1, Title: 'Strumpor', ECWS_x002e_Price: 10, ECWS_x002e_Category: 'sport',
            ECWS_x002e_ImageUrl: { Url: 'https://cdn.pji.nu/product/standard/800/4361803.jpg', Description: 'dfoefoeeo' }
        },
        {
            Id: 2, Title: 'Strumpor2', ECWS_x002e_Price: 20, ECWS_x002e_Category: 'Tillbehör',
            ECWS_x002e_ImageUrl: { Url: 'https://cdn.pji.nu/product/standard/800/4361803.jpg', Description: 'dfoefoeeo' }
        },
        {
            Id: 3, Title: 'Strumpor3', ECWS_x002e_Price: 15, ECWS_x002e_Category: 'sport',
            ECWS_x002e_ImageUrl: { Url: 'https://cdn.pji.nu/product/standard/800/4361803.jpg', Description: 'dfoefoeeo' }
        }
    ]

    private myList2: ISecondList[] = [];

    getOrderListSP(): Promise<ISecondList[]> {
        throw new Error("Method not implemented.");
    }

    handleOrderList(): Promise<ISecondList[]> {
        throw new Error("Method not implemented.");
    }

    handleMyList2(id: number): Promise<ISecondList[]> {
        console.log("Data source with id from myList2: ", id);
        let selectedItem;
        this.myList.map((element) => {
            if (element.Id === id) {
                selectedItem = element.Id
                id = id - 1;
                this.myList2.push({ Id: this.myList[id].Id, Title: this.myList[id].Title, ECWS_x002e_User: 'user01', ECWS_x002e_Date: new Date() });
            }
        })
        console.log("aaa: ", selectedItem);

        return new Promise<ISecondList[]>((resolve) => {
            resolve(this.myList2);
        })
    }

    getOrderList(): Promise<ISecondList[]> {
        return new Promise<ISecondList[]>((resolve) => {
            resolve(this.myList2)
        });
    }

    getData(): (Promise<ISPList[]>) {
        return new Promise<ISPList[]>((resolve) => {
            resolve(this.myList);
        });
    }
}

export class PnPDataService implements IGetDataService {
    constructor() {
        this.handleOrderList = this.handleOrderList.bind(this);
        // this.handleOrderAndProduct = this.handleOrderAndProduct.bind(this);


    }

    getOrderListSP(): Promise<ISecondList[]> {
        return sp.web.lists.getByTitle('Ordrar').items.get().then((result: ISecondList[]) => {
            console.log("From getOrderListSP: ", result);
            return result;
        });
    }

    getOrderAndProductList(): Promise<ISPList3[]> {
        return sp.web.lists.getByTitle('Orderrader').items.get().then((result: ISPList3[]) => {
            console.log("order and product list: ", result);
            return result;
        });
    }



    handleOrderList(userId: number, products: ISPList2[]) {

        let guidNo = Guid.create().toString();

        sp.web.lists.getByTitle('Ordrar').items.add({
            Title: 'Order_' + guidNo,
            ECWS_x002e_UserId: userId,
            ECWS_x002e_Date: new Date()
        }).then((orderId) => {
            console.log("This is Id for Ordrar list: ", orderId.data.Id);

            // Orderrader
            this.handleOrderAndProduct(orderId.data.Id, products);
        });
    }

    handleOrderAndProduct(orderId: number, products: ISPList2[]) {

        for (let i = 0; i < products.length; i++) {

            let guidNo = Guid.create().toString();

            sp.web.lists.getByTitle('Orderrader').items.add({
                Title: guidNo,
                ECWS_x002e_OrderId: orderId,
                ECWS_x002e_ProductId: products[i].Id
            }).then((oId) => {
                console.log("This is Id for Ordrar and product list: ", oId.data.Id);
                console.log("list: ", oId);

            });

        }
    }

    getData(): Promise<ISPList[]> {
        return sp.web.lists.getByTitle('Produkter').items.get().then((result: ISPList[]) => {
            // console.log("From getData: ", result);
            return result;
        });
    }

    getOrderList(): Promise<ISecondList[]> {
        throw new Error("Method not implemented.");
    }

    handleMyList2(id: number): Promise<ISecondList[]> {
        throw new Error("Method not implemented.");
    }
}


