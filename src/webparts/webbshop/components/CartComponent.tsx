import * as React from 'react';
import styles from './Webbshop.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export interface ICartComponentProps {
    countingNumber: number;
    test2: (event: React.MouseEvent<HTMLDivElement>) => void;     
}

const divStyle = {
        background: '#021e7a',
        paddingTop: 0,
        paddingBottom: 0,        
};

export default class CartComponent extends React.Component<ICartComponentProps, {}> {
    public render(): React.ReactElement<ICartComponentProps> {        
        return (
            <div style={divStyle} className={styles.row}>
                <div style={{width: '95%', float: 'left'}}>
                    <h2>Contoso</h2>
                </div>
                <div style={{width: '5%', float: 'left', paddingTop: 12, cursor: 'pointer'}} onClick={this.props.test2}>
                    <div><Icon iconName="ShoppingCart" className="ms-ShoppingCart" />{' '}{this.props.countingNumber}</div>
                    <div>Cart</div>
                </div>
                <br style={{ clear: 'left' }} />
            </div>
        );
    }
}


