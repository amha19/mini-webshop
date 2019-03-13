import * as React from 'react';
import styles from './Webbshop.module.scss';


export interface INewItemProps {
    message: string;
    message2: string;
}

export default class NewItem extends React.Component<INewItemProps, {}> {


    public render(): React.ReactElement<INewItemProps> {

        return (
            <div className={this.props.message}>
                <section className={this.props.message2}>
                    <button >close</button>
                </section>
            </div>
        );
    }
}

