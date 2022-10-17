####
# Variable Declarations
####

variable "region" {
  default = "us-east-1"
}

variable "db_username" {
  default = "solmines-admin"
  sensitive = true
}

variable "db_password" {
  default = "JEfuSzv9XXRnGShWagXHwuAuXesENACPvrx87WAKbbCy4HkX8Zz3HMUeMirx2xkt"
  sensitive = true
}