import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import * as strings from 'WebbshopWebPartStrings';
import Webbshop from './components/Webbshop';
import { IWebbshopProps, ISPList } from './components/IWebbshopProps';
import { IGetDataService, MockDataService, PnPDataService } from './components/GetDataService';
import { sp } from 'sp-pnp-js';

export interface IWebbshopWebPartProps {
  description: string;
}

export default class WebbshopWebPart extends BaseClientSideWebPart<IWebbshopWebPartProps> {
  public render(): void {

    let service: IGetDataService;

    if (Environment.type === EnvironmentType.Local) {
      service = new MockDataService();
    } else {
      service = new PnPDataService();
    }

    service.getData().then((result) => {
      sp.web.currentUser.get().then((res) => {
        console.log("UserId: ", res.Title);
        
        const element: React.ReactElement<IWebbshopProps> = React.createElement(
          Webbshop,
          {
            description: this.properties.description,
            produktList: result,          
            handleSPDataUpdate: service.handleOrderList,
            orderListSP: service.getOrderListSP(),
            userId: res.Id,
            orderAndProductHandler: service.handleOrderAndProduct,
            orderAndProductList: service.getOrderAndProductList,
            
            // orderList: service.getOrderList,
            // handleDataUpdate: service.handleMyList2,
          }
        );
        ReactDom.render(element, this.domElement);
      });

    })
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
