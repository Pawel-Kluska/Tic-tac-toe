[
  {
    "name": "backend",
    "image": "${backend_image}",
    "cpu": ${app_cpu},
    "memory": ${app_memory},
    "essential": true,
    "networkMode": "awsvpc",
    "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/cb-app",
          "awslogs-region": "${aws_region}",
          "awslogs-stream-prefix": "ecs"
        }
    },
    "portMappings": [
      {
        "containerPort": ${backend_port},
        "hostPort": ${backend_port}
      }
    ],
    "environment": [
      { "name": "IP_ADDRESS", "value": "3.232.9.39" },
      { "name": "CLIENT_ID", "value": "78i4d1l8ouatghoueh5ja0h16l" },
      { "name": "CLIENT_SECRET", "value": "1phuin4coqn4djiv14erd26gcbd18pl3224r01hh3tafji0ne4u1" },
      { "name": "TOKEN_URL", "value": "https://pwr.auth.us-east-1.amazoncognito.com/oauth2/token" },
      { "name": "JWKS_URI", "value": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_sZOCd9c53/.well-known/jwks.json" },
      { "name": "AWS_REGION", "value": "us-east-1" },
      { "name": "AWS_ACCESS_KEY_ID", "value": "ASIATCKAPGEXTX4ASIPS" },
      { "name": "AWS_SECRET_ACCESS_KEY", "value": "Jlbvgg/dd/ZVouBldyjDIeoeT7JqEU0BShiqCQIQ" },
      { "name": "AWS_SESSION_TOKEN", "value": "IQoJb3JpZ2luX2VjELj//////////wEaCXVzLXdlc3QtMiJHMEUCIDEDFDCSHOcDG/oq0Ty5jEzNQHpNaA3BgchGznV7ZjnuAiEA6SgJ4+NaQ3udUlleJ/c5PGFqF17wwRWDSS+NuG3W8A0qpwIIQRAAGgwyMTExMjU0ODE3NzUiDKHRvjI13HuvIDvXbyqEAuhihWy4tAkwjp2o9JISWr7YF3dymm/WpNIAdJ2zRi+y8i5oZlgh2YEDtNkplbFY5AhR/YHzoTzKkcQwTOLMQfb64b+iaEwdt02FU2ACyaEeqLGb52yq8J23HzJtFO5qL3VOxWOnstbtUt24WL8XyjEL9j59Op8vLyWW33W38q9kdrQV3u7X0QUet2Vnp+NYtkobS5w0aefvYiQ196XgojQwMZ8VsHaCDVatUxe+xacYnFXj8f+VcnraVNfel/jO+GWGJRoH3wE7OCp43jkWQMKSvigG4Sspik9kVVAN66gFBsLz/5YOayAdG5I/9LadN1UmI/zYzbqU/hvDefnj0BfYv/frMJCL5rIGOp0BWnGdF6ilXxl+bV+gyaHWRshI+VksIBTn6qS+RgrZmIVUWG4CbExBZY47oxIDMbiStJZ0T0EeS5MZb9KsvHx14Ja1GC2/wqWxqHzG2Bm1NBoCpvWwPuTgsTj3EtYPNceljoqm9vUhLIrg1jl+7o/QITnqqGZvHCdipuZh+XfLIlVSPawd82OmaJ/EgweK47Yu40wK2NdZ6vY8M4WSxQ==" }
    ]
  },
  {
    "name": "frontend",
    "image": "${frontend_image}",
    "cpu": ${app_cpu},
    "memory": ${app_memory},
    "essential": true,
    "networkMode": "awsvpc",
    "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/cb-app",
          "awslogs-region": "${aws_region}",
          "awslogs-stream-prefix": "ecs"
        }
    },
    "portMappings": [
      {
        "containerPort": ${frontend_port},
        "hostPort": ${frontend_port}
      }
    ],
    "environment": [
      { "name": "VITE_PUBLIC_IP", "value": "3.232.9.39" }
    ]
  }
]
