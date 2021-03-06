import { Button, Grid, Snackbar, Typography } from "@material-ui/core";
import { createStyles, WithStyles, withStyles } from "@material-ui/styles";
import * as React from "react";
import { IPullingStore, IStore, StoreSubscription } from "rfluxx";
import { Form, IFormStore, IFormStoreState, SelectFormField, StringFormField, DateFormField } from "rfluxx-forms";
import { IPageContextProps, PageContext } from "rfluxx-routing";

import { IFormData, ISubobject } from "./IFormData";

export const styles = createStyles({
    root: {

    },
    formData: {
        backgroundColor: "lightgray",
        borderStyle: "dotted",
        borderWidth: "1px",
        borderColor: "gray",
        borderRadius: "5px",
        padding: "10px",
        marginTop: "50px"
    }
});

export interface IFormDemoPageProps extends IPageContextProps, WithStyles<typeof styles>
{
}

export interface IFormDemoPageState {
    formData: IFormData;
    databaseData: IFormData[];
}

export const FormDemoPage = withStyles(styles)(
    class extends React.Component<IFormDemoPageProps, IFormDemoPageState>
    {
        private subscription: StoreSubscription<IFormStore<IFormData>, IFormStoreState<IFormData>>
            = new StoreSubscription();
        private subscriptionDatabase: StoreSubscription<IStore<IFormData[]>, IFormData[]>
            = new StoreSubscription();

        constructor(props: any)
        {
            super(props);

            this.state = {
                formData: null,
                databaseData: []
            };
        }

        public componentDidMount(): void
        {
            const formStore = this.props.container.resolve<IFormStore<IFormData>>("IFormStore<IFormData>");
            this.subscription.subscribeStore(formStore, s =>
            {
                this.setState({ ...this.state, formData: s.data});
            });

            const databaseStore = this.props.container.resolve<IStore<IFormData[]>>("IStore<IFormData[]>");
            this.subscriptionDatabase.subscribeStore(databaseStore, s =>
            {
                this.setState({ ...this.state, databaseData: s});
            });
        }

        public componentWillUnmount(): void
        {
            this.subscription.unsubscribe();
        }

        private onSaveClick(): void
        {
            this.subscription.store.saveData.trigger(null);
        }

        private onNewClick(): void
        {
            this.subscription.store.resetData.trigger(null);
        }

        public render(): any
        {
            const { classes, ...rest } = this.props;

            return <div className="container-fluid">
                <h1>Select a string</h1>
                <p>
                    On this page you can select a string that will be handed back to the calling control.
                </p>

                <Form formStore={this.subscription.store}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <StringFormField getValue={(d: IFormData) => d.firstName}
                                            setValue={(d: IFormData, value: string) => d.firstName = value}
                                            label="First Name"
                                            description="Please enter your first name"
                                            required></StringFormField>
                        </Grid>
                        <Grid item>
                            <StringFormField getValue={(d: IFormData) => d.lastName}
                                            setValue={(d: IFormData, value: string) => d.lastName = value}
                                            label="Last Name"
                                            description="Please enter your last name"
                                            required></StringFormField>
                        </Grid>
                        <Grid item>
                            <DateFormField getValue={(d: IFormData) => d.birthdate}
                                           setValue={(d: IFormData, value: string) => d.birthdate = value}
                                           label="Birthdate"
                                           description="Please enter your birthdate"
                                           required></DateFormField>
                        </Grid>
                        <Grid item>
                            <SelectFormField getValue={(d: IFormData) => d.someSelectableString}
                                            setValue={(d: IFormData, value: string) => d.someSelectableString = value}
                                            label="Some selectable String"
                                            description="Please choose the selectable string"
                                            values={[
                                                "String 1",
                                                "String 2",
                                                "String 3",
                                                "String 4",
                                                "String 5"
                                            ]}
                                            required></SelectFormField>
                        </Grid>
                        <Grid item>
                            <SelectFormField getValue={(d: IFormData) => d.selectableSubobject}
                                            setValue={(d: IFormData, value: ISubobject) => d.selectableSubobject = value}
                                            label="Some selectable subobject"
                                            description="Please choose the selectable subobject"
                                            values={[
                                                { id: 101, caption: "Object 1" },
                                                { id: 102, caption: "Object 2" },
                                                { id: 103, caption: "Object 3" },
                                                { id: 104, caption: "Object 4" },
                                                { id: 105, caption: "Object 5" }
                                            ]}
                                            required></SelectFormField>
                        </Grid>
                    </Grid>
                </Form>

                <Grid container spacing={2}>
                    <Grid item>
                        <Button variant="text" onClick={_ => this.onNewClick()}>New</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={_ => this.onSaveClick()}>Save</Button>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div className={classes.formData}>
                            <Typography>
                                Here is the data you entered:
                            </Typography>
                            <Typography>
                                { this.state.formData &&
                                    <pre>
                                        {JSON.stringify(this.state.formData, null, 2)}
                                    </pre> }
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.formData}>
                            <Typography>
                                Here is the data stored in the 'database':
                            </Typography>
                            <Typography>
                                { this.state.databaseData &&
                                    <pre>
                                        {JSON.stringify(this.state.databaseData, null, 2)}
                                    </pre> }
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>;
        }
    }
);
