import BaseDataService from "./_base-data.service";
import { DealModel } from "../models/deal.model";

export class DealModels extends BaseDataService {
  getDeals() {
    return this.fetch("gift/special-gift/all/", DealModel);
  }
}

const service = new SpecialGiftService();
export default service;
