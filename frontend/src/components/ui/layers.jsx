// Effects.jsx
import React from 'react';
import Section from '../ux/section';
import Popups from '../ux/popups';
import LayerImage from '../elements/layerImage';


const Layers = () => {
    const EffectData1 = LayerImage();


    return (
        <Section
            header="Layers"
            elements={
                <>
                    <Popups Title={EffectData1.Selected} Items={EffectData1.List} />



                </>
            }
        />
    )
}

export default Layers;


