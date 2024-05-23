<template>
  <div class="container mx-auto shadow-2xl p-4">
    <section class="flex flex-wrap items-center justify-between p-4 sm:p-6 lg:p-8">
      <div class="w-full md:w-auto mb-4 md:mb-0">
        <input
          type="text"
          v-model="searchPhoneQuery"
          @input="debouncedSearch"
          placeholder="Search by phone number"
          class="input-class"
        />
      </div>
      <div class="text-right">
        <button
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          @click="downloadCsv"
        >
          Export CSV
        </button>
      </div>
    </section>
    <div class="mt-8" v-if="!loading && userList?.length">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr>
              <th v-for="header in tableHeaders" :key="header" class="table-header">{{ header }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(person, index) in userList" :key="person.id" :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'">
              <td v-for="(value, key) in person" :key="key" v-if="tableHeaders.includes(key)" class="table-data">{{ formatData(key, value) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="text-center mt-8" v-else-if="loading || userList.length === 0">
      {{ loading ? 'Loading' : 'No data' }}
    </div>
    <Pagination
      class="mt-6"
      :perPage="perPage"
      :lastPage="lastPage"
      :total="total"
      :totalPerPage="totalPerPage"
      @onChange="onPageChanged"
    >
      <select class="focus:outline-none bg-none" v-model="perPage" @change="loadData">
        <option v-for="option in perPageOptions" :key="option">{{ option }}</option>
      </select>
    </Pagination>
  </div>
</template>

<script setup>
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { ref, computed, onMounted } from 'vue';
import { useDebounce } from '@/hooks/useDebounce';
import Pagination from './Pagination';

const config = useRuntimeConfig();
const page = ref(1);
const lastPage = ref(1);
const total = ref(0);
const perPage = ref(10);
const totalPerPage = ref(0);
const searchPhoneQuery = ref('');
const loading = ref(true);
const userList = ref([]);

const loadData = () => {
  loading.value = true;
  const token = window.localStorage.getItem('ACCESS_TOKEN');
  let finalUrl = `${config.public.BASE_URL}user?per_page=${perPage.value}&page=${page.value}`;

  if (searchPhoneQuery.value) {
    finalUrl += `&phone=${searchPhoneQuery.value}`;
  }

  fetch(finalUrl, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      if (response.status === 401) {
        window.localStorage.removeItem('LOGIN_ACCOUNT');
        window.localStorage.removeItem('ACCESS_TOKEN');
        window.location.href = '/login';
      }
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then((res) => {
      const { data, meta } = res;
      userList.value = data;
      loading.value = false;
      page.value = meta.current_page;
      lastPage.value = meta.last_page;
      total.value = meta.total;
      totalPerPage.value = data.length;
    })
    .catch((error) => {
      loading.value = false;
      console.error('There was a problem with the fetch operation:', error);
    });
};

const search = () => {
  loadData();
};
const debouncedSearch = useDebounce(search, 500);

const onPageChanged = (p) => {
  page.value = p;
  loadData();
};

const downloadCsv = () => {
  const formattedData = userList.value.map((person, index) => {
    const formattedPerson = {};
    for (const key in person) {
      formattedPerson[key] = person[key] ?? '';
    }
    return {
      'SL No': index + 1,
      'First Name': formattedPerson.name,
      'Last Name': formattedPerson.lastName,
      Phone: formattedPerson.phone,
      Email: formattedPerson.email,
      Address: formattedPerson.address,
      'Date of Birth': formattedPerson.birthDate,
      'Blood Group': formattedPerson.bloodGroup,
      Occupation: formattedPerson.occupation,
      'Family Members': `"${formattedPerson.familyMembers}"`,
      'Complimentary Card': formattedPerson.hasComplimentaryCard ? 'Yes' : 'No',
      Gender: formattedPerson.gender,
      Anniversary: formattedPerson.anniversary,
    };
  });
  const csv = generateCsv(mkConfig({ useKeysAsHeaders: true, filename: 'customer-list' }))(formattedData);
  download(mkConfig({ useKeysAsHeaders: true, filename: 'customer-list' }))(csv);
};

onMounted(() => {
  if (window.localStorage.getItem('ACCESS_TOKEN')) {
    loadData();
  } else {
    window.location.href = '/login';
  }
});

const formatData = (key, value) => {
  // If value is boolean, return "Yes" or "No" instead of true or false
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return value;
};

const tableHeaders = [
  'SL No.',
  'First Name',
  'Last Name',
  'Phone',
  'Address',
  'DOB',
  'Email',
  'Blood Group',
  'Occupation',
  'Family Members',
  'Gender',
  'Complimentary Card',
  'Anniversary',
];

const perPageOptions = [10, 25, 50, 100, 200, 500, 1000];
</script>

<style scoped>
.container {
  max-width: 90rem;
  padding: 1rem;
}
.input-class {
  @apply relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500;
}
.table-header {
  @apply py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0;
}
.table-data {
  @apply whitespace-nowrap px-3 py-4 text-sm text-gray-500;
}
</style>
