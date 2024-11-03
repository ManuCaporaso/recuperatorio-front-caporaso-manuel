import { defineStore } from 'pinia'
import type { Task } from '@/models/TaskModel'
import type { TaskState } from '@/models/TaskState'

export const useTaskStore = defineStore('task', {
  state: (): TaskState => ({
    loading: false,
    data: [],
  }),
  actions: {
    addTask(newTask: Task) {
      this.data.push(newTask)
    },
    removeTask(taskToRemove: Task) {
      this.data = this.data.filter(task => task.id !== taskToRemove.id)
    },
    updateTaskStatus(taskToUpdate: Task) {
      const index = this.data.findIndex(task => task.id === taskToUpdate.id)
      if (index !== -1) {
        this.data[index].status = !this.data[index].status
      }
    },

    // METODOS OPCIONALES

    //Actualiza data para mostrar solo tareas con status completo
    showCompleted() {
      this.data = this.data.filter(task => task.status)
    },
    //Actualiza data para mostrar solo tareas con status pendiente
    showPending() {
      this.data = this.data.filter(task => !task.status)
    },
    //Actualiza data para mostrar todos los datos
    showAll() {
      this.data = [...this.data]
    },
  },
})
