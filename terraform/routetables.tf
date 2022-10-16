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

# Create custom route table for private subnet
resource "aws_route_table" "solmines-private-crt" {
    vpc_id = "${aws_vpc.solmines-vpc.id}"
    
    tags = {
        Name = "solmines-private-crt"
    }
}

# Associate public route table and public subnet 
resource "aws_route_table_association" "solmines-crta-public-subnet"{
    subnet_id = "${aws_subnet.solmines-public-subnet.id}"
    route_table_id = "${aws_route_table.solmines-public-crt.id}"
}

# Associate private route table and private subnet 
resource "aws_route_table_association" "solmines-crta-private-subnet"{
    subnet_id = "${aws_subnet.solmines-private-subnet.id}"
    route_table_id = "${aws_route_table.solmines-private-crt.id}"
}