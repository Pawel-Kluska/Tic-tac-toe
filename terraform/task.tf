resource "aws_ecs_task_definition" "task_definition" {
  family                   = "tictactoe_family"
  task_role_arn            = "arn:aws:iam::211125481775:role/LabRole"
  execution_role_arn       = "arn:aws:iam::211125481775:role/LabRole"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "1024"
  memory                   = "3072"
  runtime_platform {
    cpu_architecture        = "X86_64"
    operating_system_family = "LINUX"
  }

  container_definitions = jsonencode([
    {
      name      = "tictactoe-backend"
      image     = "211125481775.dkr.ecr.us-east-1.amazonaws.com/tictactoe-backend:latest"
      essential = true

      portMappings = [
        {
          containerPort = 8080
          hostPort      = 8080
          protocol      = "tcp"
          name          = "backend"
          appProtocol   = "http"
        }
      ]

      environment = [
        {
          name  = "CLIENT_ID"
          value = "78i4d1l8ouatghoueh5ja0h16l"
        },
        {
          name  = "CLIENT_SECRET"
          value = "1phuin4coqn4djiv14erd26gcbd18pl3224r01hh3tafji0ne4u1"
        },
        {
          name  = "AWS_ACCESS_KEY_ID"
          value = "ASIATCKAPGEXWOF62LHL"
        },
        {
          name  = "AWS_SECRET_ACCESS_KEY"
          value = "e+bU6hhiX5VvlEhbOuzXUuX1jkbe2yrKI+5t7pgO"
        },
        {
          name  = "AWS_SESSION_TOKEN"
          value = "IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJHMEUCIQDtdl5psGS7GyIEHlRPLGxHYONtqbvSE/2X9nGCxvcbvAIgB0aouebt2Me/htXCg/5qMCNHpbb7V7f+YlhdAQ9QPAgqsAIIj///////////ARAAGgwyMTExMjU0ODE3NzUiDGoWFuW5MBsfzWTM8iqEAjq58rJZ7Qn7GGD0ekv9A+uWNARI/8yfYn5SnGo4diPtNR838PZtmJ0rHuTrVdQupOfvLUHSkFxvLEhh8EXGkMOflmh/WXaAa/F+mmITd7B/YKNbSd+2TTJlXaeCDi5tWm4fYpYLsw4SdXUz7slqAqIHfWp75DNOmb+MFcEOj1/y2Qd2h803I+hGgik1sqg0ACmss9JpSbXHWTfiD29xECXgS2zeNVjaQgPRdDcqJ/AWhtu02JwGGtx/TZoMu8Mmt4REzWFAspLIWUlzen+TzmlpAaKHO+Pjh5q7VZ23x9ctcB89E6mkYEE53avm1wqzYdTrQgC5fEZtPMnyBI9vWwv39UD5MPqG97IGOp0BxNR4ulCSLoa0/SqS5G/JCfWGXtZQFQ9S1Mw0+SpMzLWXRXTqIbT9ZhuGkVcEf0uhOCkTsleiMmlx7/VJePwIfR/XW6dC2lgzXbYUk2ZB2On3GOzaPWPK0MUcKLOTfP6Vpj5d/WRVYaD8IlyYk7vVIbRCCl7jgt44z3rbTAOkwomyvP2PS7CjWBNECIHxp8Qc4RkuJmi+XpghwdpKkQ=="
        },
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options   = {
          awslogs-create-group  = "true"
          awslogs-group         = "/ecs/tictactoedeploy"
          awslogs-region        = "us-east-1"
          awslogs-stream-prefix = "ecs"
        }
      }
    },
    {
      name      = "tictactoe-frontend"
      image     = "211125481775.dkr.ecr.us-east-1.amazonaws.com/tictactoe-frontend:latest"
      essential = true

      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
          protocol      = "tcp"
          name          = "frontend"
          appProtocol   = "http"
        }
      ]
    }
  ])
}