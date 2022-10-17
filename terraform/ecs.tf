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
    subnets          = ["${aws_subnet.solmines-public-subnet.id}"]
    assign_public_ip = true
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
    "image": "${aws_ecr_repository.solmines-ecr-repository.arn}:latest",
    "memory": 1024,
    "cpu": 512,
    "essential": true,
    "entryPoint": ["/"],
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