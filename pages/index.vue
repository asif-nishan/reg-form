<template>
  <section style="background-image: linear-gradient(45deg, #daeaa5, #89bbef)">
    <section
      class="flex flex-col justify-center max-w-[44rem] mx-auto items-center scrollable-container"
      :class="!regFormSubmitted ? 'md:h-screen' : 'h-screen'"
      s
    >
      <div
        class="md:min-w-[30rem] grid grid-cols-0 md:my-0 md:mx-auto shadow-2xl bg-white m-4"
        :class="!regFormSubmitted ? '' : 'pb-4'"
      >
        <section class="order-2 px-4 pb-">
          <nav class="sticky top-0 bg-white z-[101]">
            <center class="md:py-0 py-4">
              <img
                width="120"
                height="10"
                src="/assets/khulshi.png"
                class="bg-white hidden md:block"
              />
              <img
                width="140"
                height="10"
                src="/assets/khulshi.png"
                class="bg-white sm:block md:hidden"
              />
            </center>
          </nav>
          <form v-if="!regFormSubmitted" @submit.prevent="submitForm" class="">
            <section class="grid gap-2 grid-cols-1 md:grid-cols-2 md:pb-0">
              <!-- Name -->
              <div class="grid gap-2 md:gap-1" :style="style">
                <label
                  :class="brandColor"
                  class="block font-bold"
                  >Are you a New or Old Member?Please select  Membership type  <span class="text-red-500">*</span></label
                >
                <select
                  v-model="memberType"
                  class="focus:outline-none bg-none"
                  :class="inputClass"
                  style="background: none"
                >
                
                  <option value="New">New</option>
                  <option value="Old">Old</option>
                </select>
                
              </div>
              <div
                v-if="memberType == 'Old'"
                class="grid gap-2 md:gap-1"
                :style="style"
              >
                <label for="Number" :class="brandColor" class="block font-bold"
                  >Please Enter Existing Membership ID <span class="text-red-500">*</span></label
                >
                <input
                  type="text"
                  v-model="formData.member_id"
                  :class="inputClass"
                  placeholder="e.g. 12345"
                />
              </div>
              <div class="grid gap-2 md:gap-1" :style="style">
                <label for="name" :class="brandColor" class="block font-bold"
                  >First Name <span class="text-red-500">*</span></label
                >
                <input
                  type="text"
                  id="name"
                  v-model="formData.name"
                  :class="inputClass"
                  placeholder="e.g. John"
                  required
                />
                <!-- <span v-if="errors.name" class="text-red-500">{{
                  errors.name
                }}</span> -->
              </div>
              <div class="grid gap-2 md:gap-1" :style="style">
                <label for="name" :class="brandColor" class="block font-bold"
                  >Last Name <span class="text-red-500">*</span></label
                >
                <input
                  type="text"
                  id="name"
                  v-model="formData.lastName"
                  :class="inputClass"
                  placeholder="e.g. Doe"
                  required
                />
                <!-- <span v-if="errors.name" class="text-red-500">{{
                  errors.lastName
                }}</span> -->
              </div>
              <!-- Phone -->
              <div class="grid gap-2 md:gap-1" :style="style">
                <label for="phone" :class="brandColor" class="block font-bold"
                  >Mobile Number <span class="text-red-500">*</span></label
                >
                <input
                  type="text"
                  id="phone"
                  v-model="formData.phone"
                  :class="inputClass"
                  placeholder="Please Enter Valid Mobile Number For OTP Verification"
                  required
                />
                <!-- <span v-if="errors.phone" class="text-red-500">{{
                  errors.phone
                }}</span> -->
              </div>

              <div class="grid gap-2 md:gap-1" :style="style">
                <label
                  for="birthDate"
                  :class="brandColor"
                  class="block font-bold"
                >
                  Date of Birth <span class="text-red-500">*</span></label
                >
                <input
                  type="date"
                  id="birthDate"
                  v-model="formData.birthDate"
                  :class="inputClass"
                  required
                />
                <!-- <span v-if="errors.birthDate" class="text-red-500">{{
                  errors.birthDate
                }}</span> -->
              </div>
              <div class="grid gap-2 md:gap-1" :style="style">
                <label for="email" :class="brandColor" class="block font-bold"
                  >Email <span class="text-red-500">*</span></label
                >
                <input
                  type="email"
                  id="emailid"
                  v-model="formData.email"
                  placeholder="e.g. john@gmail.com"
                  :class="inputClass"
                  required
                />
                <!-- <span v-if="errors.email" class="text-red-500">{{
                  errors.email
                }}</span> -->
              </div>

              <div class="grid gap-2 md:gap-1" :style="style">
                <label for="address" :class="brandColor" class="block font-bold"
                  >Address <span class="text-red-500">*</span></label
                >
                <input
                  type="text"
                  id="address"
                  v-model="formData.address"
                  :class="inputClass"
                  placeholder="e.g. 1 no road, Khulshi, Chittagong"
                  required
                />
                <!-- <span v-if="errors.address" class="text-red-500">{{
                  errors.address
                }}</span> -->
              </div>

              <div class="grid gap-2 md:gap-1" :style="style">
                <label
                  for="occupation"
                  :class="brandColor"
                  class="block font-bold"
                  >Blood Group</label
                >
                <select
                  id="occupation"
                  v-model="formData.bloodGroup"
                  class="focus:outline-none bg-none"
                  style="background: none"
                  :class="inputClass"
                >
                  <option disabled :value="''">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div class="grid gap-2 md:gap-1" :style="style">
                <label
                  for="occupation"
                  :class="brandColor"
                  class="block font-bold"
                  >Occupation</label
                >
                <select
                  id="occupation"
                  v-model="formData.occupation"
                  class="focus:outline-none bg-none"
                  style="background: none"
                  :class="inputClass"
                >
                  <option disabled :value="''">Select Occupation</option>
                  <option value="Business">Business</option>
                  <option value="Service">Service</option>
                  <option value="Student">Student</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <!-- Family Members -->
              <div class="grid gap-2 md:gap-1" :style="style">
                <label
                  for="familyMembers"
                  :class="brandColor"
                  class="block font-bold"
                  >Family Members</label
                >
                <select
                  id="familyMembers"
                  v-model="formData.familyMembers"
                  class="focus:outline-none bg-none"
                  :class="inputClass"
                  style="background: none"
                >
                  <option disabled :value="''">Select Family Members</option>
                  <option value="1-3">1-3</option>
                  <option value="4-6">4-6</option>
                  <option value="7-Above">7-Above</option>
                  <!-- Add more options as needed -->
                </select>
              </div>

              <!-- Anniversary -->
              <div class="grid gap-2 md:gap-1" :style="style">
                <label
                  for="anniversary"
                  :class="brandColor"
                  class="block font-bold"
                  >Anniversary</label
                >
                <input
                  type="date"
                  id="anniversary"
                  v-model="formData.anniversary"
                  :class="inputClass"
                />
                <!-- <span v-if="errors.anniversary" class="text-red-500">{{
                  errors.anniversary
                }}</span> -->
              </div>

              <!-- Gender -->
              <div class="flex gap-4 mt-2" style="">
                <label :class="brandColor" class="block font-bold"
                  >Gender</label
                >
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    v-model="formData.gender"
                    value="Male"
                    class="form-radio"
                  />
                  <span class="ml-2">Male</span>
                </label>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    v-model="formData.gender"
                    value="Female"
                    class="form-radio"
                  />
                  <span class="ml-2">Female</span>
                </label>
              </div>
              <div class="flex gap-4 mt-2">
                <label :class="brandColor" class="block font-bold"
                  >Complimentary Card</label
                >
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    name="card"
                    v-model="formData.hasComplimentaryCard"
                    value="Yes"
                    class="form-radio"
                  />
                  <span class="ml-2">Yes</span>
                </label>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    name="card"
                    v-model="formData.hasComplimentaryCard"
                    value="No"
                    class="form-radio"
                  />
                  <span class="ml-2">No</span>
                </label>
              </div>
              
            </section>
            <div class="grid gap-2 md:gap-1 mt-4" :style="style">
              <section class="grid gap-2 md:gap-2 md:grid-cols-2">
                <div class="flex gap-2 items-center">
                  <label
                    for="captcha"
                    :class="brandColor"
                    class="block font-bold"
                  >
                    Captcha<span class="text-red-500">*</span>
                  </label>
                  <div class="line line-through" @click="refreshCaptcha">
                    {{ captchaText }}
                  </div>
                  <div class="flex gap-2 items-center">
                    <input
                      id="captcha"
                      type="text"
                      v-model="userCaptcha"
                      placeholder="e.g. Type captcha"
                      :class="inputClass"
                      required
                    />
                  </div>
                  <div class="block md:hidden">
                    <div
                      id="refresh"
                      class="text-right"
                      @click="refreshCaptcha"
                    >
                      <ArrowPathIcon
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </div>
              </section>
              <section class="grid grid-cols-2 justify-between">
                <span class="hidden md:inline"></span>
                <span v-if="showCaptchaError" class="text-red-500">
                  Captcha doesn't matched!
                </span>
              </section>
            </div>
            <div v-if="Object.keys(errors).length">
              <ul>
                <li v-for="(messages, field) in errors" :key="field">
                  <strong class="text-sm capitalize">{{ field }}:</strong>
                  <ul>
                    <li v-for="(message, index) in messages" :key="index" class="text-sm text-red-500">
                      {{ message }}
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="bg-white z-[1000] pb-4 md:px-0">
              <div
                class="flex flex-col md:flex-row md:gap-4 md:items-center mt-2"
              >
                <!-- Wrapping the checkbox and text inside a label -->
                <label
                  for="termsCheckbox"
                  class="flex items-center cursor-pointer"
                >
                  <input
                    id="termsCheckbox"
                    type="checkbox"
                    v-model="isAgree"
                    @change="toggleTermsPopup"
                    class="mr-2"
                  />
                  <span
                    :class="[
                      brandColor,
                      'hover:text-blue-500',
                      'italic',
                      'no-underline',
                    ]"
                  >
                    I agree with terms & condition
                  </span>
                </label>
              </div>
              <!-- Boxed container for terms and condition -->
              <!-- Boxed container for terms and condition -->
              <div
                v-if="showTermsPopup"
                class="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-[2000]"
              >
                <div
                  class="bg-white p-4 rounded-md w-11/12 h-4/5 md:max-w-lg relative overflow-y-auto shadow-lg"
                >
                  <!-- Close button positioned at the top of the content -->
                  <button
                    @click="showTermsPopup = false"
                    class="absolute top-4 right-4 px-2 py-1 bg-blue-500 text-white rounded-md"
                  >
                    Close
                  </button>
                  <div class="content relative mt-8">
                    <h2
                      class="text-lg md:text-xl font-bold mb-4 text-center text-blue-500"
                    >
                      Terms & Conditions
                    </h2>
                    <!-- Add content here -->
                    <ul class="list-disc pl-4 md:pl-6 text-sm text-left">
                      <li class="px-4 py-2 text-justify">This Special K Card is Valid for three years Until March 31,2027.The Membership will have to be renewed after the specified date.</li>
  <li class="px-4 py-2 text-justify">Special K Card Membership is non-transferable.</li>
  <li class="px-4 py-2 text-justify">Membership is free of cost for our patrons, but Khulshi Mart reserves the right to accept, decline, or defer any membership application.</li>
  <li class="px-4 py-2 text-justify">Special K Card cannot be used for credit purchases; it is only a membership card.</li>
  <li class="px-4 py-2 text-justify">Points earned cannot be redeemed as cash refunds.</li>
  <li class="px-4 py-2 text-justify">Members will accumulate points with each purchase.</li>
  <li class="px-4 py-2 text-justify">Points earned can only be redeemed against general purchases or specific product rebates.</li>
  <li class="px-4 py-2 text-justify">If a member does not purchase anything for 6 months,the membership will be canceled</li>
  <li class="px-4 py-2 text-justify">Existing loyalty card holders who have been upgraded to the Special K membership must register online in order to avail its privileges</li>
  <li class="px-4 py-2 text-justify">The  privileges associated with Special K membership may change without prior notice.</li>
  <li class="px-4 py-2 text-justify">All notices related to membership will be sent to the Member's email address or phone number provided during the registration process.</li>
  <li class="px-4 py-2 text-justify">The Member may address concerns to Khulshi Mart by emailing info@khulshimart.com.</li>
  <li class="px-4 py-2 ">Khulshi Mart reserves the right to change the Terms & Conditions of membership without prior notice.</li>
  
</ul>






                  </div>
                </div>
              </div>

              <button
                type="submit"
                :disabled="disabled"
                :class="
                  !disabled
                    ? 'bg-[#89BC40] hover:bg-[#89BC40]'
                    : 'bg-gray-500 hover:bg-gray-600'
                "
                class="text-white px-4 py-2 rounded mt-4 w-full"
              >
                {{ !loading ? "Submit" : "Processing" }}
              </button>
              <!-- <button
                class="p-0 w-12 h-12 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
          Submit
        </button> -->
            </div>
          </form>

          <form
            v-else
            @submit.prevent="submitOtpForm"
            class="grid gap-2 md:gap-1"
          >
            <!-- Name -->
            <div class="grid gap-2 md:gap-1" :style="style">
      <label for="otp" class="block font-bold">We have sent a One Time Password (OTP) to your Mobile number.Please Enter OTP here</label>
      <input
        type="text"
        id="otp"
        v-model="otp"
        :class="inputClass"
        placeholder="e.g. 1234"
        required
      />
      <span v-if="errors?.otp" class="text-red-500">{{ errors.otp }}</span>
      
      
    </div>

            <div class="flex justify-end gap-2 md:gap-1">
              <button
                type="button"
                @click="
                  () => {
                    success = false;
                    isAgree = false;
                    regFormSubmitted = false;
                    errors.otpError = '';
                    userCaptcha = '';
                    otp = '';
                    errors = {};
                    refreshCaptcha();
                  }
                "
                class="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded mt-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="otp == '' || otp == null || loading"
                class="bg-[#89BC40] hover:bg-[#6d992f] text-white px-4 py-2 rounded mt-4"
              >
                {{ !loading ? "Submit" : "Processing" }}
              </button>
            </div>
            <div class="mt-4 text-center text-red-500" v-if="errors.otpError">
              {{ errors.otpError }}
            </div>
          </form>
        </section>
      </div>
      <section class="w-full px-[3.25rem] pb-4 md:pb-0 md:mt-2" style="">
        <ul role="list" class="flex gap-2 justify-center">
          <li class="list-item-3">
            <a
              target="blank"
              href="https://www.facebook.com/mykhulshimart?mibextid=LQQJ4d"
              class="link-block-2 w-inline-block"
              ><img
                src="/assets/facebook.svg"
                loading="lazy"
                alt=""
                class="w-[30px]"
              />
              <!-- <h1 class="text-[#283516]">Facebook</h1> -->
            </a>
          </li>
          <li class="list-item-3">
            <a
              target="blank"
              href=" https://www.instagram.com/khulshimart"
              class="link-block-2 w-inline-block"
              ><img
                src="/assets/instagram.svg"
                loading="lazy"
                alt=""
                class="w-[30px]"
              />
              <!-- <h1 class="text-[#283516]">Instagram</h1> -->
            </a>
          </li>
          
        </ul>
      </section>
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ArrowPathIcon } from "@heroicons/vue/20/solid";
definePageMeta({
  layout: "empty",
});
const config = useRuntimeConfig();
const url = config.public.BASE_URL + "user";
const style = "";
const inputClass =
  "relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none focus:ring-blue-500 sm:text-sm focus:border-blue-500";
const defaultData = {
  name: "",
  lastName: "",
  address: "",
  phone: "",
  birthDate: "",
  email: "",
  occupation: "",
  familyMembers: "",
  gender: "",
  anniversary: "",
  bloodGroup: "",
  hasComplimentaryCard: false,
  member_id: "",
};

const showTermsPopup = ref(false);

// Function to toggle the visibility of the terms pop-up
const toggleTermsPopup = () => {
  if (isAgree.value) {
    showTermsPopup.value = !showTermsPopup.value;
  }
};

const TERMS_AND_CONDITION_LINK =
  "https://reg.kbakery.com.bd/terms&condition?fbclid=IwAR3ZHAuljA8NIQrStmVdluorz8VY4EWvitgrQvpPS5kMCxeboy4-Zgzdvw4_aem_AX98AXyHp5MERWziwe-z6zha2l6MmwgUPO7OD5sOi7nSXQpUMafwcgnJUTJ8BMLSL-5bWtuyrL95BUSdxRFX2OTY";
const formData = ref({ ...defaultData });

const errors = ref({});
const loading = ref(false);
const isAgree = ref(false);
const regFormSubmitted = ref(false);
const success = ref(false);
const userId = ref(null);
const otp = ref("");
const brandColor = ref("");
const memberType = ref("New");

const formattedData = computed(() => {
  const obj = {
    ...formData.value,
    hasComplimentaryCard: !!formData.value.hasComplimentaryCard == "Yes",
  };
  if (memberType.value == "New") {
    delete obj.member_id;
  }
  return obj;
});
const captchaText = ref("");
const userCaptcha = ref("");
const showCaptchaError = computed(() => {
  if (!userCaptcha.value || !captchaText.value) {
    return false;
  }
  if (userCaptcha.value.toLowerCase() === captchaText.value.toLowerCase()) {
    return false;
  }
  return true;
});
const disabled = computed(() => {
  return (
    !isAgree.value ||
    loading.value ||
    !userCaptcha.value ||
    showCaptchaError.value
  );
});

const submitForm = () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formattedData.value),
  };
  loading.value = true;
  errors.otpError = "";
  // Send POST request using fetch
  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          errors.value = data;
          console.log(data, "data error");
          throw new Error(data);
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      userId.value = data.data.id;
      formData.value = { ...defaultData };
      setTimeout(() => {
        loading.value = false;
      }, 1000);
      regFormSubmitted.value = true;
    })
    .catch((error) => {
      setTimeout(() => {
        loading.value = false;
      }, 1000);
      // Handle error from the server or network
    });
};
const notify = (id) => {
  toast.success("Thanks For Registration. Your Special K Card ID is: " + id, {
    autoClose: false,
    closeButton: true, // To close manually
    // Other ToastOptions if needed
  });
};

// Function to refresh CAPTCHA
const refreshCaptcha = () => {
  captchaText.value = generateRandomString(4); // Generate a 6-character random string
};
const submitOtpForm = () => {
  // Options for the fetch request
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: otp.value,
    }),
  };
  loading.value = true;
  errors.value.otpError = "";
  // Send POST request using fetch
  fetch(url + "/" + userId.value, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data, data.data.member_id);
      setTimeout(() => {
        loading.value = false;
      }, 1000);
      // regFormSubmitted.value = false
      errors.value.otpError = "";
      otp.value = null;
      userId.value = null;
      regFormSubmitted.value = false;
      errors.value = {};
      isAgree.value = false;
      userCaptcha.value = "";
      refreshCaptcha();
      notify(data?.data?.member_id);
    })
    .catch((error) => {
      console.error("Error:", error);
      setTimeout(() => {
        loading.value = false;
      }, 1000);
      errors.value.otpError = "Otp not matched";
      // Handle error from the server or network
    });
};

const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

onMounted(() => {
  refreshCaptcha();
});
</script>
<style scoped>
.aaa {
  /* background-image: url("assets/bg-image-1.jpg"); */
}
::-webkit-scrollbar {
  width: 1px; /* Adjust width as needed */
  height: 0px;
}

/* Optionally, you can style the scrollbar track */
::-webkit-scrollbar-track {
  background-color: green; /* Change background color as needed */
}

/* Optionally, you can style the scrollbar thumb */
::-webkit-scrollbar-thumb {
  background-color: white; /* Change thumb color as needed */
}
.py-2 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

@media screen and (max-width: 768px) {
  .block {
    /* display: block;  */
    font-size: 11px;
  }
}

/* Styles for large screens */
@media screen and (min-width: 769px) {
  .block {
    display: block;
    font-size: 11px;
  }
}
span {
  font-size: 12px;
}
</style>