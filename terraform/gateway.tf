####
# Internet Gateway Declaration
####

resource "aws_internet_gateway" "solmines-igw" {
    vpc_id = "${aws_vpc.solmines-vpc.id}"

    tags = {
        Name = "solmines-igw"
    }
}