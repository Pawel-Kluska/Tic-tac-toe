resource "aws_ecs_task_definition" "deploy_ssl_terraform" {
  family                   = "deploy-ssl-terraform"
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
      cpu       = 0
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
          name  = "IP_ADDRESS"
          value = "https://12.32.23.1"
        },
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
          value = "ASIATCKAPGEX3AAJZWME"
        },
        {
          name  = "AWS_SECRET_ACCESS_KEY"
          value = "Jfnj59TRA7AvB6c3P+mLLdxTD+OlQ7nufWGW15D8"
        },
        {
          name  = "AWS_SESSION_TOKEN"
          value = "IQoJb3JpZ2luX2VjENT//////////wEaCXVzLXdlc3QtMiJGMEQCIDE0eD9Y7ya7Qe0znfFjUeDH6wo5BXm/o5s1YVnUmA85AiBS/YbsqS+R3hEgK1+iZu7ZUsc0k9i2iPW1RKMoYwHDDCqnAghdEAAaDDIxMTEyNTQ4MTc3NSIMzvn0Tvoq3NZnmL3tKoQCt2okjYIOHUu8rrX0OJ3b4iJ8AUZPEnPs3oDWFCqS15EbID8JcxzzpQHx9BctMKs1ZhcSIuGmpCa3iPG296khm9XE+tSSUwAcq65FpVH+Ug5d52zc2Fo7833U7OqpbkbgzfR+EQTRkZqJ6Gvwvvv6xMu7RRG+ZU8/qxbRJ4wESQav0OQKEungq7VUNr6Di958AEsQ10eieOebbTWowQ9Y6Socm11Xp84f+qLrQdUfLI6mmqV3rPOU3rJnjELFGG7NymVy9Gx6yZuGfDojStnEfAg1RiCncRjeEMe57sHoq41LGRb1GTo8dVQHINa9AtBWpSofAMLttLYJxu2ONHwVLGDQemgwt57ssgY6ngG8H2Yf3s/Uth/dkjFn2AN9ZGGtc46riL6GoXYYNWqEkmTCGK9ORKWNFCJ2TVVd03z1JPEdHWRKEYCsmLF+IegM+4v4rCgbjE5OkyN/v5ZpdT7Ji1j7SmV5MIfEruvXzqCf1haLEEgeehxDUpCk9xxH9ceV/TsSCaQ3AKSVf4X489vlZIvDtH+qEk2bo7t7PHkkwy47BV/nBc0qLRXeEQ=="
        },
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options   = {
          awslogs-create-group  = "true"
          awslogs-group         = "/ecs/deploy-ssl"
          awslogs-region        = "us-east-1"
          awslogs-stream-prefix = "ecs"
        }
      }
    },
    {
      name      = "tictactoe-frontend"
      image     = "211125481775.dkr.ecr.us-east-1.amazonaws.com/tictactoe-frontend:latest"
      cpu       = 0
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