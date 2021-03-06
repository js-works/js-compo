import configSpec from '../spec/specOfComponentConfig'
import isValidDisplayName from '../helper/isValidDisplayName'
import FunctionalComponentConfig from '../types/FunctionalComponentConfig'
import ClassComponentConfig from '../types/ClassComponentConfig'

type ComponentConfig = FunctionalComponentConfig | ClassComponentConfig

export default function validateComponentConfig(config: ComponentConfig) {
  let ret = null
  const error = configSpec.validate(config)

  if (error) {
    let errorMsg = 'Invalid configuration for component'

    if (config && isValidDisplayName(config.displayName)) {
      errorMsg += ` "${config.displayName}"`
    }

    errorMsg += ` => ${error.message}`

    ret = new Error(errorMsg)
  }

  return ret
}
