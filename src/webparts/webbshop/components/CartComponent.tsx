import * as React from 'react';
import styles from './Webbshop.module.scss';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TeachingBubbleWideIllustrationExample } from './CartItemsComp';

export interface ICartComponentProps {
    countingNumber: number;
    test2;
     
}

const divStyle = {
        background: '#021e7a',
        paddingTop: 0,
        paddingBottom: 0

}

const ulStyle = {
        textAlign: '-webkit-right',
        marginBottom: 10,
        marginRight: -165,
        cursor: 'pointer',
        hover:{color: 'yellow'}       
}

export default class CartComponent extends React.Component<ICartComponentProps, {}> {

    
    public render(): React.ReactElement<ICartComponentProps> {        
        return (
            <div style={divStyle} className={styles.row}>
                <div className={styles.column}>
                
                    <ul onClick={this.props.test2} style={ulStyle}>                        
                        <li ><Icon iconName="ShoppingCart" className="ms-ShoppingCart" />{' '}{this.props.countingNumber}</li>
                        <li >{'Varukorg'}</li>
                    </ul>
                    

                </div>
            </div>
        );
    }
}



