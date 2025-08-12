<template>
  <main>
    <!-- Hero Section -->
    <section class="relative bg-white text-gray-900">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <!-- Left Content -->
          <div class="lg:col-span-6">
            <span class="inline-block text-sm font-semibold text-[#97c01f] mb-3 uppercase tracking-wide">
              Your Path to Success
            </span>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Plan Your Future Career
              <span class="block text-[#e97006]">with Our Expert Consultants</span>
            </h1>

            <p class="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
              Our experienced consultants guide you every step of the way to choose the perfect career path tailored to
              your goals.
            </p>

            <div class="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                class="flex items-center gap-2 bg-[#e97006] text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-[#cf6004] transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 14v7" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 21h14" />
                </svg>
                Book Consultation
              </button>

              <button
                class="flex items-center gap-2 border-2 border-[#97c01f] text-[#97c01f] font-semibold px-6 py-3 rounded-xl hover:bg-[#97c01f] hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4" />
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                </svg>
                Explore Subjects
              </button>
            </div>
          </div>

          <!-- Right Image Card -->
          <div class="lg:col-span-6">
            <div class="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&h=1080"
                alt="Students studying together" class="w-full h-72 lg:h-[400px] object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>
            </div>
          </div>

        </div>
      </div>
    </section>



    <!-- Search and Filter Section -->
    <section class="pt-16 bg-white">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div class="text-center">
          <h2 class="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
            Explore Popular Career Paths
          </h2>
          <p class="text-lg lg:text-xl text-gray-600 max-w-xl mx-auto">
            Discover in-demand careers and unlock exciting opportunities for your future.
          </p>
        </div>

        <!-- Search Bar -->
        <!-- <div class="relative max-w-2xl mx-auto mb-10">
          <input v-model="searchQuery" type="search" placeholder="Search careers..." class="w-full pl-14 pr-5 py-2 border-2 border-gray-300 rounded-2xl text-lg font-medium placeholder-gray-400
               outline-none transition focus:border-[#e97006] focus:ring-4 focus:ring-[#e97006]/30"
            aria-label="Search careers" />
          <MagnifyingGlassIcon
            class="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#97c01f] h-6 w-6 pointer-events-none" />
        </div> -->

        <!-- Filter Buttons -->
        <!-- <div class="flex flex-wrap justify-center gap-5">
          <button v-for="category in categories" :key="category.id" @click="selectedCategory = category.id" :class="selectedCategory === category.id
            ? 'bg-[#e97006] text-white shadow-lg'
            : 'bg-gray-100 text-gray-800 hover:bg-[#97c01f] hover:text-white transition'"
            class="px-7 py-3 rounded-full font-semibold text-base transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e97006]"
            :aria-pressed="selectedCategory === category.id">
            {{ category.label }}
          </button>
        </div> -->
      </div>
    </section>


    <!-- Careers Grid -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-16">
          <div class="inline-flex items-center space-x-4 justify-center">
            <div
              class="animate-spin rounded-full h-8 w-8 border-4 border-t-[#e97006] border-r-[#97c01f] border-b-transparent border-l-transparent"
              aria-label="Loading spinner"></div>
            <span class="text-lg font-semibold text-gray-700">
              We are preparing most suitable data for you. Please wait a moment...
            </span>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-16">
          <p class="text-[#e97006] text-xl font-semibold mb-6">{{ error }}</p>
          <button @click="fetchData"
            class="bg-[#97c01f] hover:bg-[#7fae16] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
            Retry
          </button>
        </div>

        <!-- Careers Grid -->
        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <CareerCard v-for="career in filteredCareers" :key="career.id" :career="career" />
          </div>

          <!-- No Results -->
          <div v-if="filteredCareers.length === 0" class="text-center py-20">
            <p class="text-gray-500 text-lg italic">
              No careers found matching your criteria.
            </p>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center mt-16">
            <nav class="flex items-center space-x-3" aria-label="Pagination">
              <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                class="px-4 py-2 rounded-md text-[#e97006] font-semibold transition-colors hover:bg-[#e97006] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Previous Page">
                <ChevronLeftIcon class="h-5 w-5" />
              </button>

              <template v-for="page in getPageNumbers()" :key="page + '-btn'">
                <button v-if="page !== -1" @click="changePage(page)" :class="[
                  'px-5 py-2 rounded-md font-semibold transition-colors',
                  currentPage === page
                    ? 'bg-[#97c01f] text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                ]" :aria-current="page === currentPage ? 'page' : false">
                  {{ page }}
                </button>
                <span v-else class="px-3 text-gray-400 select-none" aria-hidden="true">…</span>
              </template>

              <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                class="px-4 py-2 rounded-md text-[#e97006] font-semibold transition-colors hover:bg-[#e97006] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Next Page">
                <ChevronRightIcon class="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { CalendarIcon, MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { useApi, type FutureCareer } from '../composables/useApi'
import CareerCard from '../components/cards/CareerCard.vue'

const { loading, error, fetchFutureCareers } = useApi()

const careers = ref<FutureCareer[]>([])
const currentPage = ref(1)
const totalPages = ref(1)
const searchQuery = ref('')
const selectedCategory = ref('all')

const categories = [
  { id: 'all', label: 'All Careers' },
  { id: 'technology', label: 'Technology' },
  { id: 'finance', label: 'Finance' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'engineering', label: 'Engineering' },
]

const filteredCareers = computed(() => {
  return careers.value.filter(career => {
    const matchesSearch = searchQuery.value === '' ||
      career.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      career.overview?.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory = selectedCategory.value === 'all' ||
      career.name.toLowerCase().includes(selectedCategory.value.toLowerCase()) ||
      career.overview?.toLowerCase().includes(selectedCategory.value.toLowerCase())

    return matchesSearch && matchesCategory
  })
})

const fetchData = async () => {
  const data = await fetchFutureCareers(currentPage.value)
  if (data) {
    careers.value = data.rows.data
    totalPages.value = data.rows.last_page
  }
}

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const getPageNumbers = () => {
  const pages: (number | -1)[] = []

  if (totalPages.value <= 7) {
    // Few pages — show all
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)

    // Show dots after first page if gap exists
    if (currentPage.value > 4) {
      pages.push(-1) // ...
    }

    // Middle window of 3 pages around current page
    const start = Math.max(2, currentPage.value - 1)
    const end = Math.min(totalPages.value - 1, currentPage.value + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Show dots before last page if gap exists
    if (currentPage.value < totalPages.value - 3) {
      pages.push(-1) // ...
    }

    // Always show last page
    pages.push(totalPages.value)
  }

  return pages
}


watch(currentPage, fetchData)

onMounted(fetchData)
</script>