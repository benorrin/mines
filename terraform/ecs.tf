####
# ECS Declarations
####

resource "aws_ecs_cluster" "solmines-ecs-cluster" {
  name = "solmines-ecs-cluster"
}