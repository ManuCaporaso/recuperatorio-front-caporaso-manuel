import type { Task } from './TaskModel'

export interface TaskState {
  loading: boolean
  data: Task[]
}
