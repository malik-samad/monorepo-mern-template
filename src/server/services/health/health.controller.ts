import { version } from '../../../../package.json';

export default function health() {
  return { version };
}
