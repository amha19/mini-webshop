import * as React from 'react';
import styles from './Webbshop.module.scss';
import { ISPList } from './IWebbshopProps';
import { ICartComponentProps } from './CartComponent'
import { IWebbshopProps } from './IWebbshopProps';
import { escape } from '@microsoft/sp-lodash-subset';
import CartComponent from './CartComponent';

export interface IItemsComponentProps {
    produktList: ISPList[];    
    test;
}

const divStyle = {
    background: '#f7f8f9',    
}

const ulStyle = {
    color: 'black',
    marginLeft: -103,
    marginRight: -180    
}

const liStyle = {
    display: 'inline',
    float: 'left',
    padding: 12
}

export default class ItemsComponent extends React.Component<IItemsComponentProps, {}> {
    constructor() {
        super();
    }

    public render(): React.ReactElement<IItemsComponentProps> {

        // let items = [];
        // for (let i = 0; i < this.props.produktList.length; i++) {
        //   items.push(
        //     <li key={this.props.produktList[i].Id}>
        //       <img src={this.props.produktList[i].ECWS_x002e_ImageUrl.Url} />{<br></br>}
        //       {this.props.produktList[i].ECWS_x002e_ImageUrl.Description}{<br></br>}
        //       {this.props.produktList[i].Title}{<br></br>}
        //       {this.props.produktList[i].ECWS_x002e_Price}{<br></br>}
        //       {this.props.produktList[i].ECWS_x002e_Category}
        //     </li>);
        // }
        // console.log("This is from component: ", items);

        let items = this.props.produktList.map((result) => {
            return <li style={liStyle} key={result.Id}>
                <img width={"200px"} height={"200px"} src={result.ECWS_x002e_ImageUrl.Url} />{<br></br>}
                {result.ECWS_x002e_ImageUrl.Description}{<br></br>}
                <strong>{result.ECWS_x002e_Price}{' Kr'}</strong>{<br></br>}                
                {<button onClick={this.props.test.bind(this, result.Id, result.ECWS_x002e_ImageUrl.Url,
                result.ECWS_x002e_ImageUrl.Description, result.ECWS_x002e_Price)}>Till varukorgen</button>}
            </li>
        });
        console.log("This is from component: ", items);

        return (
            <div style={divStyle} className={styles.row}>
                <div className={styles.column}>
                    <ul style={ulStyle}>
                        {items}
                    </ul>
                </div>
            </div>
        );
    }
}
