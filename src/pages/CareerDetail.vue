<template>
  <main class="min-h-screen bg-gray-50 py-10">
    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

      <!-- Breadcrumb -->
      <div class="mb-8">
        <router-link to="/careers"
          class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors rounded-md">
          <ArrowLeftIcon class="mr-2 h-5 w-5" />
          <span class="font-semibold">Back to Careers</span>
        </router-link>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <div class="inline-flex items-center justify-center space-x-4">
          <div
            class="animate-spin rounded-full h-8 w-8 border-4 border-t-[#e97006] border-r-[#97c01f] border-b-transparent border-l-transparent"
            aria-label="Loading spinner"></div>
          <span class="text-lg font-semibold text-gray-700">Loading career details...</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error || !career" class="text-center py-16">
        <p class="text-[#e97006] text-xl font-semibold mb-6">Career not found or failed to load.</p>
        <router-link to="/careers">
          <button
            class="bg-[#97c01f] hover:bg-[#7fae16] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
            Back to Careers
          </button>
        </router-link>
      </div>

      <!-- Career Details -->
      <div v-else>
        <!-- Header -->
        <div class="mb-10 flex items-center gap-6">
          <img :src="imageUrl" :alt="career.name"
            class="w-20 h-24 object-cover rounded-xl shadow-md border border-gray-200" @error="handleImageError" />
          <div>
            <h1 class="text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
              {{ career.name }}
            </h1>
            <p class="text-xl text-gray-600 mb-3">{{ getCareerSector(career.name) }}</p>
            <div v-if="career.is_popular === 1"
              class="inline-flex items-center gap-2 bg-[#97c01f] text-white px-4 py-1 rounded-full text-sm font-semibold select-none">
              <StarIcon class="h-5 w-5" />
              Popular Career
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <section v-if="career.overview" class="bg-white rounded-2xl shadow-lg p-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-[#e97006] pb-2">Career Overview</h2>
              <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ career.overview }}</p>
            </section>

            <section v-if="career.why_this" class="bg-white rounded-2xl shadow-lg p-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-[#97c01f] pb-2">Why Choose This Career?
              </h2>
              <ul class="space-y-4 list-none">
                <li v-for="(item, index) in career.why_this.split('.').filter(i => i.trim())" :key="index"
                  class="flex items-start gap-3">
                  <CheckCircleIcon class="h-6 w-6 text-[#e97006] flex-shrink-0 mt-1" />
                  <p class="text-gray-700">{{ item.trim() }}.</p>
                </li>
              </ul>
            </section>

            <section v-if="career.requirement" class="bg-white rounded-2xl shadow-lg p-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-[#e97006] pb-2">Requirements &
                Qualifications</h2>
              <ul class="space-y-3 list-none">
                <li v-for="(item, index) in career.requirement.split(';').filter(i => i.trim())" :key="index"
                  class="flex items-start gap-3">
                  <span class="w-3 h-3 bg-[#97c01f] rounded-full mt-2 flex-shrink-0"></span>
                  <p class="text-gray-700">{{ item.trim() }}</p>
                </li>
              </ul>
            </section>
          </div>

          <!-- Sidebar -->
          <aside class="space-y-10">
            <section class="bg-white rounded-2xl shadow-lg p-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">Career Information</h3>
              <div class="space-y-6">
                <div class="flex items-center gap-4">
                  <BriefcaseIcon class="h-6 w-6 text-[#e97006]" />
                  <div>
                    <p class="font-semibold text-gray-900">Career Field</p>
                    <p class="text-gray-600">{{ getCareerSector(career.name) }}</p>
                  </div>
                </div>

                <div v-if="career.salary" class="flex items-center gap-4">
                  <CurrencyDollarIcon class="h-6 w-6 text-[#97c01f]" />
                  <div>
                    <p class="font-semibold text-gray-900">Expected Salary</p>
                    <p class="text-gray-600">{{ career.salary }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <ClockIcon class="h-6 w-6 text-[#e97006]" />
                  <div>
                    <p class="font-semibold text-gray-900">Status</p>
                    <p class="text-gray-600">{{ career.status === 1 ? 'Active' : 'Inactive' }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <HashtagIcon class="h-6 w-6 text-[#97c01f]" />
                  <div>
                    <p class="font-semibold text-gray-900">Serial Number</p>
                    <p class="text-gray-600">#{{ career.serial_no }}</p>
                  </div>
                </div>
              </div>
            </section>

            <section class="bg-white rounded-2xl shadow-lg p-8 text-center">
              <h3 class="text-xl font-semibold mb-4">Interested in This Career?</h3>
              <p class="text-gray-600 mb-6">Get personalized guidance from our experts</p>
              <button
                class="w-full mb-4 rounded-xl bg-[#e97006] hover:bg-[#cf6004] text-white px-5 py-3 font-semibold transition">
                Find Related Courses
              </button>
              <button
                class="w-full rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-3 font-semibold transition">
                Book Career Consultation
              </button>
            </section>
          </aside>
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