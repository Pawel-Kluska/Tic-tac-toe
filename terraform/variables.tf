variable "aws_access_key" {
  description = "The IAM public access key"
}

variable "aws_secret_key" {
  description = "IAM secret access key"
}

variable "aws_session_token" {
  description = "Session token"
}

variable "aws_region" {
  description = "The AWS region things are created in"
}

variable "ec2_task_execution_role_name" {
  description = "ECS task execution role name"
  default     = "myEcsTaskExecutionRole"
}

variable "ecs_auto_scale_role_name" {
  description = "ECS auto scale role name"
  default     = "myEcsAutoScaleRole"
}

variable "az_count" {
  description = "Number of AZs to cover in a given region"
  default     = "2"
}

variable "app_count" {
  description = "Number of docker containers to run"
  default     = 3
}

variable "health_check_path" {
  default = "/"
}

variable "fargate_cpu" {
  description = "Fargate instance CPU units to provision (1 vCPU = 1024 CPU units)"
  default     = "4096"
}

variable "fargate_memory" {
  description = "Fargate instance memory to provision (in MiB)"
  default     = "8192"
}


variable "backend_image" {
  description = "Docker image to run in the ECS cluster"
  default     = "211125481775.dkr.ecr.us-east-1.amazonaws.com/tictactoe-backend"
}

variable "backend_port" {
  description = "Port exposed by the docker image to redirect traffic to"
  default     = 8080
}

variable "frontend_image" {
  description = "Docker image to run in the ECS cluster"
  default     = "211125481775.dkr.ecr.us-east-1.amazonaws.com/tictactoe-frontend"
}

variable "frontend_port" {
  description = "Port exposed by the docker image to redirect traffic to"
  default     = 80
}

variable "app_cpu" {
  description = "Fargate instance CPU units to provision (1 vCPU = 1024 CPU units)"
  default     = "1024"
}

variable "app_memory" {
  description = "Fargate instance memory to provision (in MiB)"
  default     = "2048"
}
// ?
data "aws_iam_role" "ecs_task_execution_role" {
  name = "labRole"
}
