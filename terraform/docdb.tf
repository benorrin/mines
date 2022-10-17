####
# Database Declarations
####

resource "aws_docdb_subnet_group" "solmines-docdb-subnet-group" {
  subnet_ids = ["${aws_subnet.solmines-private-subnet1.id}", "${aws_subnet.solmines-private-subnet2.id}"]
}

resource "aws_docdb_cluster" "solmines-docdb-cluster" {
  skip_final_snapshot     = true
  db_subnet_group_name    = "${aws_docdb_subnet_group.solmines-docdb-subnet-group.name}"
  cluster_identifier      = "solmines-docdb-cluster"
  engine                  = "docdb"
  master_username         = "${var.db_username}"
  master_password         = "${var.db_password}"
  vpc_security_group_ids = ["${aws_security_group.solmines-database.id}"]
}