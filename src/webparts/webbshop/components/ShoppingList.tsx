import * as React from 'react';
import { List } from 'office-ui-fabric-react/lib/List';
import { ISPList2 } from './IWebbshopProps';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';


export type CallRemoveFunction = (index: number) => void;
export type CallHideFunction = () => void;
export type CallToOrderFunction = () => void;

export interface IShoppingListProps {
  shoppingItems: ISPList2[];
  callRemoveFunction: CallRemoveFunction;
  hideShowList: CallHideFunction;
  toOrderListFunction: CallToOrderFunction;
}

export class ShoppingList extends React.Component <IShoppingListProps, {}> {
  public render(): React.ReactElement <IShoppingListProps> {
    return (
      <div style={{zIndex: 10, position: 'absolute', marginLeft: -329, background: 'skyblue'}}>
        <ul>
          {this.props.shoppingItems.map((shopItem: any, index: number) => (
            <li key={index}>
            {/* <TeachingBubble illustrationImage={shopItem.ECWS_x002e_ImageUrl.Url}></TeachingBubble> */}
              <img width={"75px"} height={"75px"} src={shopItem.ECWS_x002e_ImageUrl.Url} />
              {shopItem.ECWS_x002e_ImageUrl.Description}
              <strong>{shopItem.ECWS_x002e_Price}{' Kr'}</strong>{' '}
              <Icon onClick={this._callRemoveFunction.bind(this, index)} iconName="ChromeClose" id="icon" className="ms-ChromeClose" />
            </li>
          ))
          }
        </ul>
        <DefaultButton onClick={this._callHideFunction}>Close</DefaultButton>
        <PrimaryButton onClick={this._callToOrderFunction}>To checkout</PrimaryButton>
      </div>
    );
  }

  private _callRemoveFunction = (index: number): void => {
    this.props.callRemoveFunction(index);
  }

  private _callHideFunction = (): void => {
    this.props.hideShowList();
  }

  private _callToOrderFunction = (): void => {
    this.props.toOrderListFunction();
  }
}