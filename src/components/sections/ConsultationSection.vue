<template>
  <section class="py-16 bg-gradient-to-br from-green-500 to-blue-600 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl lg:text-4xl font-bold mb-6">Ready to Start Your Educational Journey?</h2>
          <p class="text-xl mb-8 text-green-50">Book a free consultation with our expert advisors and take the first
            step towards your dream career. We'll help you find the perfect course and university for your goals.</p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              class="bg-white text-[#23c465] hover:bg-gray-50 px-6 py-3 rounded-lg font-medium text-lg flex items-center">
              <CalendarIcon class="mr-2 h-5 w-5" />
              Book Free Consultation
            </button>
            <button
              class="border border-white text-white hover:bg-white hover:text-[#23c465] px-6 py-3 rounded-lg font-medium text-lg flex items-center transition-colors">
              <PhoneIcon class="mr-2 h-5 w-5" />
              Call Us Now
            </button>
          </div>
        </div>
        <div class="hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&h=1316"
            alt="Consultation" class="w-full h-64 lg:h-80 object-cover rounded-xl shadow-2xl" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CalendarIcon, PhoneIcon } from '@heroicons/vue/24/outline'
</script>