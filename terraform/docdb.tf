####
# Database Declarations
####

resource "aws_docdb_subnet_group" "solmines-docdb-subnet-group" {
  subnet_ids = ["${aws_subnet.solmines-private-subnet1.id}", "${aws_subnet.solmines-private-subnet2.id}"]
}

resource "aws_docdb_cluster" "service" {
  skip_final_snapshot     = true
  db_subnet_group_name    = "${aws_docdb_subnet_group.solmines-docdb-subnet-group.name}"
  cluster_identifier      = "solmines-docdb-cluster"
  engine                  = "docdb"
  master_username         = "solmines_admin"
  master_password         = "JU49dbdnd9pPa52wJEQ6jyMLA2PkrwBwqT4ScTbDd9k87ZWRc2N4kfikqCW9pDhG"
  vpc_security_group_ids = ["${aws_security_group.solmines-database.id}"]
}