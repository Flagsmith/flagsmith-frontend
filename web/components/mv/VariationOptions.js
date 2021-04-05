import React from 'react';
import Constants from '../../../common/constants';
import VariationValue from './VariationValue';

export default function VariationOptions({ multivariateOptions, controlValue, weightTitle, removeVariation, updateVariation }) {
    const invalid = multivariateOptions.length && controlValue < 0;

    if (!multivariateOptions || !multivariateOptions.length) {
        return null;
    }
    return (
        <>
            {invalid && (
                <div className="alert alert-danger">
                    Your variation percentage splits total to over 100%
                </div>
            )}
            <Tooltip
              title={(
                  <label>Variations <span className="icon ion-ios-information-circle"/></label>
                )}
              html
              place="right"
            >
                {Constants.strings.MULTIVARIATE_DESCRIPTION}
            </Tooltip>
            {
                multivariateOptions.map((m, i) => (
                    <VariationValue
                      key={i}
                      value={m}
                      onChange={e => updateVariation(i, e)}
                      weightTitle={weightTitle}
                      onRemove={() => removeVariation(i)}
                    />
                ))
            }
        </>
    );
}
