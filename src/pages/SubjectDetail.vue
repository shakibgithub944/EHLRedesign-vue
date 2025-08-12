<template>
  <main class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

      <!-- Breadcrumb -->
      <div class="mb-8">
        <router-link to="/subjects"
          class="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors rounded-md">
          <ArrowLeftIcon class="mr-2 h-5 w-5" />
          <span class="font-semibold">Back to Subjects</span>
        </router-link>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <div class="inline-flex items-center justify-center space-x-4">
          <div
            class="animate-spin rounded-full h-8 w-8 border-4 border-t-[#e97006] border-r-[#97c01f] border-b-transparent border-l-transparent"
            aria-label="Loading spinner"></div>
          <span class="text-lg font-semibold text-gray-700">Loading subject details...</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error || !subject" class="text-center py-16">
        <p class="text-[#e97006] text-xl font-semibold mb-6">Subject not found or failed to load.</p>
        <router-link to="/subjects">
          <button
            class="bg-[#97c01f] hover:bg-[#7fae16] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
            Back to Subjects
          </button>
        </router-link>
      </div>

      <!-- Subject Details -->
      <div v-else>
        <!-- Header -->
        <div class="mb-10 flex items-center gap-6">
          <div
            class="w-20 h-20 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#97c01f] to-[#e97006] shadow-lg">
            <BookOpenIcon class="text-white w-10 h-10" />
          </div>
          <div>
            <h1 class="text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
              {{ subject.subject_area }}
            </h1>
            <p class="text-xl text-gray-600">{{ subject.subject_area_department?.name }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <!-- Main Content -->
          <section class="lg:col-span-2 space-y-8">
            <div v-if="subject.overview" class="bg-white rounded-2xl shadow-lg p-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-[#e97006] pb-2">Overview</h2>
              <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ subject.overview }}</p>
            </div>

            <div v-if="subject.why_this" class="bg-white rounded-2xl shadow-lg p-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-[#97c01f] pb-2">Why Choose This
                Subject?</h2>
              <ul class="space-y-4 list-none">
                <li v-for="(item, index) in subject.why_this.split('.').filter(i => i.trim())" :key="index"
                  class="flex items-start gap-3">
                  <CheckCircleIcon class="h-6 w-6 text-[#e97006] flex-shrink-0 mt-1" />
                  <p class="text-gray-700">{{ item.trim() }}.</p>
                </li>
              </ul>
            </div>

            <div v-if="subject.requirement" class="bg-white rounded-2xl shadow-lg p-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-[#e97006] pb-2">Requirements</h2>
              <ul class="space-y-3 list-none">
                <li v-for="(item, index) in subject.requirement.split(';').filter(i => i.trim())" :key="index"
                  class="flex items-start gap-3">
                  <span class="w-3 h-3 bg-[#97c01f] rounded-full mt-2 flex-shrink-0"></span>
                  <p class="text-gray-700">{{ item.trim() }}</p>
                </li>
              </ul>
            </div>
          </section>

          <!-- Sidebar -->
          <aside class="space-y-10">
            <section class="bg-white rounded-2xl shadow-lg p-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">Quick Information</h3>
              <div class="space-y-6">
                <div class="flex items-center gap-4">
                  <BookOpenIcon class="h-6 w-6 text-[#97c01f]" />
                  <div>
                    <p class="font-semibold text-gray-900">Department</p>
                    <p class="text-gray-600">{{ subject.subject_area_department?.name }}</p>
                  </div>
                </div>

                <div v-if="subject.tuition_fee" class="flex items-center gap-4">
                  <CurrencyDollarIcon class="h-6 w-6 text-[#97c01f]" />
                  <div>
                    <p class="font-semibold text-gray-900">Tuition Fee</p>
                    <p class="text-gray-600">{{ subject.tuition_fee }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <ClockIcon class="h-6 w-6 text-[#97c01f]" />
                  <div>
                    <p class="font-semibold text-gray-900">Status</p>
                    <p class="text-gray-600">{{ subject.status === 1 ? 'Active' : 'Inactive' }}</p>
                  </div>
                </div>
              </div>
            </section>

            <section class="bg-white rounded-2xl shadow-lg p-8 text-center">
              <h3 class="text-xl font-semibold mb-4">Ready to Get Started?</h3>
              <p class="text-gray-600 mb-6">Find courses related to this subject</p>
              <button
                class="w-full mb-4 rounded-xl bg-[#97c01f] hover:bg-[#7fae16] text-white px-5 py-3 font-semibold transition">
                Find Courses
              </button>
              <button
                class="w-full rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-3 font-semibold transition">
                Book Consultation
              </button>
            </section>
          </aside>
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