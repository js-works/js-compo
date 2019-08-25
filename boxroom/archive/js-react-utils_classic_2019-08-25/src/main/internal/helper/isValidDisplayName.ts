import { REGEX_DISPLAY_NAME } from '../constant/constants'

export default function isValidDisplayName(name: any) {
  return typeof name === 'string' && !!name.match(REGEX_DISPLAY_NAME)
}
