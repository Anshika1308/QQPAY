<template>
  <div class="business_data">
	<NavBar />
	<div class="page-body">
		<TitleBar title="Business Details" />
		<b-container>
			<b-row class="mt-5">
				<b-col col sm="12" md="12" lg="12">
					<step-progress :current="currentStep" :steps="steps"></step-progress>
				</b-col>
			</b-row>
			<b-row align-h="center my-5">
				<div v-if="currentStep == 1">
					<b-col>
						<b-row>
							<b-col col sm="12" md="12" lg="12">
								<text-field textFieldLabel="Registered Business Name" :textFieldValue="business_data.registered_name" /> </b-col>
						</b-row>
						<b-row>
							<b-col col sm="12" md="12" lg="12">
								<text-field textFieldLabel="Business Trade Name" :textFieldValue="business_data.tradeName" /> </b-col>
						</b-row>
						<b-row>
							<b-col col sm="12" md="12" lg="12">
								<text-field textFieldLabel="Business Registration Number" :textFieldValue="business_data.registration_number" /> </b-col>
						</b-row>
						<b-row>
							<b-col col sm="6">
								<div data-v-16f10035="" data-v-0f80ec19="">
									<label data-v-16f10035="" data-v-0f80ec19="" class="text-field-label">Enter Regulatory/ License Number</label>
									<input data-v-16f10035="" data-v-0f80ec19="" type="date" name="" class="text-field-value"> </div>
							</b-col>
							<b-col col sm="6">
								<custom-dropdown :arrayOptions="entity_options" labelDropdown="Company Entity Type" defaultName="Select Compnany Entity Type" />
                </b-col>
						</b-row>
						<b-row>
							<b-col col sm="6">
								<text-field textFieldLabel="Enter Regulatory/ License Number" :textFieldValue="business_data.regulatioryNumber" /> </b-col>
							<b-col col sm="6">
                <custom-dropdown :arrayOptions="fund_options" labelDropdown="Source Of Funds" defaultName="Select Source Of Funds" />
							</b-col>
						</b-row>
						<b-row>
							<b-col col sm="6">
                <custom-dropdown
                  :arrayOptions="nature_options"
                  labelDropdown="Nature of Business"
                  defaultName="Select Nature of Business"
                />
							</b-col>
							<b-col col sm="6">
                <custom-dropdown
                  :arrayOptions="service_options"
                  labelDropdown="Product/service type"
                  defaultName="Select Service"
                />
							</b-col>
						</b-row>
						<b-row>
							<b-col col sm="6">
                <custom-dropdown
                  :arrayOptions="purpose_options"
                  labelDropdown="Ended Use of Account"
                  defaultName="Select Payment"
                />
							</b-col>
							<b-col col sm="6">
                <custom-dropdown
                  :arrayOptions="revenue_options"
                  labelDropdown="Annual Net Revenue"
                  defaultName="Select Revenue"
                />
							</b-col>
						</b-row>
						<div class="company-details">
							<h6 class="contactdetails1">Company Contact Details</h6>
							<b-row>
								<b-col col sm="12" md="12" lg="12">
									<text-field textFieldLabel="Website" :textFieldValue="business_data.website" /> </b-col>
							</b-row>
							<b-row>
								<b-col col sm="6">
									<!-- <label class="text-field-label-select">Annual Net Revanue</label>
									<select class="text-field-value-select">
										<option value="volvo">0 - 2 Lpa</option>
									</select> -->
                  <custom-dropdown
                    :arrayOptions="revenue_options"
                    labelDropdown="Annual Net Revenue"
                    defaultName="Select Revenue"
                  />
								</b-col>
								<b-col col sm="6">
									<text-field textFieldLabel="Mobile Number" :textFieldValue="business_data.mobileNumber" /> </b-col>
							</b-row>
						</div>
					</b-col>
					<b-button class="float-right mt-5 px-5" variant="primary" @click="onClickNext">Next</b-button>
				</div>
				<div v-if="currentStep === 2">
					<div class="back_color">
						<h1 class="title-main">Registered Business Address</h1>
						<div row>
							<div col sm="12" md="12" lg="12">
								<text-field textFieldLabel="Builing Name & Office No:" :textFieldValue="business_data.builing_Name" /> </div>
							<div col sm="12" md="12" lg="12">
								<text-field textFieldLabel="Street & Lacality" :textFieldValue="business_data.Street_Name" /> </div>
						</div>
						<b-row>
							<b-col col sm="6">
								<text-field textFieldLabel="Pin Code" :textFieldValue="business_data.pinCode" /> </b-col>
							<b-col col sm="6">
								<text-field textFieldLabel="City" :textFieldValue="business_data.city" /> </b-col>
						</b-row>
						<b-row>
							<b-col col sm="6">
								<text-field textFieldLabel="State" :textFieldValue="business_data.state" /> </b-col>
							<b-col col sm="6">
								<text-field textFieldLabel="Country" :textFieldValue="business_data.country" /> </b-col>
						</b-row>
						<div class="sub-space">
							<input type="checkbox" v-model="checkedAddrs" id="chek-box"><span class="chech_title"> 
                Please tick if address of incorporation is different than the address of business
              </span> </div>
						<div v-if="checkedAddrs">
							<h1 class="title-main1">Operational Business Address</h1>
							<div row>
								<div col sm="12" md="12" lg="12">
									<text-field textFieldLabel="Builing Name & Office No:" :textFieldValue="business_data.builing_Name" /> </div>
								<div col sm="12" md="12" lg="12">
									<text-field textFieldLabel="Street & Lacality" :textFieldValue="business_data.Street_Name" /> </div>
							</div>
							<b-row>
								<b-col col sm="6">
									<text-field textFieldLabel="Pin Code" :textFieldValue="business_data.pinCode" /> </b-col>
								<b-col col sm="6">
									<text-field textFieldLabel="City" :textFieldValue="business_data.city" /> </b-col>
							</b-row>
							<b-row>
								<b-col col sm="6">
									<text-field textFieldLabel="State" :textFieldValue="business_data.state" /> </b-col>
								<b-col col sm="6">
									<text-field textFieldLabel="Country" :textFieldValue="business_data.country" /> </b-col>
							</b-row>
						</div>
						<b-button class="float-left mt-5 px-5" variant="outline-secondary" @click="onClickBack">Back</b-button>
						<b-button class="float-right mt-5 px-5" variant="primary" @click="onClickNext">Next</b-button>
					</div>
				</div>
				<div v-if="currentStep === 3">
					<div row>
						<div class="row2">
							<h1 data-v-16f10035="" class="title-main">Kindly Upload Your Company Doccuments</h1>
							<p data-v-16f10035="" class="title-sub">For Scans a photo taken on your mobile phone is sufficient</p>
						</div>
						<div class="upload-container" col sm="12" md="12" lg="12" v-for="uploads in upload_list" :key="uploads.id">
							<div class="upload-file-main1">
								<div class="gfs">
									<h4 data-v-f27aea2a="" class="titile-upload">{{ uploads.title }}</h4> <em data-v-f27aea2a class="subtitile-upload">{{ uploads.text }}</em> </div>
								<div class="upload-btn-wrapper1">
									<button class="btn1"><span class="icon-upload"><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                          viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                      <circle style="fill:#25AE88;" cx="25" cy="25" r="25"/>
                      <polyline style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" points="
                        38,15 22,33 12,25 "/>
                      <g>
                      </g>

                    </svg>
                    Uploaded</span></button>
									<input type="file" name="myfile" /> </div>
							</div>
							<br/> </div>
					</div>
					<b-button class="float-left mt-5 px-5" variant="outline-secondary" @click="onClickBack">Back</b-button>
					<b-button class="float-right mt-5 px-5" variant="primary" @click="onClickNext">Next</b-button>
				</div>
				<div v-if="currentStep === 4">
					<div data-v-16f10035="" class="back_color">
						<div row>
							<b-row>
								<b-col col sm="3">
									<text-field textFieldLabel="Title" :textFieldValue="applicantInfo.title" /> </b-col>
								<b-col col sm="9">
									<text-field textFieldLabel="First Name" :textFieldValue="applicantInfo.firstName" /> </b-col>
							</b-row>
						</div>
						<b-row>
							<b-col col sm="6">
								<text-field textFieldLabel="Middle Name" :textFieldValue="applicantInfo.middleName" /> </b-col>
							<b-col col sm="6">
								<text-field textFieldLabel="Last Name" :textFieldValue="applicantInfo.lastName" /> </b-col>
						</b-row>
						<b-row>
							<b-col col sm="6">
                <custom-dropdown
                  :arrayOptions="country_options"
                  labelDropdown="Country Of Residency"
                  defaultName="Select Country"
                />
							</b-col>
							<b-col col sm="6">
                <custom-dropdown
                  :arrayOptions="country_options"
                  labelDropdown="Nationality"
                  defaultName="Select Nationality"
                />
							</b-col>
						</b-row>
						<b-row>
							<b-col col sm="6">
                <custom-dropdown
                  :arrayOptions="country_options"
                  labelDropdown="Politically Exposed Person(PEP)"
                  defaultName="Select PEP"
                />
							</b-col>
							<div data-v-16f10035="" class="col-sm-6 col">
								<div data-v-16f10035="" data-v-0f80ec19="" class="tex--fieldcontainer">
									<label data-v-16f10035="" data-v-0f80ec19="" class="text-field-label"> Date of Birth </label>
									<input data-v-16f10035="" data-v-0f80ec19="" type="date" value="10/12/2021" class="text-field-value"> </div>
							</div>
						</b-row>
						<h1 data-v-16f10035="" class="title-main-4">Contact and Address Details</h1>
						<div row>
							<div col sm="12" md="12" lg="12">
								<text-field textFieldLabel="Email" :textFieldValue="applicantInfo.email" /> </div>
						</div>
						<b-row>
							<b-col col sm="6">
								<label class="text-field-label-select">Code</label>
								<select class="text-field-value-select">
									<option value="volvo">+60</option>
								</select>
							</b-col>
							<div data-v-16f10035="" class="col-sm-6 col">
								<div data-v-16f10035="" data-v-0f80ec19="" class="tex--fieldcontainer">
									<label data-v-16f10035="" data-v-0f80ec19="" class="text-field-label">Mobile Number</label>
									<input data-v-16f10035="" data-v-0f80ec19="" type="text" value="9898989898" class="text-field-value"> </div>
							</div>
						</b-row>
						<div col sm="12" md="12" lg="12">
							<text-field textFieldLabel="Builing Name & Office No:" :textFieldValue="applicantInfo.buildingName" /> </div>
						<div col sm="12" md="12" lg="12">
							<text-field textFieldLabel="Street & Locality" :textFieldValue="applicantInfo.streetLocality" /> </div>
						<b-row>
							<b-col col sm="6">
								<text-field textFieldLabel="Pin Code" :textFieldValue="applicantInfo.pinCode" /> </b-col>
							<b-col col sm="6">
								<text-field textFieldLabel="City" :textFieldValue="applicantInfo.city" /> </b-col>
						</b-row>
						<b-row>
							<b-col col sm="6">
								<text-field textFieldLabel="State" :textFieldValue="applicantInfo.state" /> </b-col>
							<b-col col sm="6">
								<text-field textFieldLabel="Country" :textFieldValue="applicantInfo.country" /> </b-col>
						</b-row>
						<b-button class="float-left mt-5 px-5" variant="outline-secondary" @click="onClickBack">Back</b-button>
						<b-button class="float-right mt-5 px-5" variant="primary" @click="onClickNext">Next</b-button>
					</div>
				</div>
				<div v-if="currentStep === 5">
					<div col sm="12" md="12" lg="12">
						<div class="">
							<h1 class="inter-h4">interview schedule on</h1>
							<table>
								<tr>
									<td>
										<div class="col-md-6">
											<p class="margin-1">Date</p>
										</div>
									</td>
									<td>
										<input data-v-16f10035="" data-v-0f80ec19="" type="date" name="" class="text-field-value"> </td>
								</tr>
								<tr>
									<td>
										<div class="col-md-6">
											<p class="margin-1">Time</p>
										</div>
									</td>
									<td>
										<select data-v-16f10035="" class="text-field-value-select">
											<option data-v-16f10035="" value="volvo">12 AM - 1 PM</option>
										</select>
									</td>
								</tr>
								<tr>
									<td>
										<div class="col-md-6">
											<p class="margin-1">City</p>
										</div>
									</td>
									<td>
										<select data-v-16f10035="" class="text-field-value-select">
											<option data-v-16f10035="" value="volvo">Delhi</option>
										</select>
										<p class="keep-document">Please Keep The All Requered Doccument</p>
									</td>
								</tr>
							</table>
							<div class="space-button1">
								<button class="print-reciept1">Discart</button>
								<button class="print-reciept">Shedule</button>
							</div>
						</div>
					</div>
					<b-button class="float-left mt-5 px-5" variant="outline-secondary" @click="onClickBack">Back</b-button>
					<b-button class="float-right mt-5 px-5" variant="primary" @click="onClickNext">Next</b-button>
				</div>
				<div v-if="currentStep === 6">
					<div row>
						<div col sm="12" md="12" lg="12">
							<div class="card-1">
								<h1 class="inter-h4">your inter view is schedule</h1>
								<p class="text-interview">hello we have schedeule face to face interview</p>
								<table>
									<tr>
										<td>Company:</td>
										<td>The Tech Ink</td>
									</tr>
									<tr>
										<td>Adress:</td>
										<td>The tech ink Perl Tower, Gadital, Hadapsar</td>
									</tr>
									<tr>
										<td>Contact Person:</td>
										<td>Hrishikesh Kale</td>
									</tr>
									<tr>
										<td>Contact Number:</td>
										<td>+91 1234567890</td>
									</tr>
									<tr>
										<td>Date & Time Slot</td>
										<td>02 jan 2022; 9:00 - 12:00 P.M.</td>
									</tr>
									<tr>
										<td>Interview Reference Id:</td>
										<td>QQ_20000001</td>
									</tr>
									<tr>
										<td>Doccument Needed:</td>
										<td><a href="">List of Doccuments</a></td>
									</tr>
								</table>
								<p class="text-interview">hello we have schedeule face to face interview</p>
							</div>
							<div class="space-button">
								<button class="print-reciept">Downoad & Print Reciept</button>
							</div>
						</div>
					</div>
					<b-button class="float-left mt-5 px-5" variant="outline-secondary" @click="onClickBack">Back</b-button>
					<b-button class="float-right mt-5 px-5" variant="primary" @click="onClickNext">Next</b-button>
				</div>
			</b-row>
		</b-container>
	</div>
</div>
</template>

<script>
import NavBar from "@/components/navigations/NavBar.vue";
import TitleBar from "@/components/navigations/TitleBar.vue";
import StepProgress from "@/components/tools/StepProgress.vue";
import TextField from "@/components/common/TextField.vue";
import CustomDropdown from "@/components/common/Dropdown.vue";


export default {
  name: "BusinessDetails",
  components: {
    NavBar,
    TitleBar,
    TextField,
    CustomDropdown,
    "step-progress": StepProgress
  },
  data() {
    return {
      temp_account: "",
      business_data: {
        registered_name: "The Tech Ink Pvt Ltd",
        tradeName: "The Tech Inch",
        registration_number: "20222102001210",
        dateOfIncroporation: "Date of Incorporation",
        regulatioryNumber: "1234-XXXX-XXXX",
        fund: "Profit",
        entity: "Private Limited",
        nature: "Fashion & Textile",
        services: "Designer Clothing",
        revenue: "0 to 2 Lakh",
        DOI: "10-01-2022",
        license: "123456789",
        purpose: "Receive payments",
        website: "thetech.inc",
        mobileNumber: '9898980098',
        builing_Name: "Ankita Regidency, Flate No 23",
        Street_Name:"Hadapsar Gadital",
        pinCode:'411028',
        city: 'Pune',
        state: 'Maharastra',
        country: 'India',
      },
      applicantInfo: {
        title: 'Mr',
        firstName: 'Hrishikesh',
        middleName: 'Rajendra',
        lastName: 'Kale',
        countryResidency: 'Malaysia',
        nationality: 'Malaysia',
        PoliticallyExposed: {
          text: 'No',
          value: 'no'
        },
        dateOfBitrth: '11/12/2021',
        email: 'hrishikesh.kale@thetech.inc',
        code: [
          {
            id: 1,
            country: 'India',
          }
        ],
        mobileNo: '9873221221',
        buildingName: 'Ankita Residency, Flat No 23',
        streetLocality: 'Hadapsar, Gadital',
        pinCode: '411208',
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India'
      },
      steps: [
        { text: "Entity Information" },
        { text: "Address" },
        { text: "Upload Documents" },
        { text: "Applicant Info" },
        { text: "Scheduled Interview" },
        { text: "Summary" },
      ],
      currentStep: 1,
      fund_options: [
        {
          text: "Profit",
          value: "Profit",
        },
      ],
      upload_list: [
        {
          id: 1,
          title: "SSM corporate profile report",
          text: "SSM corporate profile report is required as per Govt. mandate",
          value: true,
        },
        {
          id: 2,
          title: "Certified copy of Form 24",
          text: "Certified copy of Form 24 is required as per Govt. mandate",
          value: false,
        },
        {
          id: 3,
          title: "Certificate of Incorporation",
          text: "Certificate of incorporation is required as per Govt. mandate",
          value: true,
        },
        {
          id: 4,
          title: "Certified copy of Form 13",
          text: "Certified copy of Form 13 is required as per Govt. mandate",
          value: false,
        },
        {
          id: 5,
          title: "Certified copy of Form 49",
          text: "Certified copy of Form 49 is required as per Govt. mandate",
          value: false,
        },
        {
          id: 6,
          title: "Memorandum of Association",
          text: "Memorandum of Association is required as per Govt. mandate",
          value: false,
        },
        {
          id: 7,
          title: "Articles of Association",
          text: "Articles of association is required as per Govt. mandate",
          value: true,
        },
        {
          id: 8,
          title: "Business License",
          text: "Business License is required as per Govt. mandate",
          value: true,
        },
      ],
      entity_options: [
        {
          text: "Private Limited1",
          value: "Private Limited",
        },
        {
          text: "Rivate Limited2",
          value: "Fashion & Textile",
        },
        {
          text: "Rivate Limited3",
          value: "Designer Clothing",
        },
      ],
      country_options: [
        {
          text: "Malaysia",
          value: "Malaysia",
        },
      ],
      nature_options: [
        {
          text: "Fashion & Textile",
          value: "Fashion & Textile",
        },
      ],
      service_options: [
        {
          text: "Designer Clothing",
          value: "Designer Clothing",
        },
      ],
      purpose_options: [
        {
          text: "Receive Payments",
          value: "Receive Payments",
        },
      ],
      revenue_options: [
        {
          text: "0 to 2 Lakh",
          value: "0 to 2 Lakh",
        },
        {
          text: "2 to 5 Lakh",
          value: "2 to 5 Lakh",
        },
        {
          text: "5 to 10 Lakh",
          value: "5 to 10 Lakh",
        },
        {
          text: "10 Lakh above",
          value: "10 Lakh above",
        },
      ],
      checkedAddrs: false,
    };
  },
  methods: {
    onClickNext: function () {
      this.currentStep++;
    },
    onClickBack: function () {
      this.currentStep--;
    },
  }
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
// ::v-deep .btn-light {
//   border: 1px solid #d3d3d3 !important;
// }
.title-main {
    font-size: 16px;
    color: black;
}
.title-main1 {
    font-size: 20px;
    color: black;
}
.sub-space {
    margin: 11px 0px 26px 12px;
}
.company-details {
    margin: 8px;
    padding: 5px 17px;
    background: #eeebf1;
}
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.btn1 {
  border: 1px solid gray;
  color: gray;
  background-color: white;
  padding: 0px 10px;
  border-radius: 20px;
  font-size: 20px;
  
}

.upload-btn-wrapper1 input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.upload-file-main1 {
  padding: 5px;
  background: #efebeb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
svg#Capa_1 {
  width: 14px;
}
span.icon-upload {
  font-size: 13px;
}
.upload-container{
  background: #efebeb;
}
.card-1 {
  padding: 20px;
  border: 1px solid gray;
  box-shadow: 2px 2px 2px 2px grey;
}
h1.inter-h4 {
  font-size: 18px;
  font-weight: 700;
}
button.print-reciept {
  border: none;
  background: #ff6b00;
  color: white;
  padding: 5px 10px;
  border-radius: 12px;
}
.space-button {
  text-align: center;
  margin: 14px;
}
button.print-reciept1 {
  border: none;
  background: white;
  outline: none;
}
.space-button1 {
  margin-top: 43px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button.btn1 {
  display: flex;
  padding: 5px 10px !important;
}
.fff{
  border-bottom: 1px solid white;
  background: #efebeb;
}
ul {
  list-style: none;
}
em {
  color: darkgray;
}
btn-primary{
	font-size: 19px;
	margin-top: -60px !important;
	position: absolute;
	right: 200px !important;
	background-color: #4459e8 !important;
	padding: 6px;
}
.text-field-value-select {
  margin: 10px;
  border: 1px solid gray;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
  background-color: white;
}
.text-field-label-select {
  font-size: 8px;
    position: absolute;
    top: -3px;
    left: 39px;
    background: white;
    padding: 5px;
}
h6.contactdetails1 {
    color: black;
    margin: 0px 0px 16px;
}
.back_color {
    padding: 10px 28px 7px 10px;
    background: #eeebf1;
}
span.chech_title {
    font-size: 12px;
}
h4.titile-upload {
    font-size: 16px;
}
.upload-btn-wrapper1 {
    margin-left: 80px;
}
em.subtitile-upload {
    font-size: 12px;
}
.row2 {
    padding: 6px;
    background: #efebeb;
    margin: 0px 0px -16px;
}
p.title-sub {
    color: black;
    font-size: 10px;
    margin: -7px 4px 15px;
}
h1.title-main-4 {
    font-size: 17px;
    color: black;
    margin: 26px 0px 10px;
}
p.margin-1 {
    margin-right: 84px;
}
p.keep-document {
    font-size: 10px;
    position: absolute;
    padding: 0px 11px;
}
</style>