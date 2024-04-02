import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { useForm } from "../../shared/Hooks/form-hooks";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useHttpClient } from "../../shared/Hooks/http-hook";

import { config } from "../../config";

import './item.css'

const ItemRow = props => {
    console.log("check id", props.id);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const { error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm({
        fullName: {
            value: props.fullName || "",
            isValid: true
        },
        merchantEmail: {
            value: props.merchantEmail || "",
            isValid: true
        },
        store: {
            value: props.store || "",
            isValid: true
        },
        image: {
            value: props.image || "",
            isValid: true
        }
    }, true);

    // Edit Image
    const showEditHandler = event => {
        setFormData(
            {
                fullName: {
                    value: props.fullName || "",
                    isValid: true
                },
                merchantEmail: {
                    value: props.merchantEmail || "",
                    isValid: true
                },
                store: {
                    value: props.store || "",
                    isValid: true
                },
                image: {
                    value: props.image || "",
                    isValid: TextTrackCueList
                }
            },
            true
        );
        setShowEditModal(true);
    };

    const confirmEditHandler = async event => {
        event.preventDefault();
        setShowEditModal(false);

        try {
            const formData = new FormData();
            formData.append('fullName', formState.inputs.fullName.value);
            formData.append('merchantEmail', formState.inputs.merchantEmail.value);
            formData.append('store', formState.inputs.store.value);
            formData.append('image', formState.inputs?.image?.value || '');
            await sendRequest(
                `${config.API_URL}/products/${props.id}`,
                'PATCH',
                formData,
                {}
            );
            await props.fetchProducts()
            props.showToast("success", "product updated successfully.");
        } catch (err) {
            console.error(err);
            props.showToast("danger", "Updating product failed, please try again later.");
        }
    };

    const cancelEditHandler = () => {
        setShowEditModal(false);
    };
    // End Add Image

    // Delete Image
    const cancelDeleteHandler = () => { setShowDeleteModal(false); };

    const showDeleteWarningHandler = event => {
        setShowDeleteModal(true);
    };

    const confirmDeleteHandler = async () => {
        setShowDeleteModal(false);
        try {
            await sendRequest(
                `${config.API_URL}/products/${props.id}`,
                'DELETE',
                null,
                {}
            );
            await props.fetchProducts();
            props.showToast("success", "product deleted successfully.");
        } catch (err) {
            console.error(err);
            props.showToast("danger", "product deletion failed, please try again later.");
        }
    };
    // End Delete Image
    return (
        <React.Fragment>
        <Modal
                show={showDeleteModal}
                header='Are you sure ?'
                onCancel={cancelDeleteHandler}
                footerClass="category-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse modal onClick={cancelDeleteHandler}>CANCEL</Button>
                        <Button danger modal onClick={confirmDeleteHandler}>DELETE</Button>
                    </React.Fragment>
                }
            >
                <p>Do you want to proceed to delete Image ?</p>
            </Modal>
            <Modal
                show={showEditModal}
                header='Edit Image'
                onCancel={cancelEditHandler}
                footerClass="category-item__modal-actions"
                onSubmit={confirmEditHandler}
                footer={
                    <React.Fragment>
                        <Button type="button" inverse modal onClick={cancelEditHandler}>CANCEL</Button>
                        <Button type="submit" modal primary disabled={!formState.isValid}>
                            Save
                        </Button>
                    </React.Fragment>
                }

            >
                <ImageUpload buttonText={"PICK IMAGE"} showImage center id="image" onInput={inputHandler} errorText="Please provide an image." value={props.image}/>
                <Input
                    id="fullName"
                    element="input"
                    type="text"
                    label="Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid fullName."
                    onInput={inputHandler}
                    value={props.fullName}
                    placeholder="product name"
                    isValid={true}
                />
                <Input
                    id="merchantEmail"
                    element="input"
                    type="text"
                    label="Merchant Email"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid merchant Email."
                    onInput={inputHandler}
                    value={props.merchantEmail}
                    placeholder="Merchant Email"
                    isValid={true}
                />
                <Input
                    id="store"
                    element="input"
                    type="text"
                    label="Store"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid store."
                    onInput={inputHandler}
                    value={props.store}
                    placeholder="Store"
                    isValid={true}
                />
            </Modal>
            <tr>
                <td><img className="item-image" src={`${config.SERVER_URL + '/' + props.image}`} alt="product item image" /></td>
                <td>{props.fullName}</td>
                <td>{props.merchantEmail}</td>
                <td>{props.store}</td>
                <td>
                    <button onClick={showEditHandler} type="button" className="btn btn-primary">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={showDeleteWarningHandler} type="button" className="btn btn-danger mx-1">
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </td>
            </tr>
        </React.Fragment>
    );
}

export default ItemRow;