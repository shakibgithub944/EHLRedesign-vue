<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        <!-- Left Content -->
        <div class="lg:col-span-6">
          <h2 class="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">
            Ready to Start Your Educational Journey?
          </h2>
          <p class="text-lg text-gray-600 mb-8">
            Book a free consultation with our expert advisors and take the first step
            towards your dream career. We’ll help you find the perfect course and
            university for your goals.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              class="flex items-center gap-2 bg-[#e97006] text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-[#cf6004] transition">
              <CalendarIcon class="w-5 h-5" />
              Book Free Consultation
            </button>
            <button
              class="flex items-center gap-2 border-2 border-[#97c01f] text-[#97c01f] font-semibold px-6 py-3 rounded-xl hover:bg-[#97c01f] hover:text-white transition">
              <PhoneIcon class="w-5 h-5" />
              Call Us Now
            </button>
          </div>
        </div>

        <!-- Right Image -->
        <div class="lg:col-span-6">
          <div class="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1974&h=1316"
              alt="Consultation" class="w-full h-72 lg:h-[300px] object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { CalendarIcon, PhoneIcon } from '@heroicons/vue/24/outline'
</script>