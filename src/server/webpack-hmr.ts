import Logging from './utils/logging';
import { Express } from 'express';

export default function customHMR(app: Express) {
  try {
    const webpackConfig = require('../client/webpack.config')({
      NODE_ENV: 'development',
    });

    const compiler = require('webpack')(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, {}));
    app.use(require('webpack-hot-middleware')(compiler));
    Logging.info('HMR Activated!');
  } catch (err) {
    Logging.error('Error occurred while running customHMR:', err);
  }
}
