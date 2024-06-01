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

variable "availability_zone" {
  description = "The availability zone where the resources will reside."
  type        = string
  default     = "us-east-1a"
}

