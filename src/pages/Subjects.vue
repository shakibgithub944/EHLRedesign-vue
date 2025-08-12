<template>
  <main>
    <section class="bg-[#fdfbf7] py-20 lg:py-28 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <!-- Text Content -->
          <div>
            <span class="inline-block bg-[#97c01f] text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
              Your Future Starts Here
            </span>
            <h1 class="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Find the Most Popular <span class="text-[#e97006]">Subjects</span> to Study
            </h1>
            <p class="text-lg text-gray-600 mb-8 max-w-xl">
              Our expert consultants guide you in choosing the best academic and career path —
              helping you make confident decisions for a successful future.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                class="bg-[#e97006] text-white hover:bg-[#d86305] px-6 py-3 rounded-xl font-medium text-lg flex items-center shadow-lg transition">
                <CalendarIcon class="mr-2 h-5 w-5" />
                Book Free Consultation
              </button>
              <router-link to="/subjects"
                class="border border-gray-300 text-gray-700 hover:border-[#97c01f] hover:text-[#97c01f] px-6 py-3 rounded-xl font-medium text-lg flex items-center transition">
                Explore Subjects
              </router-link>
            </div>
          </div>

          <!-- Image -->
          <div class="relative">
            <div class="absolute -top-6 -left-6 w-24 h-24 bg-[#97c01f] rounded-full opacity-20"></div>
            <div class="absolute bottom-0 -right-8 w-32 h-32 bg-[#e97006] rounded-full opacity-20"></div>
            <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1920&h=1080"
              alt="Students studying" class="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-xl relative z-10" />
          </div>

        </div>
      </div>
    </section>



    <section class="py-16 bg-[#fdfbf7]">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">

        <!-- Heading -->
        <div class="text-center">
          <h2 class="text-4xl font-extrabold text-gray-900 mb-4">
            Explore <span class="text-[#e97006]">Popular Subjects</span>
          </h2>
          <p class="text-lg text-gray-600">
            Discover the top subjects chosen by students worldwide.
          </p>
        </div>

        <!-- Search Bar -->
        <!-- <div class="relative max-w-2xl mx-auto mb-10">
          <input v-model="searchQuery" type="text" placeholder="Search subjects..."
            class="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm text-lg focus:border-[#97c01f] focus:ring-2 focus:ring-[#97c01f] outline-none transition-all" />
          <MagnifyingGlassIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div> -->

        <!-- Filter Buttons -->
        <!-- <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button v-for="category in categories" :key="category.id" @click="selectedCategory = category.id"
            class="px-6 py-2 rounded-full font-medium text-sm border transition-all duration-200" :class="selectedCategory === category.id
              ? 'bg-[#97c01f] text-white border-[#97c01f] shadow-md'
              : 'bg-white text-gray-700 border-gray-200 hover:border-[#e97006] hover:text-[#e97006]'">
            {{ category.label }}
          </button>
        </div> -->

      </div>
    </section>


    <!-- Subjects Grid -->
    <section class="py-5 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        <div v-if="loading" class="text-center py-16">
          <div class="inline-flex items-center space-x-4">
            <div
              class="animate-spin rounded-full h-7 w-7 border-4 border-t-[#e97006] border-r-[#97c01f] border-b-transparent border-l-transparent"
              aria-label="Loading spinner"></div>
            <span class="text-lg font-semibold text-gray-700">
              We are preparing most suitable data for you. Please wait a moment...
            </span>
          </div>
        </div>

        <div v-else-if="error" class="text-center py-16">
          <p class="text-[#e97006] text-xl font-semibold mb-6">{{ error }}</p>
          <button @click="fetchData"
            class="bg-[#97c01f] hover:bg-[#85aa1a] text-white font-semibold px-6 py-3 rounded-md shadow-md transition duration-300">
            Retry
          </button>
        </div>

        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <SubjectCard v-for="subject in filteredSubjects" :key="subject.id" :subject="subject" />
          </div>

          <div v-if="filteredSubjects.length === 0" class="text-center py-20">
            <p class="text-gray-500 text-lg italic">No subjects found matching your criteria.</p>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center mt-14">
            <nav class="flex items-center space-x-3">
              <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                class="px-4 py-2 rounded-md text-[#e97006] font-medium transition-colors hover:bg-[#e97006] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Previous Page">
                <ChevronLeftIcon class="h-5 w-5" />
              </button>

              <template v-for="page in getPageNumbers()" :key="page + '-btn'">
                <button v-if="page !== -1" @click="changePage(page)" :class="[
                  'px-5 py-2 rounded-md font-semibold transition-colors',
                  currentPage === page
                    ? 'bg-[#97c01f] text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                ]">
                  {{ page }}
                </button>
                <span v-else class="px-3 text-gray-400 select-none">…</span>
              </template>

              <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                class="px-4 py-2 rounded-md text-[#e97006] font-medium transition-colors hover:bg-[#e97006] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Next Page">
                <ChevronRightIcon class="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>

      </div>
    </section>
    <!--  -->
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