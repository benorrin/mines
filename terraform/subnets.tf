####
# Subnet Declarations
####

# Create public subnet
resource "aws_subnet" "solmines-public-subnet1" {
    vpc_id = "${aws_vpc.solmines-vpc.id}"
    cidr_block = "10.0.1.0/24"
    map_public_ip_on_launch = "true"
    availability_zone = "${var.region}a"

    tags = {
        Name = "solmines-public-subnet1"
    }
}

# Create public subnet2
resource "aws_subnet" "solmines-public-subnet2" {
    vpc_id = "${aws_vpc.solmines-vpc.id}"
    cidr_block = "10.0.2.0/24"
    map_public_ip_on_launch = "true"
    availability_zone = "${var.region}b"

    tags = {
        Name = "solmines-public-subnet2"
    }
}

# Create private subnet 1
resource "aws_subnet" "solmines-private-subnet1" {
    vpc_id = "${aws_vpc.solmines-vpc.id}"
    cidr_block = "10.0.3.0/24"
    map_public_ip_on_launch = "true"
    availability_zone = "${var.region}a"

    tags = {
        Name = "solmines-private-subnet1"
    }
}

# Create private subnet 2
resource "aws_subnet" "solmines-private-subnet2" {
    vpc_id = "${aws_vpc.solmines-vpc.id}"
    cidr_block = "10.0.4.0/24"
    map_public_ip_on_launch = "true"
    availability_zone = "${var.region}b"

    tags = {
        Name = "solmines-private-subnet2"
    }
}