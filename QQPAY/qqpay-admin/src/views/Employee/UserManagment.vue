<template>
  <div class="bo d-flex">
    <div class="w-100">
      <!------------------- top nav bar section--------------------------- -->
      <div class="h-20 top-nav">
        <div class="profile-bell-div">
          <div class="bell-icon me-1">
            <i class="fa-regular fa-bell"></i>
          </div>
          <img src="" class="profile-img me-2 mt-1" />
        </div>
        <div class="tabs-div d-flex mb-1">
          <div class="ms-2">
            <div>Transactions</div>
            <i class="fa-solid fa-circle i-inactive"></i>
          </div>
          <div>
            <div>Complaince</div>
            <i class="fa-solid fa-circle i-inactive"></i>
          </div>
          <div>
            <div>KYC</div>
            <i class="fa-solid fa-circle i-inactive"></i>
          </div>
          <div>
            <div>Treasury</div>
            <i class="fa-solid fa-circle i-active"></i>
          </div>
        </div>
        <div class="d-flex justify-content-between ms-2 mb-2">
          <div class="user-text">User Management & Roles</div>
          <div class="create-savebtn">
            <button>
              Create role
              <i class="fa-solid fa-circle-plus ms-2"></i>
            </button>
            <button class="ms-3 me-3">Save Changes</button>
          </div>
        </div>
        <div class="bord-bottom d-flex ms-5">
          <div class="ms-3">Users</div>
          <div class="border-role ms-3">Roles</div>
        </div>
      </div>
      <!-------------------------- user management (main body) -------------------------------->
      <div class="h-80 d-flex p-1">
        <table class="w-100">
          <tr class="table-head">
            <td class></td>
            <td class="main-text">Role 1</td>
            <td class="main-text">Role 2</td>
            <td class="main-text">Role 3</td>
            <td class="main-text">Role 4</td>
            <td class="main-text">Custom role</td>
          </tr>
          <!-------------------------- KYC row-section -------------------------------->
          <tr class>
            <td class="main-text ps-3">KYC</td>
            <td class="check-text">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="user"
              >
                <b-form-checkbox value="View">View</b-form-checkbox>
                <b-form-checkbox value="Edit details">Edit details</b-form-checkbox>
                <b-form-checkbox value="Approve & reject">Approve & reject</b-form-checkbox>
                <b-form-checkbox value="Delete">Delete</b-form-checkbox>
                <b-form-checkbox value="Update Status">Update Status</b-form-checkbox>
              </b-form-checkbox-group>
            </td>
            <td class="check-text">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="user"
              >
                <b-form-checkbox value="View">View</b-form-checkbox>
                <b-form-checkbox value="Edit details">Edit details</b-form-checkbox>
                <b-form-checkbox value="Approve & reject">Approve & reject</b-form-checkbox>
                <b-form-checkbox value="Delete">Delete</b-form-checkbox>
                <b-form-checkbox value="Update Status">Update Status</b-form-checkbox>
              </b-form-checkbox-group>
            </td>
            <td class="check-text">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="user"
              >
                <b-form-checkbox value="View">View</b-form-checkbox>
                <b-form-checkbox value="Edit details">Edit details</b-form-checkbox>
                <b-form-checkbox value="Approve & reject">Approve & reject</b-form-checkbox>
                <b-form-checkbox value="Delete">Delete</b-form-checkbox>
                <b-form-checkbox value="Update Status">Update Status</b-form-checkbox>
              </b-form-checkbox-group>
            </td>
            <td class="check-text">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="user"
              >
                <b-form-checkbox value="View">View</b-form-checkbox>
                <b-form-checkbox value="Edit details">Edit details</b-form-checkbox>
                <b-form-checkbox value="Approve & reject">Approve & reject</b-form-checkbox>
                <b-form-checkbox value="Delete">Delete</b-form-checkbox>
                <b-form-checkbox value="Update Status">Update Status</b-form-checkbox>
              </b-form-checkbox-group>
            </td>
            <td class="check-text">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="user"
              >
                <b-form-checkbox value="View">View</b-form-checkbox>
                <b-form-checkbox value="Edit details">Edit details</b-form-checkbox>
                <b-form-checkbox value="Approve & reject">Approve & reject</b-form-checkbox>
                <b-form-checkbox value="Delete">Delete</b-form-checkbox>
                <b-form-checkbox value="Update Status">Update Status</b-form-checkbox>
              </b-form-checkbox-group>
            </td>
          </tr>
          <!-------------------------- Compliance row-section -------------------------------->
          <tr class>
            <td class="main-text ps-3">Compliance</td>
            <td class="check-text">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="user"
              >
                <b-form-checkbox value="View">View</b-form-checkbox>
                <b-form-checkbox value="Edit details">Edit details</b-form-checkbox>
                <b-form-checkbox value="Approve & reject">Approve & reject</b-form-checkbox>
                <b-form-checkbox value="Delete">Delete</b-form-checkbox>
                <b-form-checkbox value="Update Status">Update Status</b-form-checkbox>
              </b-form-checkbox-group>
            </td>
            <td class="check-text">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="user"
              >
                <b-form-checkbox value="View">View</b-form-checkbox>
                <b-form-checkbox value="Edit details">Edit details</b-form-checkbox>
                <b-form-checkbox value="Approve & reject">Approve & reject</b-form-checkbox>
                <b-form-checkbox value="Delete">Delete</b-form-checkbox>
                <b-form-checkbox value="Update Status">Update Status</b-form-checkbox>
              </b-form-checkbox-group>
            </td>
            <td class="check-text">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="user"
              >
                <b-form-checkbox value="View">View</b-form-checkbox>
                <b-form-checkbox value="Edit details">Edit details</b-form-checkbox>
                <b-form-checkbox value="Approve & reject">Approve & reject</b-form-checkbox>
                <b-form-checkbox value="Delete">Delete</b-form-checkbox>
                <b-form-checkbox value="Update Status">Update Status</b-form-checkbox>
              </b-form-checkbox-group>
            </td>
            <td class="check-text">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="user"
              >
                <b-form-checkbox value="View">View</b-form-checkbox>
                <b-form-checkbox value="Edit details">Edit details</b-form-checkbox>
                <b-form-checkbox value="Approve & reject">Approve & reject</b-form-checkbox>
                <b-form-checkbox value="Delete">Delete</b-form-checkbox>
                <b-form-checkbox value="Update Status">Update Status</b-form-checkbox>
              </b-form-checkbox-group>
            </td>
            <!-------------------------- Transactions row-section -------------------------------->
          </tr>
          <tr class>
            <td class="main-text ps-3">Transactions</td>
            <td class="check-text">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="user"
              >
                <b-form-checkbox value="View">View</b-form-checkbox>
                <b-form-checkbox value="Edit details">Edit details</b-form-checkbox>
                <b-form-checkbox value="Approve & reject">Approve & reject</b-form-checkbox>
                <b-form-checkbox value="Delete">Delete</b-form-checkbox>
                <b-form-checkbox value="Update Status">Update Status</b-form-checkbox>
              </b-form-checkbox-group>
            </td>
            <td class="check-text">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="user"
              >
                <b-form-checkbox value="View">View</b-form-checkbox>
                <b-form-checkbox value="Edit details">Edit details</b-form-checkbox>
                <b-form-checkbox value="Approve & reject">Approve & reject</b-form-checkbox>
                <b-form-checkbox value="Delete">Delete</b-form-checkbox>
                <b-form-checkbox value="Update Status">Update Status</b-form-checkbox>
              </b-form-checkbox-group>
            </td>
            <td class="check-text">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="user"
              >
                <b-form-checkbox value="View">View</b-form-checkbox>
                <b-form-checkbox value="Edit details">Edit details</b-form-checkbox>
                <b-form-checkbox value="Approve & reject">Approve & reject</b-form-checkbox>
                <b-form-checkbox value="Delete">Delete</b-form-checkbox>
                <b-form-checkbox value="Update Status">Update Status</b-form-checkbox>
              </b-form-checkbox-group>
            </td>
            <td class="check-text">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="user"
              >
                <b-form-checkbox value="View">View</b-form-checkbox>
                <b-form-checkbox value="Edit details">Edit details</b-form-checkbox>
                <b-form-checkbox value="Approve & reject">Approve & reject</b-form-checkbox>
                <b-form-checkbox value="Delete">Delete</b-form-checkbox>
                <b-form-checkbox value="Update Status">Update Status</b-form-checkbox>
              </b-form-checkbox-group>
            </td>
          </tr>
          <!-------------------------- Treasury row-section -------------------------------->

          <tr class>
            <td class="main-text ps-3">Treasury</td>
            <td class="check-text">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="user"
              >
                <b-form-checkbox value="View">View</b-form-checkbox>
                <b-form-checkbox value="Edit details">Edit details</b-form-checkbox>
                <b-form-checkbox value="Approve & reject">Approve & reject</b-form-checkbox>
                <b-form-checkbox value="Delete">Delete</b-form-checkbox>
                <b-form-checkbox value="Update Status">Update Status</b-form-checkbox>
              </b-form-checkbox-group>
            </td>
            <td class="check-text">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="user"
              >
                <b-form-checkbox value="View">View</b-form-checkbox>
                <b-form-checkbox value="Edit details">Edit details</b-form-checkbox>
                <b-form-checkbox value="Approve & reject">Approve & reject</b-form-checkbox>
                <b-form-checkbox value="Delete">Delete</b-form-checkbox>
                <b-form-checkbox value="Update Status">Update Status</b-form-checkbox>
              </b-form-checkbox-group>
            </td>
            <td class="check-text">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="user"
              >
                <b-form-checkbox value="View">View</b-form-checkbox>
                <b-form-checkbox value="Edit details">Edit details</b-form-checkbox>
                <b-form-checkbox value="Approve & reject">Approve & reject</b-form-checkbox>
                <b-form-checkbox value="Delete">Delete</b-form-checkbox>
                <b-form-checkbox value="Update Status">Update Status</b-form-checkbox>
              </b-form-checkbox-group>
            </td>
            <td class="check-text">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selected"
                :aria-describedby="ariaDescribedby"
                name="user"
              >
                <b-form-checkbox value="View">View</b-form-checkbox>
                <b-form-checkbox value="Edit details">Edit details</b-form-checkbox>
                <b-form-checkbox value="Approve & reject">Approve & reject</b-form-checkbox>
                <b-form-checkbox value="Delete">Delete</b-form-checkbox>
                <b-form-checkbox value="Update Status">Update Status</b-form-checkbox>
              </b-form-checkbox-group>
            </td>
          </tr>
        </table>
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
  height: 78vh;
}
/************************************top nav bar styles***********************/
.top-nav {
  background-color: #fffbf7;
}
.profile-img {
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
.tabs-div > div {
  display: flex;
  padding: 2px;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 1px solid #c4c4c4;
  border-radius: 3px;
  margin-right: 10px;
}
.tabs-div > div > div {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-right: 30px;
  color: #000000;
}
.i-active {
  color: #00d860;
  font-size: 9px;
}
.i-inactive {
  color: #c4c4c4;
  font-size: 9px;
}
.create-savebtn > button {
  background: #ff6b00;
  border-radius: 3px;
  padding-top: 3px;
  padding-bottom: 3px;
  border: none;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 17px;
  text-align: center;
  color: #ffffff;
}
.user-text {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 24px;
  color: #000000;
}
.bord-bottom > div {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 17px;
  color: #000000;
}
.border-role {
  border-bottom: 3px solid #ff6b00;
}
/******************************table style with checkboxes*********************************************/

.table-head {
  height: 25px;
}
.check-text {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;

  color: #000000;
}
.main-text {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: rgba(0, 0, 0, 0.5);
}
</style>