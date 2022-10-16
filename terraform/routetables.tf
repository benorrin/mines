####
# Custom Route Table Declarations
####

# Create custom route table for public subnet
resource "aws_route_table" "solmines-public-crt" {
    vpc_id = "${aws_vpc.solmines-vpc.id}"
    
    route {
        cidr_block = "0.0.0.0/0" 
        gateway_id = "${aws_internet_gateway.solmines-igw.id}" 
    }
    
    tags = {
        Name = "solmines-public-crt"
    }
}

# Create custom route table for private subnet 1
resource "aws_route_table" "solmines-private-crt1" {
    vpc_id = "${aws_vpc.solmines-vpc.id}"
    
    tags = {
        Name = "solmines-private-crt1"
    }
}

# Create custom route table for private subnet 2
resource "aws_route_table" "solmines-private-crt2" {
    vpc_id = "${aws_vpc.solmines-vpc.id}"
    
    tags = {
        Name = "solmines-private-crt2"
    }
}

# Associate public route table and public subnet 
resource "aws_route_table_association" "solmines-crta-public-subnet"{
    subnet_id = "${aws_subnet.solmines-public-subnet.id}"
    route_table_id = "${aws_route_table.solmines-public-crt.id}"
}

# Associate private route table and private subnet 1
resource "aws_route_table_association" "solmines-crta-private-subnet1"{
    subnet_id = "${aws_subnet.solmines-private-subnet1.id}"
    route_table_id = "${aws_route_table.solmines-private-crt.id}"
}

# Associate private route table and private subnet 2
resource "aws_route_table_association" "solmines-crta-private-subnet2"{
    subnet_id = "${aws_subnet.solmines-private-subnet2.id}"
    route_table_id = "${aws_route_table.solmines-private-crt.id}"
}