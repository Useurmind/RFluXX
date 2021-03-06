import { IActionFactory, IContainer, IContainerBuilderEssential, IInjectedStoreOptions, IStore } from "..";
import { PrefixActionFactory } from "../ActionFactory/PrefixActionFactory";
import { IObservableFetcher } from "../Fetch/IObservableFetcher";

import { IContainerRegistration } from "./IContainerRegistration";

/**
 * Inject the action factory and fetcher into the store props.
 * @param container The container to use.
 * @param props The props the store should get and that should be extended with action factory and fetcher.
 * @param storePrefix A prefix used to mark actions for easier identifiability.
 */
export function injectStoreOptions<TProps extends IInjectedStoreOptions>(container: IContainer, props: TProps, storePrefix?: string) : TProps
{
    const actionFactory = container.resolveOptional<IActionFactory>("IActionFactory");
    const prefixedActionFactory = actionFactory 
        ? (storePrefix ? new PrefixActionFactory(actionFactory, storePrefix) : actionFactory)
        : null;

    return {
        ...props,
        actionFactory: prefixedActionFactory,
        fetcher: container.resolveOptional<IObservableFetcher>("IObservableFetcher")
    };
}

/**
 * Register a store in the given container adding all the required interfaces that the store should
 * have to work with the event log and time travel.
 * @param container The container to add the store to.
 * @param typeName The name of the type of the store.
 * @param create A function that creates the store.
 * @param key A string key unique for this store in this container (for using a store type multiple times, optional).
 */
export function registerStore<TState>(
    containerBuilder: IContainerBuilderEssential,
    typeName: string,
    create: (c: IContainer, injectStoreOptions: (o: any) => any) => IStore<TState>,
    key?: string): IContainerRegistration
{
    const storeKey = getStoreRegistrationKey(typeName, key);

    const injectedCreate = (c: IContainer) =>
    {
        const injectStoreOptions2 = (o: IInjectedStoreOptions) => injectStoreOptions(c, o, storeKey);

        return create(c, injectStoreOptions2);
    };

    return containerBuilder.register(injectedCreate)
                           .as(storeKey)
                           .in("IResetMyState[]")
                           .in("IStore[]");
}

/**
 * Resolve a store from the given container.
 * @param container The container to resolve the store from.
 * @param typeName The type name (or interface name) or the store that should be resolved.
 * @param key A unique key for this store in this container (for multi instancing stores, optional).
 * @returns The store instance or throws an error if not registered.
 */
export function resolveStore<TState>(
    container: IContainer,
    typeName: string,
    key?: string)
    : IStore<TState>
{
    const storeKey = getStoreRegistrationKey(typeName, key);

    return container.resolve<IStore<TState>>(storeKey);
}

/**
 * Resolve a store from the given container (do not throw if not registered).
 * @param container The container to resolve the store from.
 * @param typeName The type name (or interface name) or the store that should be resolved.
 * @param key A unique key for this store in this container (for multi instancing stores, optional).
 * @returns The store instance or null if not registered.
 */
export function resolveStoreOptional<TState>(
    container: IContainer,
    typeName: string,
    key?: string)
    : IStore<TState>
{
    const storeKey = getStoreRegistrationKey(typeName, key);

    return container.resolveOptional<IStore<TState>>(storeKey);
}

function getStoreRegistrationKey(typeName: string, key?: string): string
{
    if (!key)
    {
        return typeName;
    }

    return `${typeName}.${key}`;
}
