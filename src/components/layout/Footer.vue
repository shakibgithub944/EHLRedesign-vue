<template>
  <footer class="bg-gray-50 border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">

        <!-- Company Info -->
        <div>
          <h3 class="text-2xl font-extrabold text-gray-900 mb-4">Education Hub</h3>
          <p class="text-gray-600 mb-6">
            Your trusted partner for educational excellence and career guidance.
          </p>
          <div class="flex space-x-4">
            <a v-for="social in socialLinks" :key="social.label" :href="social.href"
              class="text-gray-400 hover:text-[#e97006] transition-colors" :aria-label="social.label">
              <component :is="social.icon" class="h-5 w-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.href">
              <router-link :to="link.href" class="text-gray-600 hover:text-[#97c01f] transition-colors">
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h4 class="text-lg font-semibold text-gray-900 mb-4">Services</h4>
          <ul class="space-y-2">
            <li v-for="service in services" :key="service.href">
              <a :href="service.href" class="text-gray-600 hover:text-[#97c01f] transition-colors">
                {{ service.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-lg font-semibold text-gray-900 mb-4">Contact Info</h4>
          <ul class="space-y-3 text-gray-600">
            <li class="flex items-center">
              <EnvelopeIcon class="h-4 w-4 mr-2 text-[#e97006]" />
              <a href="mailto:info@education-hub.co.uk" class="hover:text-[#97c01f] transition-colors">
                info@education-hub.co.uk
              </a>
            </li>
            <li class="flex items-center">
              <PhoneIcon class="h-4 w-4 mr-2 text-[#e97006]" />
              <a href="tel:+442012345678" class="hover:text-[#97c01f] transition-colors">
                +44 (0) 20 1234 5678
              </a>
            </li>
            <li class="flex items-center">
              <MapPinIcon class="h-4 w-4 mr-2 text-[#e97006]" />
              <span>London, United Kingdom</span>
            </li>
          </ul>
        </div>

      </div>

      <hr class="border-gray-200 my-10" />

      <div class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-500 text-sm">
          © 2025 Education Hub Ltd. All rights reserved.
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <router-link to="/privacy" class="text-gray-500 hover:text-[#97c01f] transition-colors text-sm">
            Privacy Policy
          </router-link>
          <router-link to="/terms" class="text-gray-500 hover:text-[#97c01f] transition-colors text-sm">
            Terms & Conditions
          </router-link>
          <router-link to="/partner" class="text-gray-500 hover:text-[#97c01f] transition-colors text-sm">
            Be a Partner
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>


<script setup lang="ts">
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/vue/24/outline'

const quickLinks = [
  { href: '/subjects', label: 'Popular Subjects' },
  { href: '/careers', label: 'Future Careers' },
  { href: '#', label: 'Course Finder' },
  { href: '#', label: 'Apply Online' },
]

const services = [
  { href: '#', label: 'Consultation' },
  { href: '#', label: 'University Applications' },
  { href: '#', label: 'Visa Guidance' },
  { href: '#', label: 'Career Counseling' },
]

const socialLinks = [
  { icon: 'div', href: '#', label: 'Facebook' }, // Placeholder for social icons
  { icon: 'div', href: '#', label: 'Twitter' },
  { icon: 'div', href: '#', label: 'LinkedIn' },
  { icon: 'div', href: '#', label: 'YouTube' },
]
</script>