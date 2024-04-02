
import React, { useCallback, useState, useContext } from 'react';

import Button from '../../FormElements/Button';
import Input from '../../FormElements/Input';
import { useForm } from '../../../Hooks/form-hooks';
import ImageUpload from '../../FormElements/ImageUpload';
import Switch from '../../FormElements/Switch';
import { useHttpClient } from '../../../Hooks/http-hook';
import { config } from '../../../../config';
import { AuthContext } from '../../../context/auth-context';
import SliderSection from '../../../../Product/components/ImageSlider/sliderSection';

import './adminSections.css';


const AdminSections = props => {
    const auth = useContext(AuthContext);
    const [sectionImage, setSectionImage] = useState();
    const [sectionBackgroundImage, setSectionBackgroundImage] = useState();
    const { sendRequest } = useHttpClient();

    const backgroundImagePath = props.section?.background?.image;
    const sanitizedImagePath = backgroundImagePath?.replace(/\\/g, '/');
    const backgroundImageUrl = `${encodeURI(sanitizedImagePath)}`


    const [formState, inputHandler] = useForm({
        title: {
            value: props.section?.title || '',
            isValid: true
        },
        description: {
            value: props.section?.description1 || '',
            isValid: true
        },
        description2: {
            value: props.section?.description2 || '',
            isValid: true
        },
        subtitle: {
            value: props.section?.subtitle || '',
            isValid: true
        },
        image: {
            value: props.section?.images[0]?.image || null,
            isValid: true
        },
        backgroundImage: {
            value: backgroundImageUrl || null,
            isValid: true
        },
        buttonText: {
            value: props.section?.button?.text || '',
            isValid: true
        },
        buttonLink: {
            value: props.section?.button?.link || '',
            isValid: true
        },
        available: {
            value: props.section?.available === false ? false : true,
            isValid: true
        }
    }, true);

    const adminSectionSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('type', props.sectionType);
            formData.append('description1', formState.inputs.description.value);
            formData.append('description2', formState.inputs.description2.value);
            formData.append('subtitle', formState.inputs.subtitle.value);
            formData.append('image', formState.inputs.image.value);
            formData.append('backgroundImage', formState.inputs.backgroundImage.value);
            formData.append('buttonText', formState.inputs.buttonText.value);
            formData.append('buttonLink', formState.inputs.buttonLink.value);
            formData.append('available', formState.inputs.available.value);
            await sendRequest(
                `${config.API_URL}/sections/${props.sectionName}`,
                'PATCH',
                formData,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            props.fetchSections();
            props.showToast("success", "Section updated successfully.");
        } catch (err) {
            console.error(err);
            props.showToast("danger", "Updating section failed, please try again later.");
        }
    }

    const getSectionImage = useCallback((previewURL) => {
        setSectionImage(previewURL)
    }, [setSectionImage]);

    const getBackgroundImage = useCallback((previewURL) => {
        setSectionBackgroundImage(previewURL)
    }, []);

    return (
        <React.Fragment>
            {props.sectionLayout1 &&
                <section className={`admin-section ${props.sectionClasses}`}>
                    {!props.hideUpload &&
                        <div className="admin-upload-section">
                            <ImageUpload hideError hidePreview showImage buttonText={"Add Image"} getPreviewURL={getSectionImage} center id="image" onInput={inputHandler} errorText="Please provide an image." value={props.section?.images[0]?.image || null} />
                            <ImageUpload hideError hidePreview showImage buttonText={"Add Background"} getPreviewURL={getBackgroundImage} center id="backgroundImage" onInput={inputHandler} errorText="Please provide an background image." value={backgroundImageUrl || null} />
                        </div>
                    }
                    <div className="admin-container">
                        {!props.hideUpload &&
                            <div style={sectionBackgroundImage ? { backgroundImage: `url(${sectionBackgroundImage})` } : {}} className="about-home-img-container">
                                {sectionImage &&
                                    <img src={sectionImage} alt="about" />
                                }
                            </div>
                        }
                        <div className={`admin-content-container ${props.contentContainerClasses}`}>
                            <form onSubmit={adminSectionSubmitHandler}>
                                <Input
                                    id="title"
                                    element="input"
                                    type="text"
                                    label="Section Title"
                                    validators={[]}
                                    errorText="Please enter a valid title."
                                    onInput={inputHandler}
                                    value={props.section?.title || ''}
                                    placeholder="title..."
                                    className="input-title"
                                    isValid={true}
                                />
                                <Input
                                    id="description"
                                    element="textarea"
                                    type="text"
                                    label="Section Description"
                                    validators={[]}
                                    errorText="Please enter a valid description."
                                    onInput={inputHandler}
                                    value={props.section?.description1 || ''}
                                    placeholder="description..."
                                    isValid={true}
                                    className="textarea-description"
                                />
                                { props.showDescription2 &&
                                    <Input
                                    id="description2"
                                    element="textarea"
                                    type="text"
                                    label="Section Description 2"
                                    validators={[]}
                                    errorText="Please enter a valid description."
                                    onInput={inputHandler}
                                    value={props.section?.description2 || ''}
                                    placeholder="description..."
                                    isValid={true}
                                    className="textarea-description2"
                                />
                                }
                                {!props.hideButtonText &&
                                    <Input
                                        id="buttonText"
                                        element="input"
                                        type="text"
                                        label="Button Text"
                                        validators={[]}
                                        errorText="Please enter a valid button text."
                                        onInput={inputHandler}
                                        value={props.section?.button?.text || ''}
                                        placeholder="button text..."
                                        isValid={true}
                                        className="input-buttonText"
                                    />
                                }
                                {!props.hideButtonLink &&
                                    <Input
                                        id="buttonLink"
                                        element="input"
                                        type="text"
                                        label="Button Link"
                                        validators={[]}
                                        errorText="Please enter a valid button link."
                                        onInput={inputHandler}
                                        value={props.section?.button?.link || ''}
                                        placeholder="button link..."
                                        isValid={true}
                                        className="input-buttonLink"
                                    />
                                }
                                <Switch HtmlFor={props.sectionName || props.id} id="available" label="Section available" onInput={inputHandler} value={props.section?.available === false ? false : true} />
                                <Button type="submit" noAnimation disabled={!formState.isValid}>
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                    { props.showSlider &&
                        <SliderSection
                            auth={auth}
                            section={props.section}
                            sectionType={props.sectionType}
                            sectionName={props.sectionName}
                            sectionId={props.section?._id}
                            showToast={props.showToast}
                            fetchSections={props.fetchSections}
                            strings={props.strings}
                        />

                    }
                </section>
            }
            {props.aboutFounder &&
                <section className="about-founder-section">
                    <div className="admin-upload-section">
                        <ImageUpload
                            hideError
                            hidePreview
                            showImage
                            buttonText={"Add Image"}
                            getPreviewURL={getSectionImage}
                            center
                            id="image"
                            onInput={inputHandler}
                            errorText="Please provide an image."
                            value={props.section?.images[0]?.image || null}
                        />
                    </div>
                    <div className="about-founder-container">
                        <div className="founder-image-container">
                            {sectionImage &&
                                <img src={sectionImage} alt="about" />
                            }
                        </div>
                        <div className="founder-details-container">
                            <form onSubmit={adminSectionSubmitHandler}>
                                <Input
                                    id="title"
                                    element="input"
                                    type="text"
                                    label="Section Title"
                                    validators={[]}
                                    errorText="Please enter a valid title."
                                    onInput={inputHandler}
                                    value={props.section?.title || ''}
                                    placeholder="title..."
                                    className="input-title"
                                    isValid={true}
                                />
                                <Input
                                    id="subtitle"
                                    element="input"
                                    type="text"
                                    label="Section Subtitle"
                                    validators={[]}
                                    errorText="Please enter a valid subtitle."
                                    onInput={inputHandler}
                                    value={props.section?.subtitle || ''}
                                    placeholder="subtitle..."
                                    className="input-subtitle"
                                    isValid={true}
                                />
                                <Input
                                    id="description"
                                    element="textarea"
                                    type="text"
                                    label="Section Description"
                                    validators={[]}
                                    errorText="Please enter a valid description."
                                    onInput={inputHandler}
                                    value={props.section?.description1 || ''}
                                    placeholder="description..."
                                    isValid={true}
                                    className="textarea-description"
                                    rows={7}
                                />
                                <Switch HtmlFor={props.sectionName || props.id} id="available" label="Section available" onInput={inputHandler} value={props.section?.available === false ? false : true} />
                                <Button classes={'button-admin-founder'} type="submit" noAnimation disabled={!formState.isValid}>
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                </section>
            }
            {props.contactAbout &&
                <section style={sectionBackgroundImage ? { backgroundImage: `url(${sectionBackgroundImage})` } : {}} className="contact-about-section admin-contact-about">
                    <div className="admin-upload-section">
                        <ImageUpload
                            hideError
                            hidePreview
                            showImage
                            buttonText={"Add Image"}
                            getPreviewURL={getSectionImage}
                            center
                            id="image"
                            onInput={inputHandler}
                            errorText="Please provide an image."
                            value={props.section?.images[0]?.image || null}
                        />

                        <ImageUpload
                            hideError
                            hidePreview
                            showImage
                            buttonText={"Add Background"}
                            getPreviewURL={getBackgroundImage}
                            center
                            id="backgroundImage"
                            onInput={inputHandler}
                            errorText="Please provide an background image."
                            value={backgroundImageUrl || null}
                        />

                    </div>
                    <div className="contact-about-container">
                        <div className="contact-about-image-container">
                            {sectionImage &&
                                <img src={sectionImage} alt="about" />
                            }
                        </div>
                        <div className="contact-about-details-container">
                            <form onSubmit={adminSectionSubmitHandler}>
                                <Input
                                    id="title"
                                    element="input"
                                    type="text"
                                    label="Section Title"
                                    validators={[]}
                                    errorText="Please enter a valid title."
                                    onInput={inputHandler}
                                    value={props.section?.title || ''}
                                    placeholder="title..."
                                    className="input-title"
                                    isValid={true}
                                />
                                <Input
                                    id="description"
                                    element="textarea"
                                    type="text"
                                    label="Description 1"
                                    validators={[]}
                                    errorText="Please enter a valid description."
                                    onInput={inputHandler}
                                    value={props.section?.description1 || ''}
                                    placeholder="description..."
                                    isValid={true}
                                    className="textarea-description"
                                    rows={3}
                                />
                                {!props.hideButtonText &&
                                    <Input
                                        id="buttonText"
                                        element="input"
                                        type="text"
                                        label="Button Text"
                                        validators={[]}
                                        errorText="Please enter a valid button text."
                                        onInput={inputHandler}
                                        value={props.section?.button?.text || ''}
                                        placeholder="button text..."
                                        isValid={true}
                                        className="input-buttonText"
                                    />
                                }
                                {!props.hideButtonLink &&
                                    <Input
                                        id="buttonLink"
                                        element="input"
                                        type="text"
                                        label="Button Link"
                                        validators={[]}
                                        errorText="Please enter a valid button link."
                                        onInput={inputHandler}
                                        value={props.section?.button?.link || ''}
                                        placeholder="button link..."
                                        isValid={true}
                                        className="input-buttonLink"
                                    />
                                }
                                <Input
                                    id="description2"
                                    element="textarea"
                                    type="text"
                                    label="Description 2"
                                    validators={[]}
                                    errorText="Please enter a valid description."
                                    onInput={inputHandler}
                                    value={props.section?.description2 || ''}
                                    placeholder="description..."
                                    isValid={true}
                                    className="textarea-description2"
                                    rows={3}
                                />
                                <Switch HtmlFor={props.sectionName || props.id} id="available" label="Section available" onInput={inputHandler} value={props.section?.available === false ? false : true} />
                                <Button classes={'button-admin-founder'} type="submit" noAnimation disabled={!formState.isValid}>
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                </section>
            }
        </React.Fragment>
    );
}

export default AdminSections;