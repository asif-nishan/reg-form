<template>
  <div class="px-4 sm:px-6 lg:px-8 max-w-[90rem] mx-auto shadow-2xl bg-white rounded-lg">
    <section class="grid grid-cols-3 py-4">
      <div class="flex gap-2">
        <input
          type="text"
          id="search"
          v-model="searchQuery"
          @input="debouncedSearch"
          placeholder="Search by phone number"
          class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500"
        />
      </div>
      <div></div>
      <div class="text-right">
        <button
          class="bg-[#89BC40] hover:bg-green-600 text-white px-4 py-2 rounded shadow-sm"
          @click="downloadCsv"
        >
          Export CSV
        </button>
      </div>
    </section>
    <div class="mt-8" v-if="!loading && userList?.length">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-200 bg-white">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-3 py-3 text-left text-sm font-semibold text-gray-700">SL No.</th>
                <th scope="col" class="px-3 py-3 text-left text-sm font-semibold text-gray-700">First Name</th>
                <th scope="col" class="px-3 py-3 text-left text-sm font-semibold text-gray-700">Last Name</th>
                <th scope="col" class="px-3 py-3 text-left text-sm font-semibold text-gray-700">Membership ID</th>
                <th scope="col" class="px-3 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                <th scope="col" class="px-3 py-3 text-left text-sm font-semibold text-gray-700">Address</th>
                <th scope="col" class="px-3 py-3 text-left text-sm font-semibold text-gray-700">Dob</th>
                <th scope="col" class="px-3 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th scope="col" class="px-3 py-3 text-left text-sm font-semibold text-gray-700">Blood Group</th>
                <th scope="col" class="px-3 py-3 text-left text-sm font-semibold text-gray-700">Occupation</th>
                <th scope="col" class="px-3 py-3 text-left text-sm font-semibold text-gray-700">Family Members</th>
                <th scope="col" class="px-3 py-3 text-left text-sm font-semibold text-gray-700">Gender</th>
                <th scope="col" class="px-3 py-3 text-left text-sm font-semibold text-gray-700">Complimentary Card</th>
                <th scope="col" class="px-3 py-3 text-left text-sm font-semibold text-gray-700">Anniversary</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(person, index) in userList" :key="person.id" class="hover:bg-gray-50">
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{{ index + 1 }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{{ person.name }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{{ person.lastName }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.member_id }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.phone }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.address }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.birthDate }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.email }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.bloodGroup }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.occupation }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.familyMembers }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.gender }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.hasComplimentaryCard ? "Yes" : "No" }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.anniversary }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="text-center flex items-center justify-center mt-8" v-else-if="userList.length == 0">
      {{ loading ? 'Loading' : 'No data' }}
    </div>
    <div class="text-center flex items-center justify-center mt-8" v-else>
      {{ 'Loading' }}
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

const route = useRoute();
const config = useRuntimeConfig();
const page = ref(1);
const lastPage = ref(1);
const total = ref(0);
const perPage = ref(10);
const totalPerPage = ref(0);
const url = computed(() => config.public.BASE_URL + `user?per_page=${perPage.value}&page=${page.value}`);
const searchQuery = ref("");
const errors = ref({});
const loading = ref(true);
const userList = ref([]);
const success = ref(false);
const userId = ref(null);
const otp = ref("");
const csvConfig = mkConfig({ useKeysAsHeaders: true, filename: "customer-list" });

const loadData = (query = "") => {
  loading.value = true;
  errors.otpError = "";
  const token = window?.localStorage?.getItem("ACCESS_TOKEN") || null;
  let finalUrl = url.value;
  if (searchQuery.value != "") {
    finalUrl += `&phone=${query}`;
  }
  fetch(finalUrl, { headers: { Authorization: "Bearer " + token } })
    .then((response) => {
      if (response.status == 401) {
        window.localStorage.removeItem("LOGIN_ACCOUNT");
        window.localStorage.removeItem("ACCESS_TOKEN");
        window.location.href = "/login";
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((res) => {
      const { data, meta } = res;
      userList.value = data;
      loading.value = false;
      page.value = meta.current_page;
      lastPage.value = meta.last_page;
      total.value = meta.total;
      totalPerPage.value = data?.length;
    })
    .catch((error) => {
      loading.value = false;
      console.error("There was a problem with the fetch operation:", error);
    });
};

const search = async () => {
  loadData(searchQuery.value);
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
      if (obj[key] == null || obj[key] == undefined) {
        newObj[key] = "";
      } else if (obj[key] == 0) {
        newObj[key] = typeof obj[key] == "number" ? "No" : obj[key];
      } else if (obj[key] == 1) {
        newObj[key] = "Yes";
      } else {
        newObj[key] = obj[key].toString();
      }
    }
    return {
      "SL No": index + 1,
      "First Name": newObj.name,
      "Last Name": newObj.lastName,
      "Membership ID": `"${newObj.member_id}"`,  // Enclose in double quotes
      "Phone": `"${newObj.phone}"`,               // Enclose in double quotes
      "Email": newObj.email,
      "Address": newObj.address,
      "Date of Birth": newObj.birthDate,
      "Blood Group": newObj.bloodGroup,
      "Occupation": newObj.occupation,
      "Family Members": `"${newObj.familyMembers}"`, // Enclose in double quotes
      "Complimentary Card": newObj.hasComplimentaryCard,
      "Gender": newObj.gender,
      "Anniversary": newObj.anniversary,
    };
  });
  const csv = generateCsv(csvConfig)(newArray);
  download(csvConfig)(csv);
};

onMounted(() => {
  if (window?.localStorage?.getItem("ACCESS_TOKEN")) {
    loadData();
  } else {
    window.location.href = "/login";
  }
});
</script>

