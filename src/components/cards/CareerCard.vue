<template>
  <div
    class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
    <div class="relative">
      <img :src="imageUrl" :alt="career.name" class="w-full h-48 object-contain rounded-t-xl"
        @error="handleImageError" />
      <div v-if="career.is_popular === 1" class="absolute top-4 right-4">
        <span class="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
          <StarIcon class="h-3 w-3 mr-1" />
          Popular
        </span>
      </div>
    </div>
    <div class="p-6">
      <h3 class="text-xl font-semibold text-gray-900 mb-2">
        {{ career.name }}
      </h3>
      <p class="text-gray-600 mb-4 text-sm line-clamp-3">
        {{ career.overview || 'Explore this exciting career opportunity and discover the path to professional success.'
        }}
      </p>
      <div class="flex justify-between items-center">
        <span class="text-[#23c465] font-medium text-sm">
          {{ getCareerSector(career.name) }}
        </span>
        <router-link :to="`/career/${career.id}`">
          <button
            class="text-blue-600 rounded hover:text-blue-700 font-medium text-sm transition-colors p-0 h-auto flex items-center">
            Learn More
            <ArrowRightIcon class="ml-1 h-4 w-4" />
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRightIcon, StarIcon } from '@heroicons/vue/24/outline'
import type { FutureCareer } from '../../composables/useApi'

interface Props {
  career: FutureCareer
}

const props = defineProps<Props>()

const getCareerSector = (careerName: string) => {
  const name = careerName.toLowerCase()
  if (name.includes('accountant') || name.includes('financial')) return 'Finance Sector'
  if (name.includes('architect')) return 'Design & Construction'
  if (name.includes('engineer')) return 'Engineering'
  if (name.includes('data') || name.includes('scientist')) return 'Technology'
  if (name.includes('doctor')) return 'Healthcare'
  if (name.includes('lawyer')) return 'Legal Services'
  if (name.includes('marketing')) return 'Business & Marketing'
  return 'Professional Services'
}

const imageUrl = computed(() => {
  return props.career.image
    ? (props.career.image.startsWith('/') ? `https://ehlcrm.theskyroute.com${props.career.image}` : props.career.image)
    : "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
})

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
}
</script>