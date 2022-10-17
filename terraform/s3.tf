####
# S3 Declarations
####

# Create S3 bucket
resource "aws_s3_bucket" "solmines-frontend-s3" {
  bucket = "solmines-frontend-s3-cloudfront"
}

# Set private access control
resource "aws_s3_bucket_acl" "solmines-frontend-s3-acl" {
  bucket = aws_s3_bucket.solmines-frontend-s3.id
  acl = "private"
}

# Disable versioning for S3 bucket
resource "aws_s3_bucket_versioning" "solmines-frontend-s3-versioning" {
  bucket = aws_s3_bucket.solmines-frontend-s3.id
  versioning_configuration {
    status = "Disabled"
  }
}

# Configure website
resource "aws_s3_bucket_website_configuration" "solmines-frontend-s3-website" {
  bucket = aws_s3_bucket.solmines-frontend-s3.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

# Configure CORS 
resource "aws_s3_bucket_cors_configuration" "solmines-frontend-s3-cors" {
  bucket = aws_s3_bucket.solmines-frontend-s3.bucket

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST"]
    allowed_origins = ["https://api.mines.orrin.uk"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }

  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }

}

# attach policy to OAI to allow ONLY s3:GetObject permission
data "aws_iam_policy_document" "solmines-frontend-s3-policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.solmines-frontend-s3.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn]
    }
  }

  depends_on = [
    aws_cloudfront_origin_access_identity.origin_access_identity
  ]
}

resource "aws_s3_bucket_policy" "solmines-frontend-s3-policy" {
  bucket = aws_s3_bucket.solmines-frontend-s3.id
  policy = data.aws_iam_policy_document.solmines-frontend-s3-policy.json

  depends_on = [
    data.aws_iam_policy_document.solmines-frontend-s3-policy
  ]
}

resource "aws_s3_bucket_public_access_block" "solmines-frontend-s3-access" {
  bucket = aws_s3_bucket.solmines-frontend-s3.id

  block_public_acls       = true
  block_public_policy     = true
}