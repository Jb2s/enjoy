<template>
  <div>
    <div v-if="rooms.length > 0">
      <!-- Mobile view -->
      <div class="space-y-4 md:hidden">
        <div
          v-for="room in rooms"
          :key="room.id"
          class="bg-white rounded-lg shadow-md p-4"
        >
          <div class="relative">
             <button @click="openRoomModal(room)" class="w-full block focus:outline-none">
            <img
              :src="images"
              :alt="room.productName"
              class="w-full h-48 object-cover rounded-lg"
            />
            </button>
            <div

              class="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm"
            >
              {{ $t('book') }}
            </div>
          </div>
          <div class="mt-4">
            <button @click="openRoomModal(room)" class="text-left w-full focus:outline-none">
            <h3 class="text-lg font-bold text-gray-800">{{ room.productName }}</h3>
            </button>
            <p class="text-sm text-gray-600 mt-1">{{ room.description }}</p>
            <div class="flex items-center mt-2 text-sm text-gray-600">
              <Users class="w-4 h-4 mr-1" />
              <span>  {{ getRoomDetail(room, 'Maximum Occupancy') }} personne{{ getRoomDetail(room, 'Maximum Occupancy') > 1 ? 's' : '' }}
              </span>
              <span class="mx-2">•</span>
              <TrendingUp class="w-4 h-4 mr-1" />
              <span>{{ getRoomDetail(room, 'Room Size (sqm)') }} m²</span>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <div
                v-for="(option, index) in room.options.slice(0, 3)"
                :key="index"
                class="flex items-center text-sm text-gray-600"
              >
                <component :is="getOptionIcon(option.optionName)" class="w-4 h-4 mr-1 text-purple-500" />
                <span>{{ option.optionName }}: {{ option.value }}</span>
              </div>

            </div>
            <div class="flex justify-between items-center mt-4">
              <div class="text-xl font-bold text-gray-800">
                {{ room.price }} FCFA
                <span class="text-sm font-normal text-gray-600">/ nuit</span>
              </div>
              <button
               @click="goToBooking(room)"
                class="px-4 py-2 rounded-md text-white text-sm font-medium transition bg-blue-600 hover:bg-blue-700"
              >
                {{ $t('book') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop view -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full border-collapse">
          <thead class="bg-purple-100">
            <tr class="text-left">
              <th class="px-6 py-4 text-sm font-semibold text-gray-600">{{ $t('room') }}</th>
              <th class="px-6 py-4 text-sm font-semibold text-gray-600">{{ $t('capacity') }}</th>
              <th class="px-6 py-4 text-sm font-semibold text-gray-600">{{ $t('service_included') }}</th>
              <th class="px-6 py-4 text-sm font-semibold text-gray-600 text-right">{{ $t('pricePerNight') }}</th>
              <th class="px-6 py-4 text-sm font-semibold text-gray-600 text-right">{{ $t('availability') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="room in rooms"
              :key="room.id"
              class="bg-white hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex items-start space-x-4">
                  <button @click="openRoomModal(room)" class=" block focus:outline-none">
                  <img
                    :src="images"
                    :alt="room.productName"
                    class="w-24 h-20 object-cover rounded-lg"
                  />
                  </button>
                  <div>
                    <button @click="openRoomModal(room)">
                    <h3 class="font-semibold text-gray-800">{{ room.productName }}</h3>
                    </button>
                    <p class="text-sm text-gray-600 mt-1">{{ room.description }}</p>
                    <div class="flex items-center mt-1 text-sm text-gray-500">
                      <TrendingUp class="w-3.5 h-3.5 mr-1" />
                      <span>{{ getRoomDetail(room, 'Room Size (sqm)' )}} m²</span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="items-start text-sm text-gray-600 inline-flex">
                  <Users class="w-4 h-4 mr-2" />
                    {{ getRoomDetail(room, 'Maximum Occupancy') }} {{ $t('people') }}
                    {{ getRoomDetail(room, 'Maximum Occupancy') > 1 ? 's' : '' }}

                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-2">

                    <div
                    v-for="(option, index) in room.options.slice(0, 3)"
                    :key="index"
                    class="flex items-center text-sm text-gray-600"
                  >
                    <component :is="getOptionIcon(option.optionName)" class="w-4 h-4 mr-1 text-purple-500" />
                    <span>{{ option.optionName }}: {{ option.value }}</span>
                  </div>


                  <span
                    v-if="room.options.length > 3"
                    class="text-sm text-purple-600"
                  >
                    +{{ room.options.length - 3 }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="text-lg font-bold text-gray-800">
                  {{ room.price }} FCFA
                </div>
                <!-- <div class="text-sm text-gray-600">Taxes incluses</div> -->
              </td>
              <td class="px-6 py-4 text-right">
                <button
                 @click="goToBooking(room)"
                  class="
                    px-6 py-2 rounded-md text-white text-sm font-medium transition bg-orange-600 hover:bg-orange-700 "

                >
                  {{ $t('book') }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-600 text-lg">
        {{ $t('no_room') }}
      </p>
      <p class="text-gray-500">{{ $t('please_change') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BedDouble, Eye, Building2, Check,Users,TrendingUp } from 'lucide-vue-next'

const images = ref(
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop"
        )
const props = defineProps({
  rooms: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['selectedRoom','book-room'])

const openRoomModal = (room) => {
  emit('selectedRoom',room)
  console.log('Ouvrir modal pour :', room)

}

const getRoomDetail = (room, key) => {
  const found = room.options?.find(opt =>
    opt.optionName?.toLowerCase() === key.toLowerCase()
  )
  return found?.value || '—'
}

const goToBooking = (room) => {
  emit('book-room', room)
}

// const openBooking = (room) => {
//   emit('book-room', room)
//   console.log('Book cette chambre :', room)
// }



const getOptionIcon = (optionName) => {
  switch (optionName.toLowerCase()) {
    case 'accommodation type':
      return Building2
    case 'bed type':
      return BedDouble
    case 'view':
      return Eye
    default:
      return Check
  }
}

</script>
