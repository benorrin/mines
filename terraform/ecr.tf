####
# ECR Declarations
####

resource "aws_ecr_repository" "solmines-ecr-repository" {
  name                 = "solmines-ecr-repository"
}

resource "aws_ecr_repository_policy" "solmines-ecr-repository-policy" {
  repository = aws_ecr_repository.solmines-ecr-repository.name
  policy     = <<EOF
  {
    "Version": "2008-10-17",
    "Statement": [
      {
        "Sid": "adds full ecr access to the demo repository",
        "Effect": "Allow",
        "Principal": "*",
        "Action": [
          "ecr:BatchCheckLayerAvailability",
          "ecr:BatchGetImage",
          "ecr:CompleteLayerUpload",
          "ecr:GetDownloadUrlForLayer",
          "ecr:GetLifecyclePolicy",
          "ecr:InitiateLayerUpload",
          "ecr:PutImage",
          "ecr:UploadLayerPart"
        ]
      }
    ]
  }
  EOF
}