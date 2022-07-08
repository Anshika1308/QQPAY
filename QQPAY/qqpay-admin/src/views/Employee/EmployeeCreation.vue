<template>
  <div class=" d-flex">

    <div class="w-100">
      <!--------------------------------------------- top nav bar section--------------------------------------------------- -->
      <div class="h-5 top-nav">
        <div class="profile-bell-div">
          <div class="bell-icon me-1">
            <i class="fa-regular fa-bell"></i>
          </div>
          <img src="" class="profile-icon me-2 mt-1" />
        </div>
        <div class="d-flex justify-content-between ms-2 p-2">
          <div class="user-text">Employee Creation</div>
          <div>
            <button class="export-btn me-5">
              Export
              <i class="fas fa-download"></i>
            </button>
          </div>
        </div>
      </div>
      <!-------------------------- profile information (main body) -------------------------------->
      <div class="h-80 d-flex p-2">
        <div class="col-2 profile-div align-item-div">
          <div>
            <img src="" class="profile-img mb-2" />
            <div class="browse-text text-center">Browse</div>
          </div>
        </div>
        <!-------------------------- Personal Information section -------------------------------->
        <div class="col-10 p-3 h-80">
          <div>
            <div class="w-85 d-flex justify-content-between">
              <div class="profile-info">Personal Information</div>
              <div>
                <i class="fa-solid fa-pen"></i>
              </div>
            </div>
            <div class="info-text">
              <div class="d-flex ms-5">
                <div class="w-25">
                  <div>First Name</div>
                </div>
                <div>Narasimha</div>
              </div>
              <div class="d-flex ms-5">
                <div class="w-25">
                  <div>Last Name</div>
                </div>
                <div>Gummadi</div>
              </div>
              <div class="d-flex ms-5">
                <div class="w-25">
                  <div>Middle Name</div>
                </div>
                <div>Rao</div>
              </div>
              <div class="d-flex ms-5">
                <div class="w-25">
                  <div>Mobile No</div>
                </div>
                <div>+91 - 6304696126</div>
              </div>
              <div class="d-flex ms-5">
                <div class="w-25">
                  <div>DOJ</div>
                </div>
                <div>01-jan-2022</div>
              </div>
              <div class="d-flex ms-5">
                <div class="w-25">
                  <div>Pin Code</div>
                </div>
                <div>123456</div>
              </div>
              <div class="d-flex ms-5">
                <div class="w-25">
                  <div>Nationality</div>
                </div>
                <div>Indian</div>
              </div>
              <div class="d-flex ms-5">
                <div class="w-25">
                  <div>Personal Email</div>
                </div>
                <div>nrao.gummadi@gmail.com</div>
              </div>
              <div class="d-flex ms-5">
                <div class="w-25">
                  <div>Alternative Mobile No</div>
                </div>
                <div>+60-1234567890</div>
              </div>
            </div>
          </div>
          <!-------------------------- Login Information section -------------------------------->
          <div class="mt-3">
            <div class="w-85 d-flex justify-content-between">
              <div class="profile-info">Login Information</div>
              <div>
                <i class="fa-solid fa-pen"></i>
              </div>
            </div>
            <div class="info-text">
              <div class="d-flex ms-5">
                <div class="w-25">
                  <div>User ID/Email ID</div>
                </div>
                <div>narasimha@qqpay.io</div>
              </div>
              <div class="d-flex ms-5">
                <div class="w-25">
                  <div>Password</div>
                </div>
                <div>**********</div>
              </div>
              <div class="d-flex ms-5">
                <div class="w-25">
                  <div>Alternative Password</div>
                </div>
                <div>**********</div>
              </div>
            </div>
          </div>
          <!-------------------------- Professional Information section -------------------------------->
          <div class="mt-3">
            <div class="w-85 d-flex justify-content-between">
              <div class="profile-info">Professional Information</div>
              <div>
                <i class="fa-solid fa-pen"></i>
              </div>
            </div>
            <div class="info-text">
              <div class="d-flex ms-5">
                <div class="w-25">
                  <div>Designation</div>
                </div>
                <div>Manager</div>
              </div>
              <div class="d-flex ms-5">
                <div class="w-25">
                  <div>Department</div>
                </div>
                <div>Compliance</div>
              </div>
              <div class="d-flex ms-5">
                <div class="w-25">
                  <div>Sub Division</div>
                </div>
                <div>Sales</div>
              </div>
            </div>
          </div>
          <div class="update-btn-div me-5">
            <button class="update-btn">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
/************layout of employee creation page*************/
.bo {
  border: 2px solid green;
}
.w-15 {
  width: 15%;
}
.h-20 {
  height: 20vh;
}
.w-85 {
  width: 85%;
}
.h-80 {
  height: 75vh;
}
/************************************top nav bar styles***********************/

.top-nav {
  background-color: #fffbf7;
}
.profile-icon {
  width: 33px;
  height: 33px;
  border-radius: 33px;
}
.bell-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  border-radius: 26px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.3);
}
.profile-bell-div {
  display: flex;
  justify-content: end;
  align-items: center;
}
.user-text {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 24px;
  color: #000000;
}
.export-btn {
  background: #ffffff;
  border: 1px solid #ff6b00;
  border-radius: 3px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  padding-top: 4px;
  padding-bottom: 4px;
  line-height: 17px;
  color: #ff6b00;
}
/************************************profile-image***********************/
.profile-div {
  background: #f4f4f4;
  border-radius: 5px;
  height: 50%;
}
.profile-img {
  width: 85px;
  height: 85px;
  border-radius: 85px;
}
.browse-text {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 22px;
  text-decoration-line: underline;
  color: #000000;
}
.align-item-div {
  display: flex;
  align-items: center;
  justify-content: center;
}
/************************************profile-information***********************/
.profile-info {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
}
.fa-pen {
  font-size: 12px;
}
.info-text > div {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
}
.update-btn {
  background: #ff6b00;
  border: 1px solid #ff6b00;
  border-radius: 5px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  width: 12%;
}
.update-btn-div {
  display: flex;
  justify-content: end;
  align-items: flex-end;
}
</style>