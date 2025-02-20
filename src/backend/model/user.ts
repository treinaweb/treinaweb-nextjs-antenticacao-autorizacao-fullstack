export enum Role {
  EDITOR = "editor",
  ADMIN = "admin"
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}