import React, { Component } from "react";

import Button from "metabase/components/Button";
import ColorPicker from "metabase/components/ColorPicker";
import FormField from "metabase/components/FormField";
import Input from "metabase/components/Input";
import PageModal from "metabase/components/PageModal";

import { reduxForm } from "redux-form";

@reduxForm({
    form: 'collection',
    fields: ['color', 'name', 'id'],
    validate: (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = true;
        }
        if (!values.color) {
            errors.color = "Color is required";
        }
        return errors;
    },
    initialValues: { name: "", description: "", color: "#509EE3" }
})
export default class CollectionEditorForm extends Component {
    render() {
        const { fields, handleSubmit, invalid, onClose } = this.props;
        return (
            <PageModal
                title={fields.id.value != null ? fields.name.value : "New collection"}
                footer={
                    <div className="flex-full">
                        <Button className="mr1" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button primary disabled={invalid} onClick={handleSubmit}>
                            { fields.id.value != null ? "Update" : "Create" }
                        </Button>
                    </div>
                }
                onClose={onClose}
            >
                <div className="NewForm ml-auto mr-auto mt4 pt2" style={{ width: 540 }}>
                    <div>
                        <FormField
                            displayName="Name"
                            {...fields.name}
                        >
                            <Input
                                className="Form-input full"
                                placeholder="My new fantastic collection"
                                autoFocus
                                {...fields.name}
                            />
                        </FormField>

                        <FormField
                            displayName="Description"
                            {...fields.description}
                        >
                            <textarea
                                className="Form-input full"
                                placeholder="It's optional but oh, so helpful"
                                {...fields.description}
                            />
                        </FormField>
                        <FormField
                            displayName="Color"
                            {...fields.color}
                        >
                            <ColorPicker
                                {...fields.color}
                            />
                        </FormField>
                    </div>
                </div>
            </PageModal>
        )
    }
}