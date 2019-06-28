import * as React from 'react';
import styles from './Webbshop.module.scss';
import { IWebbshopProps, ISPList, ISecondList, ISPList2, ISPList3 } from './IWebbshopProps';
import ItemsComponent from './ItemsComponent';
import CartComponent from './CartComponent';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ShoppingList, IShoppingListProps } from './ShoppingList';

export interface IWebbshopState {
  countingNumber: number;
  orderList: Promise<ISecondList[]>;
  orderAndProductList: Promise<ISPList3[]>;
  listTwo: ISPList2[];
  showList: boolean;
  displayMenu: boolean;
}

export default class Webbshop extends React.Component<IWebbshopProps, IWebbshopState> {
  constructor(props: IWebbshopProps) {
    super(props);

    this.state = {
      countingNumber: 0,
      orderList: this.props.orderListSP,
      orderAndProductList: this.props.orderAndProductList(),
      listTwo: [],
      showList: false,
      displayMenu: false,
    }

    this._onClickToOrderList = this._onClickToOrderList.bind(this);
    this._onClickToBasket = this._onClickToBasket.bind(this);
  }  

  private _onClickToBasket(id, imgUrl, imgDesc, pris) {
    const total = this.state.countingNumber;
    this.setState({
      countingNumber: total + 1,
      listTwo: [...this.state.listTwo, {
        Id: id, ECWS_x002e_ImageUrl:
          { Url: imgUrl, Description: imgDesc },
        ECWS_x002e_Price: pris
      }]
    })
  }

  private _onClickRemoveFromBasket(index: number) {
    const total = this.state.countingNumber;
    let array = [...this.state.listTwo];
    array.splice(index, 1)

    this.setState({
      countingNumber: total - 1,
      listTwo: array
    });    
  }

  private _onClickToOrderList() {
    let returnVal = this.props.handleSPDataUpdate(this.props.userId, this.state.listTwo);
    this.setState({
      orderList: returnVal,
    });
  }

  private _showCartList() {
    if(this.state.listTwo.length > 0) {
      this.setState({
        showList: !this.state.showList
      });
    }    
  }

  public render(): React.ReactElement<IWebbshopProps> {
    return (
      <div className={styles.webbshop}>
        <div className={styles.container}>
          <CartComponent countingNumber={this.state.countingNumber} test2={this._showCartList.bind(this)}>
          </CartComponent>
          {
            (this.state.listTwo.length != 0 && this.state.showList) ? <ShoppingList shoppingItems={this.state.listTwo} 
            callRemoveFunction={this._onClickRemoveFromBasket.bind(this)}
              hideShowList={this._showCartList.bind(this)} 
              toOrderListFunction={this._onClickToOrderList.bind(this)}></ShoppingList> : null
          }           
          <ItemsComponent produktList={this.props.produktList} test={this._onClickToBasket} >
          </ItemsComponent>
        </div>
      </div>
    );
  }
}
