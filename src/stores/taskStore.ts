import { defineStore } from 'pinia';
import type { Task } from '@/models/Task.ts';
import type { TaskState } from '@/models/TaskState.ts';

export const useTaskStore = defineStore('task', {
  state: (): TaskState => ({
    loading: false,
    data: [],
  }),
  actions: {
    addTask(newTask: Task) {
      this.data.push(newTask);
    },
    removeTask(taskToRemove: Task) {
      this.data = this.data.filter(task => task.id !== taskToRemove.id);
    },
    updateTaskStatus(taskToUpdate: Task) {
      const index = this.data.findIndex(task => task.id === taskToUpdate.id);
      if (index !== -1) {
        this.data[index].status = taskToUpdate.status;
      }
    },
  },
});