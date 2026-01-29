// Effects.jsx
import React from 'react';
import Section from '../ux/section';
import Popups from '../ux/popups';
import EffectTypes from '../elements/effectTypes';
import EffectPresets from '../elements/effectPresets';
import CustomCharacters from '../elements/customCharacters';
import Resolution from '../../tools/resolution';
import Size from '../../tools/size';

const Effects = () => {
    const EffectData1 = EffectTypes();
    const EffectData2 = EffectPresets();
    const EffectData3 = CustomCharacters();
    const EffectData4 = Resolution();
    const EffectData5 = Size();

    return (
        <Section
            header="Effects Style"
            elements={
                <>
                    <p className='Elements-Title'>{EffectData1.name}</p>
                    <Popups Title={EffectData1.Selected} Items={EffectData1.List} />

                    <p className='Elements-Title'>{EffectData2.name}</p>
                    <Popups Title={EffectData2.Selected} Items={EffectData2.List} />

                    <p className='Elements-Title'>{EffectData3.name}</p>
                    {EffectData3.Component}
                    {EffectData4.Component}
                    {EffectData5.Component}

                </>
            }
        />
    )
}

export default Effects;