<template>
  <main class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <div class="mb-6">
        <router-link to="/careers">
          <button class="mb-4 rounded flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeftIcon class="mr-2 h-4 w-4" />
            Back to Careers
          </button>
        </router-link>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-flex items-center">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
          <span class="text-lg text-gray-600">Loading career details...</span>
        </div>
      </div>

      <div v-else-if="error || !career" class="text-center py-12">
        <p class="text-red-600 mb-4">Career not found or failed to load.</p>
        <router-link to="/careers">
          <button class="bg-blue-600 rounded hover:bg-blue-700 text-white px-4 py-2">
            Back to Careers
          </button>
        </router-link>
      </div>

      <div v-else>
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center mb-4">
            <img :src="imageUrl" :alt="career.name" class="w-16 h-20 object-fit rounded-xl mr-4"
              @error="handleImageError" />
            <div>
              <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ career.name }}</h1>
              <p class="text-xl text-gray-600">{{ getCareerSector(career.name) }}</p>
              <div v-if="career.is_popular === 1" class="mt-2">
                <span
                  class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center w-fit">
                  <StarIcon class="h-4 w-4 mr-1" />
                  Popular Career
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-6">
            <div v-if="career.overview" class="bg-white rounded-xl shadow-lg p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Career Overview</h2>
              <p class="text-gray-700 leading-relaxed">{{ career.overview }}</p>
            </div>

            <div v-if="career.why_this" class="bg-white rounded-xl shadow-lg p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Why Choose This Career?</h2>
              <div class="space-y-3">
                <div v-for="(item, index) in career.why_this.split('.').filter(item => item.trim())" :key="index"
                  class="flex items-start">
                  <CheckCircleIcon class="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p class="text-gray-700">{{ item.trim() }}.</p>
                </div>
              </div>
            </div>

            <div v-if="career.requirement" class="bg-white rounded-xl shadow-lg p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Requirements & Qualifications</h2>
              <div class="space-y-3">
                <div v-for="(item, index) in career.requirement.split(';').filter(item => item.trim())" :key="index"
                  class="flex items-start">
                  <div class="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <p class="text-gray-700">{{ item.trim() }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Career Information</h3>
              <div class="space-y-4">
                <div class="flex items-center">
                  <BriefcaseIcon class="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p class="font-medium">Career Field</p>
                    <p class="text-gray-600">{{ getCareerSector(career.name) }}</p>
                  </div>
                </div>

                <div v-if="career.salary" class="flex items-center">
                  <CurrencyDollarIcon class="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p class="font-medium">Expected Salary</p>
                    <p class="text-gray-600">{{ career.salary }}</p>
                  </div>
                </div>

                <div class="flex items-center">
                  <ClockIcon class="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p class="font-medium">Status</p>
                    <p class="text-gray-600">{{ career.status === 1 ? 'Active' : 'Inactive' }}</p>
                  </div>
                </div>

                <div class="flex items-center">
                  <HashtagIcon class="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p class="font-medium">Serial Number</p>
                    <p class="text-gray-600">#{{ career.serial_no }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
              <div class="text-center">
                <h3 class="text-lg font-semibold mb-3">Interested in This Career?</h3>
                <p class="text-gray-600 mb-4">Get personalized guidance from our experts</p>
                <button
                  class="w-full mb-3 rounded bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 transition-colors">
                  Find Related Courses
                </button>
                <button
                  class="w-full border rounded border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 transition-colors">
                  Book Career Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeftIcon, BriefcaseIcon, CheckCircleIcon, CurrencyDollarIcon, ClockIcon, StarIcon, HashtagIcon } from '@heroicons/vue/24/outline'
import { useApi, type FutureCareer } from '../composables/useApi'

const route = useRoute()
const { loading, error, fetchFutureCareerById } = useApi()

const career = ref<FutureCareer | null>(null)

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
  if (!career.value) return "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
  return career.value.image
    ? (career.value.image.startsWith('/') ? `https://ehlcrm.theskyroute.com${career.value.image}` : career.value.image)
    : "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
})

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
}

const fetchData = async () => {
  const id = parseInt(route.params.id as string)
  if (id) {
    const data = await fetchFutureCareerById(id)
    if (data) {
      career.value = data
    }
  }
}

onMounted(fetchData)
</script>