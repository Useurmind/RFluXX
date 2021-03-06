import * as Rfluxx from "rfluxx";
import { Observable } from "rxjs/Observable";

import { IFetchResult, SimpleError } from "./ErrorHandling";
import { FormFieldDataObject } from "./FormFieldData";
import { ValidateDataObject, ValidationErrors, Validator } from "./Validation";

/**
 * Type for a function to set a data field.
 */
type SetDataField = (data: any, value: any) => void;

/**
 * Type for a function to get the value of a data field.
 * This function type can also be used to get the validation errors from
 * the validation error object for a given data field.
 */
type GetDataField = (data: any) => any;

/**
 * Parameters for the action that updates a data field in the
 * data object.
 */
export interface IUpdateDataFieldParams
{
    /**
     * A function that knows how to set the data field in the
     * data object.
     */
    setDataField: SetDataField;

    /**
     * The value that should be applied.
     */
    value: any;

    /**
     * An function that is called to save this specific field.
     * This is used when automatic field saving is enabled and the field value changes.
     */
    saveDataField?: (fieldValue: any, data: any) => Observable<IFetchResult<any, SimpleError>>;
}

/**
 * State for { @see IFormStore }
 */
export interface IFormStoreState<TData>
{
    /**
     * The data object that is shown and edited in the form.
     */
    data: TData | null;

    /**
     * A problem description that can be set when saving fails due to network errors
     * or similar stuff.
     * TODO: read this out
     */
    saveProblem: string | null;

    /**
     * Is the store currently loading/storing data.
     */
    isLoading: boolean;

    /**
     * Error messages that do not belong to a specific form field.
     */
    globalErrors: string | string[] | null;

    /**
     * This is an object that has the same structure as the original data object.
     * Only that each property is a string array containing the validation errors.
     */
    validationErrors: ValidationErrors<TData> | null;

    /**
     * This object holds additional information for each form field in the form data
     * object.
     * TODO: do something with this
     */
    formFieldData: FormFieldDataObject<TData>;
}

/**
 * Interface for any form store that should be used with the form components.
 */
export interface IFormStore<TData> extends Rfluxx.IStore<IFormStoreState<TData>>
{
    /**
     * Action to update a data field in the data object.
     */
    updateDataField: Rfluxx.IAction<IUpdateDataFieldParams>;

    /**
     * Save the data currently in the form.
     * No argument required.
     */
    saveData: Rfluxx.IAction<any>;

    /**
     * Reset the data object to an empty object.
     */
    resetData: Rfluxx.IAction<any>;
}

/**
 * Update a data field in the state of the store.
 * @returns The new state object for the store.
 */
export function updataDataField<TData>(
    state: IFormStoreState<TData>, setDataField: SetDataField, value: any)
    : IFormStoreState<TData>
{
    const newData = { ...(state.data as any) };

    setDataField(newData, value);

    return {
        ...state,
        data: newData
    };
}

/**
 * Validate the data object.
 * @returns The new state object for the store.
 */
export function validate<TData>(
    state: IFormStoreState<TData>, validateDataObject: ValidateDataObject<TData>)
    : IFormStoreState<TData>
{
    const validationErrors = validateDataObject(state.data, new Validator<TData>());

    return {
        ...state,
        validationErrors
    };
}
