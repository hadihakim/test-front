import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';
import ImagePlaceholder from '../../assets/image-placeholder.jpg';
import { config } from '../../../config';

import './ImageUpload.css';

const ImageUpload = props => {
  const image = props.value || null;
  const isValue = props.value ? true : false
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(image);
  const [isValid, setIsValid] = useState(isValue);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      if (previewUrl && props.getPreviewURL) {
        props.getPreviewURL(`${config.SERVER_URL+'/'+previewUrl}`);
      }
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
      if (props.getPreviewURL) {
        props.getPreviewURL(fileReader.result);
      }
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = event => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
      props.onInput(props.id, pickedFile, fileIsValid);
    } else if (previewUrl) {
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
      props.onInput(props.id, pickedFile, fileIsValid);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: props.showImage ? "none" : "" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
        multiple={false}
      />
      {props.showImage &&
        <div className={`image-upload ${props.center && 'center'}`}>
          {!props.hidePreview &&
            <div className="image-upload__preview">
              {previewUrl && !file && <img src={`${config.SERVER_URL + '/' + previewUrl}`} alt="Preview" />}
              {previewUrl && file && <img src={`${previewUrl}`} alt="Preview" />}
              {!previewUrl && <img src={ImagePlaceholder} alt="Preview" />}
            </div>
          }
          <Button modal transparent type="button" onClick={pickImageHandler}>
            {props.buttonText}
          </Button>
        </div>
      }
      {(!isValid && !props.hideError) && <p className='error-text'>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
