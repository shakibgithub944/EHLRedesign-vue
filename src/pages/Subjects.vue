<template>
  <main>
    <!-- Hero Section -->
    <section class="text-white py-16 lg:py-24 relative overflow-hidden bg-gradient-to-br from-green-500 to-blue-600">
      <div class="absolute inset-0 bg-cover bg-center opacity-20"
        style="background-image: url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')">
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl lg:text-5xl font-bold mb-6">Find Most Popular Subjects to Study</h1>
            <p class="text-xl mb-8 text-green-50">Our expert consultants will guide you in choosing the best academic
              and career path, ensuring you make informed decisions for a successful future.</p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                class="bg-white text-[#23c465] hover:bg-gray-50 px-6 py-3 rounded-lg font-medium text-lg flex items-center">
                <CalendarIcon class="mr-2 h-5 w-5" />
                Book Free Consultation
              </button>
            </div>
          </div>
          <div class="hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080"
              alt="Hero illustration" class="w-full h-64 lg:h-80 object-cover rounded-xl shadow-2xl" />
          </div>
        </div>
      </div>
    </section>

    <!-- Search and Filter Section -->
    <section class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Explore Popular Subjects</h2>
          <p class="text-xl text-gray-600">Discover the top subjects chosen by students worldwide.</p>
        </div>

        <!-- Search Bar -->
        <div class="relative max-w-2xl mx-auto mb-8">
          <input v-model="searchQuery" type="text" placeholder="Search subjects..."
            class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl outline-none transition-all text-lg focus:border-green-500 focus:ring-green-100" />
          <MagnifyingGlassIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>

        <!-- Filter Buttons -->
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button v-for="category in categories" :key="category.id" @click="selectedCategory = category.id"
            class="px-6 py-2 rounded-full font-medium transition-colors" :class="selectedCategory === category.id
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700'">
            {{ category.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Subjects Grid -->
    <section class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="loading" class="text-center py-12">
          <div class="inline-flex items-center">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mr-3"></div>
            <span class="text-lg text-gray-600">We are preparing most suitable data for you. Please wait a
              moment...</span>
          </div>
        </div>

        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-600 mb-4">{{ error }}</p>
          <button @click="fetchData" class="bg-[#23c465] hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            Retry
          </button>
        </div>

        <div v-else>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <SubjectCard v-for="subject in filteredSubjects" :key="subject.id" :subject="subject" />
          </div>

          <div v-if="filteredSubjects.length === 0" class="text-center py-12">
            <p class="text-gray-600 text-lg">No subjects found matching your criteria.</p>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center mt-12">
            <nav class="flex items-center space-x-2">
              <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                class="px-3 py-2 rounded-lg transition-colors hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeftIcon class="h-4 w-4" />
              </button>

              <template v-for="page in getPageNumbers()" :key="page + '-btn'">
                <button v-if="page !== -1" @click="changePage(page)"
                  class="px-4 py-2 rounded-lg font-medium transition-colors" :class="currentPage === page
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'">
                  {{ page }}
                </button>
                <span v-else class="px-2 text-gray-500">...</span>
              </template>

              <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                class="px-3 py-2 rounded-lg transition-colors hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronRightIcon class="h-4 w-4" />
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
import { useApi, type SubjectArea } from '../composables/useApi'
import SubjectCard from '../components/cards/SubjectCard.vue'

const { loading, error, fetchSubjectAreas } = useApi()

const subjects = ref<SubjectArea[]>([])
const currentPage = ref(1)
const totalPages = ref(1)
const searchQuery = ref('')
const selectedCategory = ref('all')

const categories = [
  { id: 'all', label: 'All Subjects' },
  { id: 'business', label: 'Business' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'sciences', label: 'Sciences' },
  { id: 'arts', label: 'Arts' },
]

const filteredSubjects = computed(() => {
  return subjects.value.filter(subject => {
    const matchesSearch = searchQuery.value === '' ||
      subject.subject_area.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      subject.subject_area_department?.name.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory = selectedCategory.value === 'all' ||
      subject.subject_area_department?.name.toLowerCase().includes(selectedCategory.value.toLowerCase())

    return matchesSearch && matchesCategory
  })
})

const fetchData = async () => {
  const data = await fetchSubjectAreas(currentPage.value)
  if (data) {
    subjects.value = data.rows.data
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