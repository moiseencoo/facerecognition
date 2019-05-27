import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className="ImageLinkForm ">
            <p className="f3">
             {'This Program will detect faces in your picutres.'}
            </p>
            <div className="center">
                <div className="form pa5 bg-light">
                <label className="db fw6 lh-copy f6 pb3">Paste image URL here and press Detect</label>
                <div className="center grow">
                <input 
                        className="f4 b pa2 input-reset ba bg-transparent w-60 " 
                        type="text"
                        onChange={onInputChange} 
                        placeholder="URL"                    />
                    <button 
                        className="w-30 ba b--black hover-bg-black hover-white f4 ph3 dib f6 link black bg-transparent"
                        onClick={onButtonSubmit}
                    >Detect</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;