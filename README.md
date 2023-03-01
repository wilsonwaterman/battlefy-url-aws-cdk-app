# Url Shortener Utility App for Battlefy

# The Tool
Url Shortener code lives in the url-app subfolder. Any changes specific to the application code will go here.

# The CICD
GitHub Actions handles the CICD for both app compilation and creation of services in AWS. Any additions to this workflow can be made in the deploy-cdk.yml file found in .github/workflows.

The CICD and cloud services creation can be triggered manually in GitHub Actions, or automatically on commit to the main branch.

# The Infrastructure
Stack and service IaC are in the lib and bin folders. Any adds to the stack should be made in the lib folder.

# Infrastructure decisions
In addition to Lambda, this solution is designed to use API Gateway to handle requests in front of the function. API Gateway is scalable, highly available, and responsive under load. Paired with Lambda, it will help satisfy the solution for handling large request bursts.

S3 was selected over DocumentDB for persistance. The app code, unfortunately, is configured to work with mongoDB (see comments below), however in retrospect, storing URL data in S3 is preferred given it would be more cost effective than DocDB, even under load. DocDB would have a preferred structure, but would require provisioning of EC2 and VPC components, taking away from the serverless nature of the solutuon.

Lastly, using client certificates from API Gateway would be my approach for limiting the POST endpoint access to Battlefy users. Unfortunately I ran out of time before implementing this as part of the solution.

# Other comments from Wilson about the solution
This tool uses npm to install libraries and execute the CICD steps in GHA. This method was found to be more flexible for work on this project over other resources and open source modules available.

You'll notice by now that this is not a fully working application. I made a critical error in my approach where I wrote a local node app that sat on top of a local mongodb instance to figure out my app logic, instead of taking a fuller picture approach. AWS CDK is a newer concept for me, and in hindsight I would have spent more time understanding this framework and building the app to work within it (serverless from the start, utilizing more cloud native technologies). It's obvious that the code in url-app will not work with the rest of the project, however I still wanted to include it so that I had something to share.

# Running the app in it's current state
Please feel free to kick off the action to verify that that part of the requirement does put something together successfully. An URL that points to API Gateway will be delivered at the end of the CDK Deploy stage in github actions, however it will not be functional.
