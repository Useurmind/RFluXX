import * as React from "react";
import { IContainer } from "rfluxx";

import { Breadcrumb } from "../../src";
import { CurrentPage } from "../../src";
import { CurrentSiteMapNode } from "../../src";
import { OpenPageList } from "../../src";
import { withPageContext } from "../../src";
import { IPageManagementStore } from "../../src";
import { RouterLink } from "../../src";
import { ISiteMapNode, ISiteMapStore } from "../../src";

export interface IAppProps
{
    siteMapStore: ISiteMapStore;
    pageManagementStore: IPageManagementStore;
}

export interface IAppState
{
}

export class App extends React.Component<IAppProps, IAppState> {

    constructor(props: any)
    {
        super(props);

        this.state = {
        };
    }

    public render(): any
    {
        return <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h1>Rfluxx Evicted Pages Example</h1>
                    <Breadcrumb siteMapStore={this.props.siteMapStore} />
                </div>
            </div>

            <div className="row">
                <div className="col-auto">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <RouterLink caption="home" path="/home" className="nav-link" />
                        </li>
                        <li className="nav-item">
                            <RouterLink caption="form with select" path="/form/with/select" className="nav-link" />
                        </li>
                        <li className="nav-item">
                            <RouterLink caption="endless sequence" path="/endlessSequence/1" className="nav-link" />
                        </li>
                    </ul>
                </div>

                <div className="col">

                    <CurrentPage pageManagementStore={this.props.pageManagementStore}
                                renderNoPage={() => <div className="container-fluid">
                                404: No page found on this url!</div>} />
                </div>

                <div className="col">
                    <OpenPageList pageManagementStore={this.props.pageManagementStore}/>
                </div>
            </div>
        </div>;
    }
}
