<template>
  <main>
    <!-- Main Hero Section -->
    <section class="relative bg-white text-gray-900">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <!-- Left Content -->
          <div class="lg:col-span-6">
            <span class="inline-block text-sm font-semibold text-[#97c01f] mb-3">
              Your Path to Success
            </span>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Transform Your Educational Journey
              <span class="block text-[#e97006]">with Expert Guidance</span>
            </h1>

            <p class="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
              Discover the perfect academic path and career opportunities tailored to your goals.
              Our expert consultants are here to guide you every step of the way.
            </p>

            <div class="mt-8 flex flex-col sm:flex-row gap-4">
              <router-link to="/subjects">
                <button
                  class="flex items-center gap-2 bg-[#e97006] text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-[#cf6004] transition">
                  <BookOpenIcon class="w-5 h-5" />
                  Explore Subjects
                </button>
              </router-link>

              <router-link to="/careers">
                <button
                  class="flex items-center gap-2 border-2 border-[#97c01f] text-[#97c01f] font-semibold px-6 py-3 rounded-xl hover:bg-[#97c01f] hover:text-white transition">
                  <BriefcaseIcon class="w-5 h-5" />
                  View Careers
                </button>
              </router-link>
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




    <!-- Quick Access Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <!-- Section Heading -->
        <div class="text-center mb-14">
          <h2 class="text-3xl lg:text-4xl font-extrabold text-gray-900">
            Start Your Journey
          </h2>
          <p class="mt-3 text-lg text-gray-600">
            Choose your path to educational excellence
          </p>
        </div>

        <!-- Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <!-- Popular Subjects Card -->
          <router-link to="/subjects">
            <div
              class="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#97c01f] hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer">
              <div
                class="flex items-center justify-center w-16 h-16 rounded-full bg-[#97c01f]/10 text-[#97c01f] mb-6 group-hover:scale-105 transition-transform">
                <BookOpenIcon class="h-8 w-8" />
              </div>
              <h3 class="text-2xl font-bold mb-2 text-gray-900">Popular Subjects</h3>
              <p class="text-gray-600 mb-6">
                Discover subjects chosen by students worldwide
              </p>
              <div class="flex items-center text-[#97c01f] font-semibold group-hover:underline">
                Explore Now
                <ArrowRightIcon class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </router-link>

          <!-- Future Careers Card -->
          <router-link to="/careers">
            <div
              class="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#e97006] hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer">
              <div
                class="flex items-center justify-center w-16 h-16 rounded-full bg-[#e97006]/10 text-[#e97006] mb-6 group-hover:scale-105 transition-transform">
                <BriefcaseIcon class="h-8 w-8" />
              </div>
              <h3 class="text-2xl font-bold mb-2 text-gray-900">Future Careers</h3>
              <p class="text-gray-600 mb-6">
                Plan your career path with expert guidance and insights
              </p>
              <div class="flex items-center text-[#e97006] font-semibold group-hover:underline">
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