import React, { useState, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'react-bootstrap';

import ProdTable from "../components/table";
import { useHttpClient } from "../../shared/Hooks/http-hook";
import { config } from "../../config";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { useForm } from "../../shared/Hooks/form-hooks";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useToast } from "../../shared/Hooks/toast-hook";
import Toast from "../../shared/components/Toast/toast";

import './product.css'

const Product = props => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [isUpdatedProducts, setIsUpdatedProducts] = useState(false);
    const [hideProductsSpinner, setHideProductsSpinner] = useState(false);
    const { error, sendRequest, clearError } = useHttpClient();
    const [toastState, showToastHandler, hideToast] = useToast({
        toastType: '',
        toastText: '',
        showToast: false
    });

    const [formState, inputHandler, setFormData] = useForm({
        fullName: {
            value: '',
            isValid: false
        },
        merchantEmail: {
            value: '',
            isValid: false
        },
        store: {
            value: '',
            isValid: false
        },
        image: {
            value: '',
            isValid: false
        }
    }, false);

    const updateProducts = (newFeedbacks) => {
        setProducts(newFeedbacks);
        setIsUpdatedProducts(true);
    };

    const fetchProducts = useCallback(async () => {
        console.log("check1", config);
        try {
            const responseData = await sendRequest(
                `${config.API_URL}/products`
            );
            console.log("check", responseData);
            clearError();
            updateProducts(responseData);
        } catch (err) {
            setIsUpdatedProducts(true);
            console.error(err);
        }
    }, [sendRequest, updateProducts, setIsUpdatedProducts]);

    useEffect(() => {
        fetchProducts();
        setTimeout(() => {
            setHideProductsSpinner(true);
        }, 500);
    }, []);

    // Add Modal
    const cancelAddHandler = () => {
        setShowAddModal(false);
    };
    const showAddHandler = event => {
        setFormData(
            {
                fullName: {
                    value: '',
                    isValid: false
                },
                merchantEmail: {
                    value: '',
                    isValid: false
                },
                store: {
                    value: '',
                    isValid: false
                },
                image: {
                    value: '',
                    isValid: false
                }
            },
            false
        );
        event.stopPropagation();
        setShowAddModal(true);
    };

    const confirmAddHandler = async event => {
        event.preventDefault();
        setShowAddModal(false);

        try {
            const formData = new FormData();
            formData.append('fullName', formState.inputs.fullName.value);
            formData.append('merchantEmail', formState.inputs.merchantEmail.value);
            formData.append('store', formState.inputs.store.value);
            formData.append('image', formState.inputs?.image?.value || '');
            await sendRequest(
                `${config.API_URL}/products/`,
                'POST',
                formData,
                {}
            );
            await fetchProducts();
            showToastHandler("success", "Product added successfully.");
        } catch (err) {
            showToastHandler("danger", "Product addition failed, please try again later.");
        }
    };


    return (
        <React.Fragment>
            <Modal
                show={showAddModal}
                header='Add New Item'
                onCancel={cancelAddHandler}
                footerClass="category-item__modal-actions"
                onSubmit={confirmAddHandler}
                footer={
                    <React.Fragment>
                        <Button type="button" inverse modal onClick={cancelAddHandler}>CANCEL</Button>
                        <Button type="submit" modal primary disabled={!formState.isValid}>
                            Save
                        </Button>
                    </React.Fragment>
                }

            >
                <ImageUpload buttonText={"PICK IMAGE"} showImage center id="image" onInput={inputHandler} errorText="Please provide an image." />
                <Input
                    id="fullName"
                    element="input"
                    type="text"
                    label="Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid fullName."
                    onInput={inputHandler}
                    value=""
                    placeholder="product name"
                    isValid={false}
                />
                <Input
                    id="merchantEmail"
                    element="input"
                    type="text"
                    label="Merchant Email"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid merchant Email."
                    onInput={inputHandler}
                    value=""
                    placeholder="Merchant Email"
                    isValid={false}
                />
                <Input
                    id="store"
                    element="input"
                    type="text"
                    label="Store"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid store."
                    onInput={inputHandler}
                    value=""
                    placeholder="Store"
                    isValid={false}
                />

            </Modal>
            <section className="product-page">
                <div className="actions">
                    <button onClick={showAddHandler} type="button" className="btn btn-primary mb-3">
                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                        Add New Product
                    </button>
                </div>
                {(hideProductsSpinner && isUpdatedProducts) &&
                    <ProdTable
                        products={products}
                        showToast={showToastHandler}
                        fetchProducts={fetchProducts}
                    />

                }

                {(!hideProductsSpinner || !isUpdatedProducts) &&
                    <div className="spinner-container">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                }

            </section>
            {toastState.showToast &&
                <Toast text={toastState.toastText}
                    type={toastState.toastType} onCancel={hideToast} />
            }
        </React.Fragment>
    );
};

export default Product;