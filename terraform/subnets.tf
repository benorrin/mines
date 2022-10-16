####
# Subnet Declarations
####

# Create public subnet
resource "aws_subnet" "solmines-public-subnet" {
    vpc_id = "${aws_vpc.solmines-vpc.id}"
    cidr_block = "10.0.1.0/24"
    map_public_ip_on_launch = "true"
    availability_zone = "eu-west-2a"

    tags = {
        Name = "solmines-public-subnet"
    }
}

# Create private subnet
resource "aws_subnet" "solmines-private-subnet" {
    vpc_id = "${aws_vpc.solmines-vpc.id}"
    cidr_block = "10.0.2.0/24"
    map_public_ip_on_launch = "true"
    availability_zone = "eu-west-2a"

    tags = {
        Name = "solmines-private-subnet"
    }
}