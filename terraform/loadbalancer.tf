####
# Load Balancer Declarations
####

resource "aws_lb" "solmines-lb" {
  name               = "solmines-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.solmines-elb.id]
  subnets            = ["${aws_subnet.solmines-public-subnet1.id}", "${aws_subnet.solmines-public-subnet2.id}"]

  enable_deletion_protection = true
}

resource "aws_lb_target_group" "solmines-lb-tg" {
  name        = "solmines-lb-tg"
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.solmines-vpc.id
}
