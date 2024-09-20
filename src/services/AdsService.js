import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Ad } from "@/models/Ad.js"


class AdsService {
  async getAds() {
    const response = await api.get('api/ads')

    logger.log('Got the Ads', response.data)
    const newAds = response.data.map(adPOJO => new Ad(adPOJO))
    AppState.ads = newAds
  }
}

export const adsService = new AdsService()