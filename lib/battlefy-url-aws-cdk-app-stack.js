const { Stack, Duration } = require('aws-cdk-lib');
const url_shortener_service = require('../lib/aws-cdk-infra-service');

class BattlefyUrlAwsCdkAppStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new url_shortener_service.UrlService(this, "UrlShortener")
  }
}

module.exports = { BattlefyUrlAwsCdkAppStack }
