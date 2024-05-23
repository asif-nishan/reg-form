<template>
  <div class="container mx-auto shadow-2xl p-4">
    <section class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 sm:p-6 lg:p-8">
      <div class="flex flex-col gap-2">
        <input
          type="text"
          id="searchPhone"
          v-model="searchPhoneQuery"
          @input="debouncedSearch"
          placeholder="Search by phone number"
          class="input-class"
        />
      </div>
      <div></div>
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
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <th class="table-header">SL No.</th>
              <th class="table-header">First Name</th>
              <th class="table-header">Last Name</th>
              <th class="table-header">Phone</th>
              <th class="table-header">Address</th>
              <th class="table-header">Dob</th>
              <th class="table-header">Email</th>
              <th class="table-header">Blood Group</th>
              <th class="table-header">Occupation</th>
              <th class="table-header">Family Members</th>
              <th class="table-header">Gender</th>
              <th class="table-header">Complimentary Card</th>
              <th class="table-header">Anniversary</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr
              v-for="(person, index) in userList"
              :key="person.id"
              :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
            >
              <td class="table-data">{{ (200000 + index + 1).toString().padStart(8, '0') }}</td> <!-- Custom serial number -->
              <td class="table-data">{{ person.name }}</td>
              <td class="table-data">{{ person.lastName }}</td>
              <td class="table-data">{{ person.phone }}</td>
              <td class="table-data">{{ person.address }}</td>
              <td class="table-data">{{ person.birthDate }}</td>
              <td class="table-data">{{ person.email }}</td>
              <td class="table-data">{{ person.bloodGroup }}</td>
              <td class="table-data">{{ person.occupation }}</td>
              <td class="table-data">{{ person.familyMembers }}</td>
              <td class="table-data">{{ person.gender }}</td>
              <td class="table-data">{{ person.hasComplimentaryCard ? "Yes" : "No" }}</td>
              <td class="table-data">{{ person.anniversary }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      class="text-center flex items-center justify-center mt-8"
      v-else-if="loading || userList.length == 0"
    >
      {{ loading ? "Loading" : "No data" }}
    </div>
    <Pagination
      class="mt-6"
      :perPage="perPage"
      :lastPage="lastPage"
      :total="total"
      :totalPerPage="totalPerPage"
      @onChange="onPageChanged"
    >
      <select
        class="focus:outline-none bg-none"
        v-model="perPage"
        @change="loadData"
      >
        <option>10</option>
        <option>25</option>
        <option>50</option>
        <option>100</option>
        <option>200</option>
        <option>500</option>
        <option>1000</option>
      </select>
    </Pagination>
  </div>
</template>

<script setup>
import { mkConfig, generateCsv, download } from "export-to-csv";
import { ref, computed, onMounted } from "vue";
import { useDebounce } from "@/hooks/useDebounce";
import Pagination from "./Pagination";

const config = useRuntimeConfig();
const page = ref(1);
const lastPage = ref(1);
const total = ref(0);
const perPage = ref(10);
const totalPerPage = ref(0);

const url = computed(() => {
  return `${config.public.BASE_URL}user?per_page=${perPage.value}&page=${page.value}`;
});

const inputClass =
  "relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500";

const searchPhoneQuery = ref("");
const searchNameQuery = ref("");
const loading = ref(true);
const userList = ref([]);

const loadData = () => {
  loading.value = true;
  const token = window.localStorage.getItem("ACCESS_TOKEN");
  let finalUrl = url.value;
  if (searchPhoneQuery.value) {
    finalUrl += `&phone=${searchPhoneQuery.value}`;
  }
  if (searchNameQuery.value) {
    finalUrl += `&name=${searchNameQuery.value}`;
  }

  // Logging the final URL to check the parameters
  console.log("Final URL:", finalUrl);

  fetch(finalUrl, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      if (response.status == 401) {
        window.localStorage.removeItem("LOGIN_ACCOUNT");
        window.localStorage.removeItem("ACCESS_TOKEN");
        window.location.href = "/login";
      }
      if (!response.ok) throw new Error("Network response was not ok");
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
      console.error("There was a problem with the fetch operation:", error);
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
  const newArray = userList.value.map((obj, index) => {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = obj[key] ?? "";
    }
    return {
      "SL No": (200000 + index + 1).toString().padStart(8, '0'), // Custom serial number
      "First Name": newObj.name,
      "Last Name": newObj.lastName,
      Phone: newObj.phone,
      Email: newObj.email,
      Address: newObj.address,
      "Date of Birth": newObj.birthDate,
      "Blood Group": newObj.bloodGroup,
      Occupation: newObj.occupation,
      "Family Members": `"${newObj.familyMembers}"`, // Ensure Family Members is formatted as text
      "Complimentary Card": newObj.hasComplimentaryCard ? "Yes" : "No",
      Gender: newObj.gender,
      Anniversary: newObj.anniversary,
    };
  });
  const csv = generateCsv(mkConfig({ useKeysAsHeaders: true, filename: "customer-list" }))(newArray);
  download(mkConfig({ useKeysAsHeaders: true, filename: "customer-list" }))(csv);
};

onMounted(() => {
  if (window.localStorage.getItem("ACCESS_TOKEN")) {
    loadData();
  } else {
    window.location.href = "/login";
  }
});
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
