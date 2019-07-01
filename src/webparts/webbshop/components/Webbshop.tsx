import * as React from 'react';
import styles from './Webbshop.module.scss';
import { IWebbshopProps, ISPList, ISPList2 } from './IWebbshopProps';
import ItemsComponent from './ItemsComponent';
import CartComponent from './CartComponent';
import { ShoppingList, IShoppingListProps } from './ShoppingList';

export interface IWebbshopState {
  countingNumber: number;
  listTwo: ISPList2[];
  showList: boolean;
}

export default class Webbshop extends React.Component<IWebbshopProps, IWebbshopState> {
  constructor(props: IWebbshopProps) {
    super(props);

    this.state = {
      countingNumber: 0,
      listTwo: [],
      showList: false,
    };
  }

  /** Adding items to cart list */
  private _onClickToBasket(id: number, imgUrl: string, imgDesc: string, pris: number) {
    const total = this.state.countingNumber;
    this.setState({
      countingNumber: total + 1,
      listTwo: [...this.state.listTwo, {
        Id: id, ImageUrl:
          { Url: imgUrl, Description: imgDesc },
        Price: pris
      }]
    });
  }

  /** Removing unwanted items from the cart */  
  private _onClickRemoveFromBasket(index: number) {
    const total = this.state.countingNumber;
    let array = [...this.state.listTwo];
    array.splice(index, 1);

    this.setState({
      countingNumber: total - 1,
      listTwo: array
    });    
  }

  /** Adding the order lists and the whole order number in SharePoint list */
  private _onClickToOrderList() {
    this.props.handleSPDataUpdate(this.props.userId, this.state.listTwo);
    this.setState({
      showList: !this.state.showList
    });
  }

  /** Toggle the cart list */
  private _showCartList() {
    if(this.state.listTwo.length > 0) {
      this.setState({
        showList: !this.state.showList
      });      
    }    
  }

  public render(): React.ReactElement<IWebbshopProps> {
    console.log("listTwo: ", this.state.listTwo);
    console.log("produktList: ", this.props.produktList);
    return (
      <div className={styles.webbshop}>
        <div className={styles.container}>
          <CartComponent countingNumber={this.state.countingNumber} test2={this._showCartList.bind(this)}>
          </CartComponent>
          {
            (this.state.listTwo.length != 0 && this.state.showList) ?
            <ShoppingList shoppingItems={this.state.listTwo} 
            callRemoveFunction={this._onClickRemoveFromBasket.bind(this)}
              hideShowList={this._showCartList.bind(this)} 
              toOrderListFunction={this._onClickToOrderList.bind(this)}></ShoppingList>
            : null
          }           
          <ItemsComponent produktList={this.props.produktList} test={this._onClickToBasket.bind(this)} >
          </ItemsComponent>
        </div>
      </div>
    );
  }
}
