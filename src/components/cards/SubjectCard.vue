<template>
  <router-link :to="`/subject/${subject.id}`">
    <div
      class="bg-white h-52 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
      <div class="p-6">
        <div
          :class="`w-16 h-16 bg-gradient-to-br ${gradientClass} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`">
          <component :is="getSubjectIcon(subject.subject_area)" class="text-white text-2xl w-8 h-8" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">
          {{ subject.subject_area }}
        </h3>
        <p class="text-gray-600 mb-4 text-sm">
          {{ subject.subject_area_department?.name || 'Department' }}
        </p>
        <div class="flex justify-between items-center">
          <div class=""></div>
          <!-- <button class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm transition-colors">
          Find Courses
        </button> -->
          <!-- <router-link :to="`/subject/${subject.id}`">
          <button
            class="text-[#23c465] hover:text-green-700 font-medium text-sm transition-colors p-0 h-auto flex items-center">
            Learn More
            <ArrowRightIcon class="ml-1 h-4 w-4" />
          </button>
        </router-link> -->

        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRightIcon, CalculatorIcon, ChartBarIcon, RocketLaunchIcon, HomeIcon, CogIcon, UserGroupIcon, StarIcon } from '@heroicons/vue/24/outline'
import type { SubjectArea } from '../../composables/useApi'

interface Props {
  subject: SubjectArea
}

const props = defineProps<Props>()

const getSubjectIcon = (subjectName: string) => {
  const name = subjectName.toLowerCase()
  if (name.includes('accounting')) return CalculatorIcon
  if (name.includes('actuarial')) return ChartBarIcon
  if (name.includes('aerospace')) return RocketLaunchIcon
  if (name.includes('agriculture')) return HomeIcon
  if (name.includes('architecture')) return HomeIcon
  if (name.includes('artificial') || name.includes('ai')) return CogIcon
  if (name.includes('anthropology')) return UserGroupIcon
  if (name.includes('astronomy')) return StarIcon
  return CalculatorIcon // Default icon
}

const gradientClass = computed(() => {
  const gradients = [
    'from-green-500 to-blue-600',
    'from-purple-500 to-indigo-500',
    'from-blue-600 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-amber-500 to-orange-500',
    'from-red-500 to-pink-500',
    'from-teal-500 to-green-500',
    'from-indigo-500 to-purple-500',
  ]
  return gradients[props.subject.id % gradients.length]
})
</script>