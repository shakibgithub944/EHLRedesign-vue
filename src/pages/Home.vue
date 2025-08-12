<template>
  <main>
    <!-- Main Hero Section -->
    <section class="text-white py-16 lg:py-24 relative overflow-hidden bg-gradient-to-br from-[#23c465] to-blue-600">
      <div class="absolute inset-0 bg-cover bg-center opacity-20"
        style="background-image: url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')">
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl lg:text-5xl font-bold mb-6">Transform Your Educational Journey with Expert Guidance</h1>
            <p class="text-xl mb-8 text-green-50">Discover the perfect academic path and career opportunities tailored
              to your goals. Our expert consultants are here to guide you every step of the way.</p>
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link to="/subjects">
                <button
                  class="bg-white text-[#23c465] hover:bg-gray-50 px-6 py-3 rounded-lg font-medium text-lg flex items-center">
                  <BookOpenIcon class="mr-2 h-5 w-5" />
                  Explore Subjects
                </button>
              </router-link>
              <router-link to="/careers">
                <button
                  class="border border-white text-white hover:bg-white hover:text-[#23c465] px-6 py-3 rounded-lg font-medium text-lg flex items-center transition-colors">
                  <BriefcaseIcon class="mr-2 h-5 w-5" />
                  View Careers
                </button>
              </router-link>
            </div>
          </div>
          <div class="hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080"
              alt="Hero illustration" class="w-full h-64 lg:h-80 object-cover rounded-xl shadow-2xl" />
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Access Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Start Your Journey</h2>
          <p class="text-xl text-gray-600">Choose your path to educational excellence</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <router-link to="/subjects">
            <div
              class="group bg-gradient-to-br from-green-500 to-[#23c465] rounded-2xl p-8 text-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <BookOpenIcon class="h-12 w-12 mb-4 group-hover:scale-110 transition-transform" />
              <h3 class="text-2xl font-bold mb-2">Popular Subjects</h3>
              <p class="text-green-50 mb-4">Discover trending academic subjects chosen by students worldwide</p>
              <div class="flex items-center text-white font-medium">
                Explore Now
                <ArrowRightIcon class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </router-link>

          <router-link to="/careers">
            <div
              class="group bg-gradient-to-br from-blue-600 to-blue-600 rounded-2xl p-8 text-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <BriefcaseIcon class="h-12 w-12 mb-4 group-hover:scale-110 transition-transform" />
              <h3 class="text-2xl font-bold mb-2">Future Careers</h3>
              <p class="text-blue-50 mb-4">Plan your career path with expert guidance and insights</p>
              <div class="flex items-center text-white font-medium">
                View Careers
                <ArrowRightIcon class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Consultation Section -->
    <ConsultationSection />

    <!-- Partners Section -->
    <PartnersSection />
  </main>
</template>

<script setup lang="ts">
import { BookOpenIcon, BriefcaseIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import ConsultationSection from '../components/sections/ConsultationSection.vue'
import PartnersSection from '../components/sections/PartnersSection.vue'
</script>