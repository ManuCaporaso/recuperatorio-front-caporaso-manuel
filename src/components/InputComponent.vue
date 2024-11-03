<script setup lang="ts">
import { useThemeStore } from '@/stores/ThemeStore'
import { useTaskStore } from '@/stores/TaskStore'
import type { Task } from '@/models/TaskModel'
import { reactive } from 'vue'

// iconos
import { XMarkIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon as SolidCircleIcon } from '@heroicons/vue/24/solid'

// definir variable para almacenar useThemeStore
const themeStore = useThemeStore()
const theme = reactive(themeStore)

// definir variable para almacenar useTaskStore
const taskStore = useTaskStore()

// definir objeto reactivo para la nueva tarea
const reactiveTask = reactive<Task>({
  id: 0,
  tarea: '',
  status: false,
})

// función para alternar el estado de completado de la tarea
function makeItComplete() {
  reactiveTask.status = !reactiveTask.status
}

// función para guardar la tarea y reiniciar el objeto
function saveTask() {
  if (reactiveTask.tarea === '') {
    // Aquí puedes agregar un mensaje de error o alerta si la tarea está vacía
    console.warn('La tarea no puede estar vacía')
    return // Salir si la tarea está vacía
  }

  // Agregar la tarea al store
  taskStore.addTask({ ...reactiveTask })

  // Reactive con id para que se pueda borrar por tarea individual
  reactiveTask.id = Date.now()

  // Reiniciar el objeto para agregar nuevas tareas
  reactiveTask.tarea = ''
  reactiveTask.status = false
}
</script>

<template>
  <div class="wrapper relative group border-black">
    <div class="absolute top-3 sm:top-4 left-5">
      <div class="relative">
        <input
          v-if="!reactiveTask.status"
          @click="makeItComplete"
          type="checkbox"
          class="form-checkbox border rounded-full focus:outline-none h-6 w-6 cursor-pointer transition ease-linear"
        />
        <!-- usar directiva v-if para mostrar si es tarea completa -->
        <!-- agregar directiva @click para llamar al metodo para completar tarea -->
        <SolidCircleIcon
          v-if="reactiveTask.status"
          @click="makeItComplete"
          class="h-6 w-6 absolute left-0 top-0 text-green-500 cursor-pointer"
        />
      </div>
    </div>

    <!-- input -->
    <form @submit.prevent="saveTask">
      <div class="flex items-center">
        <!-- input: usar v-bind para definir si es modo oscuro -->
        <!-- usar v-model para pasar los datos de la nueva tarea -->
        <input
          v-model="reactiveTask.tarea"
          :class="theme.isDark ? 'dark' : ''"
          type="text"
          placeholder="Escribe una nueva tarea"
          class="sm:text-base overflow-ellipsis w-full focus:outline-none py-4 sm:py-4.5 pr-8 pl-14 sm:pl-16 cursor-pointer transition ease-linear"
        />

        <!-- div: usar v-bind para definir si es modo oscuro -->
        <div
          :class="theme.isDark ? 'dark' : ''"
          class="btns absolute right-0 top-0 py-2 sm:py-2.5 px-2 w-20 h-14 flex justify-around cursor-default transition ease-linear"
        >
          <button type="button" @click="saveTask" class="p-1 cursor-pointer">
            <!-- usar @click para usar metodo de guardar tareas -->
            <PlusCircleIcon class="w-6 h-6 hover:text-green-600" />
          </button>
          <button type="button" @click="reactiveTask.tarea = ''">
            <XMarkIcon class="w-6 h-6 hover:text-red-500" />
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
input[type='text'] {
  border-radius: 5px;
}

.btns {
  background: rgb(190, 190, 190);
  border-radius: 0 5px 5px 0;
}

input.dark {
  background: #434343;
  color: rgb(190, 190, 190);
}

.btns.dark {
  background: rgb(101, 101, 101);
}
</style>
