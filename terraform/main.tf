terraform {
  required_version = ">=0.12.13"
}

# Download any stable version in AWS of 2.36.0 or higher
provider "aws" {
  region  = "us-east-1"
}

# Call the tfbootstrap module to built tfstate S3 bucket + DB
module "tfbootstrap" {
  source                      = "./modules/tfbootstrap"
  name_of_s3_bucket           = "solmines_terraform_bucket"
  dynamo_db_table_name        = "aws-locks"
}