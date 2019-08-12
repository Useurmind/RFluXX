import { createStyles, Grid, Theme, WithStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { subscribeStoreSelect } from "rfluxx";
import { IPageMasterProps } from "rfluxx-routing";

export const styles = (theme: Theme) => createStyles({
    root: {
    },
    pageContainer: {

    }
});

/**
 * State for { @Master }
 */
export interface IMasterState
{

}

/**
 * Props for { @Master }
 */
export interface IMasterProps
    extends WithStyles<typeof styles>, IPageMasterProps
{
}

/**
 * Component that renders the frame of each page
 * .
 */
export const Master = withStyles(styles)(
    class extends React.Component<IMasterProps, IMasterState>
    {
        /**
         * Renders the component.
         */
        public render(): React.ReactNode
        {
            const { classes, ...rest } = this.props;

            return <div className={classes.root}>
                <div>This is master content</div>
                <div className={classes.pageContainer}>
                    { this.props.pageComponent }
                </div>
            </div>;
        }
    }
);
