####
# Security Group Declarations
####

# Create database security group 
resource "aws_security_group" "solmines-database" {
vpc_id      = "${aws_vpc.solmines-vpc.id}"

  ingress {
    from_port   = 27017
    to_port     = 27017
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["10.0.1.0/24"]
  }
}

# Create ELB security group 
resource "aws_security_group" "solmines-elb" {
vpc_id      = "${aws_vpc.solmines-vpc.id}"

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}