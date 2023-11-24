const settings = require('../config/env.json');

class EnvConfig{
    constructor() {      
      this.backendAPIUrl = settings.PCA_BACKEND_API_URL;      
    }
}
export default EnvConfig;