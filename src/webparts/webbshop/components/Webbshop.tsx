import * as React from 'react';
import styles from './Webbshop.module.scss';
import { IWebbshopProps, ISPList, ISecondList, ISPList2, ISPList3 } from './IWebbshopProps';
import ItemsComponent from './ItemsComponent';
import CartComponent from './CartComponent';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import NewComp from './NewComp';
import ShopingList from './ShopingList';
// import './style.css';

export interface IWebbshopState {
  countingNumber: number;
  orderList: Promise<ISecondList[]>;
  orderAndProductList: Promise<ISPList3[]>;
  listTwo: ISPList2[];
  showList: boolean;
  displayMenu: boolean;
  show: boolean;
  // message: string;
  // message2: string;
  // secondItems: Promise<ISecondList[]>;
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
      show: false
      // message: styles.modal,
      // message2: styles["modal-main"],
      // secondItems: this.props.orderList()
    }

    this.onClickToOrderList = this.onClickToOrderList.bind(this);
    this.onClickToBasket = this.onClickToBasket.bind(this);
    this.showCartList = this.showCartList.bind(this);
    this.onClickRemoveFromBasket = this.onClickRemoveFromBasket.bind(this);


  }

  onClickToBasket(id, imgUrl, imgDesc, pris) {
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

  onClickRemoveFromBasket(index) {
    const total = this.state.countingNumber;
    let array = [...this.state.listTwo];
    array.splice(index, 1)

    this.setState({
      countingNumber: total - 1,
      listTwo: array
    })

    console.log("array: ", this.state.listTwo);

  }

  onClickToOrderList() {
    let returnVal = this.props.handleSPDataUpdate(this.props.userId, this.state.listTwo);
    // let returnVal2 = this.props.orderAndProductHandler(0, this.state.listTwo);
    this.setState({
      orderList: returnVal,
      //  orderAndProductList: returnVal2
    });
  }

  showCartList(event) {
    event.preventDefault();
    this.setState({
      showList: !this.state.showList
    });
  }


  public render(): React.ReactElement<IWebbshopProps> {

    // let shopingList;
    // this.state.show ?
    // shopingList = 
      
    
    

    return (
      <div className={styles.webbshop}>
        <div className={styles.container}>
          <CartComponent countingNumber={this.state.countingNumber} test2={this.showCartList}>
          </CartComponent>
          <div style={{ position: 'relative', display: 'inline-block', float: 'right' }}>
            {/* {
              this.state.showList ?              
                <div>
                  <ul style={{ listStyle: 'none' }}>
                    {this.state.listTwo.map((o, index) => {
                      return <li>
                        <img width={"75px"} height={"75px"} src={o.ECWS_x002e_ImageUrl.Url} />
                        {' '}{o.ECWS_x002e_ImageUrl.Description}{' '}
                        <strong>{o.ECWS_x002e_Price}{' Kr'}</strong>{' '}
                        <Icon onClick={this.onClickRemoveFromBasket.bind(this, index)} iconName="ChromeClose" id="icon" className="ms-ChromeClose" />
                      </li>
                    })}
                    <br></br>
                  </ul> <button style={{ float: 'right' }} onClick={this.onClickToOrderList}>Gå till checkout</button>
                </div> 
                : (null)
            } */}
            <ShopingList></ShopingList>
          </div>
          <ItemsComponent produktList={this.props.produktList} test={this.onClickToBasket} >
          </ItemsComponent>

          {/* <NewComp message={this.state.message} message2={this.state.message2}></NewComp> */}
        </div>
      </div>
    );
  }
}
