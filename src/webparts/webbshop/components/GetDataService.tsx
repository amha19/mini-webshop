import { ISPList, ISPList2, ISecondList } from "./IWebbshopProps";
import { sp } from "sp-pnp-js";
import { Guid } from "guid-typescript";


export interface IGetDataService {
    getData(): Promise<ISPList[]>;
    //for mock data
    handleMyList2(id: number): Promise<ISecondList[]>;
    getOrderList(): Promise<ISecondList[]>;
    //for SP data
    handleOrderList(userId: number, product: ISPList2[]);
    handleOrderAndProduct(orderId: number, products: ISPList2[]);
}

export class MockDataService implements IGetDataService {

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
    ];

    private myList2: ISecondList[] = [];

    handleMyList2(id: number): Promise<ISecondList[]> {
        console.log("Data source with id from myList2: ", id);
        let selectedItem;
        this.myList.map((element) => {
            if (element.Id === id) {
                selectedItem = element.Id;
                id = id - 1;
                this.myList2.push({ Id: this.myList[id].Id, Title: this.myList[id].Title, ECWS_x002e_User: 'user01', ECWS_x002e_Date: new Date() });
            }
        });

        return new Promise<ISecondList[]>((resolve) => {
            resolve(this.myList2);
        });
    }

    getOrderList(): Promise<ISecondList[]> {
        return new Promise<ISecondList[]>((resolve) => {
            resolve(this.myList2);
        });
    }

    getData(): (Promise<ISPList[]>) {
        return new Promise<ISPList[]>((resolve) => {
            resolve(this.myList);
        });
    }

    handleOrderAndProduct() {
        throw new Error("Method not implemented.");
    }

    handleOrderList(): Promise<ISecondList[]> {
        throw new Error("Method not implemented.");
    }
}

export class PnPDataService implements IGetDataService {
    constructor() {
        this.handleOrderList = this.handleOrderList.bind(this);
        // this.handleOrderAndProduct = this.handleOrderAndProduct.bind(this);
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

    async getData(): Promise<ISPList[]> {
        const result = await sp.web.lists.getByTitle('Produkter').items.get();
        return result;
    }

    getOrderList(): Promise<ISecondList[]> {
        throw new Error("Method not implemented.");
    }

    handleMyList2(id: number): Promise<ISecondList[]> {
        throw new Error("Method not implemented.");
    }
}


