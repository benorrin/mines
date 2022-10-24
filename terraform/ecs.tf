####
# ECS Declarations
####

resource "aws_ecs_cluster" "solmines-ecs-cluster" {
  name = "solmines-ecs-cluster"
}

resource "aws_ecs_service" "solmines-ecs-service" {
  name            = "solmines"
  cluster         = aws_ecs_cluster.solmines-ecs-cluster.id
  task_definition = aws_ecs_task_definition.solmines-ecs-task-definition.arn
  launch_type     = "FARGATE"
  desired_count = 1

  network_configuration {
    security_groups  = [aws_security_group.solmines-ecs.id]
    subnets          = ["${aws_subnet.solmines-public-subnet1.id}", "${aws_subnet.solmines-public-subnet1.id}"]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.solmines-lb-tg.arn
    container_name   = "solmines"
    container_port   = 80
  }
}

resource "aws_ecs_task_definition" "solmines-ecs-task-definition" {
  family                   = "solmines-ecs-task-definition"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  memory                   = "1024"
  cpu                      = "512"
  execution_role_arn       = "${aws_iam_role.solmines-ecs-role.arn}"
  container_definitions    = <<EOF
[
  {
    "name": "solmines",
    "image": "${aws_ecr_repository.solmines-ecr-repository.repository_url}:latest",
    "memory": 1024,
    "cpu": 512,
    "essential": true,
    "portMappings": [
      {
        "containerPort": 80,
        "hostPort": 80
      }
    ]
  }
]
EOF
}