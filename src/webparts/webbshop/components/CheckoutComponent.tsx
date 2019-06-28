import * as React from 'react';
import styles from './Webbshop.module.scss';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { ISPList } from './IWebbshopProps';

export interface ICheckoutComponentProps {
    produktList: ISPList[];
}

export default class CheckoutComponent extends React.Component<ICheckoutComponentProps, {}> {

    public render(): React.ReactElement<ICheckoutComponentProps> {

        let items = this.props.produktList.map((result) => {
            return <li key={result.Id}>
                <img src={result.ECWS_x002e_ImageUrl.Url} />{<br></br>}
                {result.ECWS_x002e_ImageUrl.Description}{<br></br>}
                {result.Title}{<br></br>}
                {result.ECWS_x002e_Price}{<br></br>}
                {result.ECWS_x002e_Category}
            </li>
        });

        return (
            <div className={styles.webbshop}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div >
                            <ul>
                                {items}
                            </ul>
                            <Button>Betala</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



