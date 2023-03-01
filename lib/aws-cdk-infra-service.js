const cdk = require("aws-cdk-lib");
const { Construct } = require("constructs");
const apigateway = require("aws-cdk-lib/aws-apigateway");
const lambda = require("aws-cdk-lib/aws-lambda");
const s3 = require("aws-cdk-lib/aws-s3");

class UrlService extends Construct {
    constructor(scope, id) {
        super(scope, id);

        const bucket = new s3.Bucket(this, "UrlStore", {
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });

        const handler = new lambda.Function(this, "UrlHandler", {
            runtime: lambda.Runtime.NODEJS_18_X, 
            code: lambda.Code.fromAsset("url-app"),
            handler: "url-shortener.main",
             environment: {
               BUCKET: bucket.bucketName
             }
        });
        
        bucket.grantReadWrite(handler);

        const api = new apigateway.RestApi(this, "widgets-api", {
            restApiName: "URL Shortener Webservice",
            description: "This service serves GET and POST endpoints required for the URL Service."
        });

        const shortlinkEndpoints = api.root.addResource("{shortlink}");
            
        const urlHanderIntegration = new apigateway.LambdaIntegration(handler);
        shortlinkEndpoints.addMethod("POST", urlHanderIntegration);
        shortlinkEndpoints.addMethod("GET", urlHanderIntegration);
    }
}

module.exports = { UrlService }
