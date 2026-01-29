// Effects.jsx
import React from 'react';
import Section from '../ux/section';
import Exposure from '../../tools/exposure';
import Brightness from '../../tools/brightness';
import Contrast from '../../tools/contrast';
import Highlights from '../../tools/highlights';
import Depth from '../../tools/depth';
import Blur from '../../tools/blur';
import Shadows from '../../tools/shadows';

const Filters = () => {

    const EffectData1 = Exposure();
    const EffectData2 = Brightness();
    const EffectData3 = Contrast();
    const EffectData4 = Highlights();
    const EffectData5 = Depth();
    const EffectData6 = Blur();
    const EffectData7 = Shadows();

    return (
        <Section
            header="Filters"
            elements={
                <>    
                    {EffectData1.Component}
                    {EffectData2.Component}
                    {EffectData3.Component}
                    {EffectData4.Component}
                    {EffectData5.Component}
                    {EffectData6.Component}
                    {EffectData7.Component}

                </>
            }
        />
    )
}

export default Filters;