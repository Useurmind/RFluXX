import { IContainer, IContainerBuilder } from "rfluxx";
import { RouteParameters } from "rfluxx-routing";
import { IGlobalComponents, IPageContainerFactory, SimplePageContainerFactoryBase } from "rfluxx-routing";

import { CounterStore } from "./CounterStore";

export class ContainerFactory extends SimplePageContainerFactoryBase
{
    protected registerStores(builder: IContainerBuilder, url: URL, routeParameters: RouteParameters): void
    {
        builder.register(c => new CounterStore({
            pageStore: c.resolve("IPageStore"),
            pageRequest: c.resolve("IPageRequest")
        })).as("ICounterStore");
    }
}
