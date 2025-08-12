<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center cursor-pointer">
            <img src="/logo.png" alt="Education Hub Logo" class="h-10 mr-3" />
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="flex items-baseline space-x-4">
            <router-link v-for="item in navItems" :key="item.href" :to="item.href"
              class="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
              :class="isActive(item.href)
                ? 'text-green-600 bg-green-50'
                : 'text-gray-600 hover:text-green-700 hover:bg-gray-50'">
              <component :is="item.icon" class="h-4 w-4 mr-2" />
              {{ item.label }}
            </router-link>
          </div>
        </div>

        <!-- Desktop CTA -->
        <div class="hidden md:block">
          <button
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors flex items-center">
            <CalendarIcon class="mr-2 h-4 w-4" />
            Book Consultation
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="text-gray-600 rounded hover:text-gray-900 focus:outline-none">
            <Bars3Icon v-if="!isMobileMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden border-t border-gray-200">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link v-for="item in navItems" :key="item.href" :to="item.href"
            class="flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer"
            :class="isActive(item.href)
              ? 'text-green-600 bg-green-50'
              : 'text-gray-600 hover:text-green-700 hover:bg-gray-50'" @click="isMobileMenuOpen = false">
            <component :is="item.icon" class="h-5 w-5 mr-3" />
            {{ item.label }}
          </router-link>
          <button
            class="w-full mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors flex items-center justify-center">
            <CalendarIcon class="mr-2 h-4 w-4" />
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { HomeIcon, BookOpenIcon, BriefcaseIcon, CalendarIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon, exact: true },
  { href: '/subjects', label: 'Popular Subjects', icon: BookOpenIcon },
  { href: '/careers', label: 'Future Careers', icon: BriefcaseIcon },
]

const isActive = (href: string, exact = false) => {
  if (exact) {
    return route.path === href
  }
  return route.path.startsWith(href) && href !== '/'
}
</script>