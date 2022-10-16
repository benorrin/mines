####
# Database Declarations
####

resource "aws_docdb_subnet_group" "solmines-docdb-subnet-group" {
  subnet_ids = ["${aws_subnet.solmines-private-subnet.id}"]
}

resource "aws_docdb_cluster" "service" {
  skip_final_snapshot     = true
  db_subnet_group_name    = "${aws_docdb_subnet_group.solmines-docdb-subnet-group.name}"
  cluster_identifier      = "solmines-docdb-cluster"
  engine                  = "docdb"
  master_username         = "solmines_admin"
  master_password         = "z&8FRC65X6Q7G%j#hX$ucf$!tvEixR4S^hL#qMtpiA*dESd@bHH$qZ&k8gwG#$92"
  vpc_security_group_ids = ["${aws_security_group.solmines-database.id}"]
}