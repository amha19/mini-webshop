import * as React from 'react';
import styles from './Webbshop.module.scss';
import { ISPList } from './IWebbshopProps';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface IItemsComponentProps {
    produktList: ISPList[];    
    test;
}

export default class ItemsComponent extends React.Component<IItemsComponentProps, {}> {
    public render(): React.ReactElement<IItemsComponentProps> {
        let items = this.props.produktList.map((result) => {
            return <li className={styles.itemLiStyle} key={result.Id}>
                <img width={"200px"} height={"200px"} src={result.ECWS_x002e_ImageUrl.Url} />{<br></br>}
                {result.ECWS_x002e_ImageUrl.Description}{<br></br>}
                <span className={styles.price}><strong>{result.ECWS_x002e_Price}{' Kr'}</strong></span>{<br></br>}                
                {<DefaultButton style={{background: '#e7e7e7', marginTop: 3}} onClick={this.props.test.bind(this, result.Id, result.ECWS_x002e_ImageUrl.Url,
                result.ECWS_x002e_ImageUrl.Description, result.ECWS_x002e_Price)}>Add to cart</DefaultButton>}
            </li>;
        });
        // console.log("This is from component: ", items);
        return (
            <div style={{background: 'white'}} className={styles.row}>
                <div style={{marginLeft: -42}}>
                    <ul style={{color: 'black'}}>
                        {items}
                    </ul>
                </div>
            </div>
        );
    }
}
