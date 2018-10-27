import { REGEX_DISPLAY_NAME, REGEX_PROP_NAME } from '../constant/constants'
import isContext from '../helper/isContext'
import PropertiesConfig from '../types/PropertiesConfig'

import React from 'react'
import { Spec } from 'js-spec'

const
  specOfPropertiesConfig =
    Spec.and(
      Spec.object,
      Spec.keysOf(Spec.match(REGEX_PROP_NAME)),

      Spec.valuesOf(
        Spec.and(
          Spec.strictShape({
            type: Spec.optional(Spec.function),
            nullable: Spec.optional(Spec.boolean),
            validate: Spec.optional(Spec.function),
            required: Spec.optional(Spec.boolean),
            defaultValue: Spec.optional(Spec.any)
          }),

          (propConfig: PropertiesConfig<any>) => {
            const
              required = propConfig.required,
              hasRequiredParam = propConfig.hasOwnProperty('required'),
              hasDefaultValue = propConfig.hasOwnProperty('defaultValue')

            let errorMsg = null

            if (hasRequiredParam && hasDefaultValue) {
              errorMsg = 'The parameters "required" and "defaultValue" must '
                + 'not be set both at once'
            } else if (required === false) {
              errorMsg = 'Please do not provide "required: false" as this is redundant'
            }

            return errorMsg ? new Error(errorMsg) : null
          }))),

  specOfComponentConfig = 
    Spec.strictShape({
      displayName: Spec.match(REGEX_DISPLAY_NAME),
      properties: Spec.optional(specOfPropertiesConfig),
      variableProps: Spec.optional(Spec.boolean),
      validate: Spec.optional(Spec.function),

      methods:
        Spec.optional(
          Spec.and(
            Spec.arrayOf(Spec.string),
            Spec.unique())),

      main: Spec.function
    })

export default specOfComponentConfig
