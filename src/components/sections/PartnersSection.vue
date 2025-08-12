<template>
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Our Awards & Achievements
        </h2>
      </div>
      <div class="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 my-5">
        <div v-for="partner in partners" :key="partner.name" class="flex items-center justify-center">
          <div class="p-4 rounded-lg w-full md:w-auto h-auto flex items-center justify-center">
            <div class="w-24 h-24">
              <img :src="partner?.img" :alt="partner.name" class="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const partners = [
  { name: 'Oxford', img: "https://www.ehlweb.theskyroute.com/assets/front/img/partners/6726087f49c54.png" },
  { name: 'Cambridge', img: "https://www.ehlweb.theskyroute.com/assets/front/img/partners/6726088b50e5f.png" },
  { name: 'Harvard', img: "https://www.ehlweb.theskyroute.com/assets/front/img/partners/67260898890bc.png" },
  { name: 'Stanford', img: "https://www.ehlweb.theskyroute.com/assets/front/img/partners/672608a6c1172.png" },
]
</script>