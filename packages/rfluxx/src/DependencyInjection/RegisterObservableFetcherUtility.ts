import { ObservableFetcher } from "../Fetch/ObservableFetcher";

import { IContainerBuilderEssential } from "./IContainerBuilder";

/**
 * Register the observable fetcher into the given container builder.
 * - Registers { @see ObservableFetcher } as 'IObservableFetcher'
 * @param builder The container builder to register the fetcher into.
 */
export function registerObservableFetcher(builder: IContainerBuilderEssential)
{
    builder.register(c => new ObservableFetcher())
                    .as("IObservableFetcher");
}
