<template>
  <main class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <div class="mb-6">
        <router-link to="/subjects">
          <button class="mb-4 flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeftIcon class="mr-2 h-4 w-4" />
            Back to Subjects
          </button>
        </router-link>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-flex items-center">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mr-3"></div>
          <span class="text-lg text-gray-600">Loading subject details...</span>
        </div>
      </div>

      <div v-else-if="error || !subject" class="text-center py-12">
        <p class="text-red-600 mb-4">Subject not found or failed to load.</p>
        <router-link to="/subjects">
          <button class="bg-[#23c465] hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            Back to Subjects
          </button>
        </router-link>
      </div>

      <div v-else>
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center mb-4">
            <div
              class="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
              <BookOpenIcon class="text-white text-2xl w-8 h-8" />
            </div>
            <div>
              <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ subject.subject_area }}</h1>
              <p class="text-xl text-gray-600">{{ subject.subject_area_department?.name }}</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-6">
            <div v-if="subject.overview" class="bg-white rounded-xl shadow-lg p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p class="text-gray-700 leading-relaxed">{{ subject.overview }}</p>
            </div>

            <div v-if="subject.why_this" class="bg-white rounded-xl shadow-lg p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Why Choose This Subject?</h2>
              <div class="space-y-3">
                <div v-for="(item, index) in subject.why_this.split('.').filter(item => item.trim())" :key="index"
                  class="flex items-start">
                  <CheckCircleIcon class="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <p class="text-gray-700">{{ item.trim() }}.</p>
                </div>
              </div>
            </div>

            <div v-if="subject.requirement" class="bg-white rounded-xl shadow-lg p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
              <div class="space-y-3">
                <div v-for="(item, index) in subject.requirement.split(';').filter(item => item.trim())" :key="index"
                  class="flex items-start">
                  <div class="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <p class="text-gray-700">{{ item.trim() }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Quick Information</h3>
              <div class="space-y-4">
                <div class="flex items-center">
                  <BookOpenIcon class="h-5 w-5 text-green-500 mr-3" />
                  <div>
                    <p class="font-medium">Department</p>
                    <p class="text-gray-600">{{ subject.subject_area_department?.name }}</p>
                  </div>
                </div>

                <div v-if="subject.tuition_fee" class="flex items-center">
                  <CurrencyDollarIcon class="h-5 w-5 text-green-500 mr-3" />
                  <div>
                    <p class="font-medium">Tuition Fee</p>
                    <p class="text-gray-600">{{ subject.tuition_fee }}</p>
                  </div>
                </div>

                <div class="flex items-center">
                  <ClockIcon class="h-5 w-5 text-green-500 mr-3" />
                  <div>
                    <p class="font-medium">Status</p>
                    <p class="text-gray-600">{{ subject.status === 1 ? 'Active' : 'Inactive' }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
              <div class="text-center">
                <h3 class="text-lg font-semibold mb-3">Ready to Get Started?</h3>
                <p class="text-gray-600 mb-4">Find courses related to this subject</p>
                <button
                  class="w-full mb-3 bg-[#23c465] hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Find Courses
                </button>
                <button
                  class="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                  Book Consultation
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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeftIcon, BookOpenIcon, CheckCircleIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/vue/24/outline'
import { useApi, type SubjectArea } from '../composables/useApi'

const route = useRoute()
const { loading, error, fetchSubjectAreaById } = useApi()

const subject = ref<SubjectArea | null>(null)

const fetchData = async () => {
  const id = parseInt(route.params.id as string)
  if (id) {
    const data = await fetchSubjectAreaById(id)
    if (data) {
      subject.value = data
    }
  }
}

onMounted(fetchData)
</script>