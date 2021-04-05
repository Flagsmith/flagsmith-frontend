import React from 'react';
import Constants from '../../../common/constants';
import VariationValue from './VariationValue';

export default function VariationOptions({ multivariateOptions, disabled, controlValue, weightTitle, variationOverrides, removeVariation, updateVariation }) {
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
                multivariateOptions.map((m, i) => {
                    const override = variationOverrides && variationOverrides.find(v => v.multivariate_feature_option === m.id);
                    return (
                        <VariationValue
                          disabled={disabled}
                          key={i}
                          value={{
                              ...m,
                              ...(override ? { default_percentage_allocation: override.percentage_allocation } : {}),
                          }}
                          onChange={(e) => {
                              if (override) {
                                  override.percentage_allocation = e.default_percentage_allocation;
                              }
                              updateVariation(i, e, variationOverrides);
                          }}
                          weightTitle={weightTitle}
                          onRemove={() => removeVariation(i)}
                        />
                    );
                })
            }
        </>
    );
}
