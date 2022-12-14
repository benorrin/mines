terraform {
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.34.0"
    }
  }

  backend "s3" {
    bucket         = "solmines-terraform-bucket"
    key            = "terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "aws-locks"
    encrypt        = true
  }
}

# Download any stable version in AWS of 2.36.0 or higher
provider "aws" {
  region  = "${var.region}"
}

# Call the tfbootstrap module to built tfstate S3 bucket + DB.
module "tfbootstrap" {
  source                      = "./modules/tfbootstrap"
  name_of_s3_bucket           = "solmines-terraform-bucket"
  dynamo_db_table_name        = "aws-locks"
}