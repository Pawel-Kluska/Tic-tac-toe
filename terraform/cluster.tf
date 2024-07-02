resource "aws_ecs_cluster" "cluster" {
  name = "tictactoe-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_ecs_service" "ecs_service" {
  name            = "tic-tac-toe-service"
  cluster         = aws_ecs_cluster.cluster.name
  task_definition = aws_ecs_task_definition.task_definition.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = [aws_subnet.subnet.id]
    security_groups = [aws_security_group.security_group.id]
    assign_public_ip = true
  }

  deployment_controller {
    type = "ECS"
  }

}