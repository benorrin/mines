####
# Cloudfront Declarations
####

resource "aws_cloudfront_origin_access_identity" "solmines-cloudfront-oai" {
  comment = "OAI for mines.orrin.uk"
}

resource "aws_cloudfront_distribution" "solmines-cloudfront-dist" {
  origin {
    domain_name = aws_s3_bucket.solmines-frontend-s3.bucket_regional_domain_name
    origin_id   = "mines.orrin.uk"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.solmines-cloudfront-oai.cloudfront_access_identity_path
    }
  }

  viewer_certificate {
    acm_certificate_arn = "arn:aws:acm:us-east-1:422678325178:certificate/f41daf72-8871-4284-b590-cdba42cb5421"
    ssl_support_method = "sni-only"
    minimum_protocol_version = "TLSv1"
  }

  # Custom error handlers for react
  custom_error_response {
    error_code    = 403
    response_code = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code    = 404
    response_code = 200
    response_page_path = "/index.html"
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases = ["mines.orrin.uk"]

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "mines.orrin.uk"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # Cache behavior with precedence 0
  ordered_cache_behavior {
    path_pattern     = "*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "mines.orrin.uk"

    forwarded_values {
      query_string = false
      headers      = ["Origin"]

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
    viewer_protocol_policy = "allow-all"
  }

  price_class = "PriceClass_200"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  depends_on = [
    aws_s3_bucket.solmines-frontend-s3
  ]
}

# output Cloud front URL if doamin/alias is not configured
output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.solmines-cloudfront-dist.domain_name
}

output "cloudfront_distribution" {
  value = aws_cloudfront_distribution.solmines-cloudfront-dist.id
}