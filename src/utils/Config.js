let instance = null;

class Config {
  constructor(firebaseConfig, stripeConfig) {
    this.firebaseConfig = firebaseConfig;
    this.stripeConfig = stripeConfig;
  }
}

// Singleton
module.exports = (firebaseConfig, stripeConfig) => {
  if (!instance) {
    instance = new Config(firebaseConfig, stripeConfig);
  }

  return instance;
};
