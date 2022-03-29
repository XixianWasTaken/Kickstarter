import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x79700496DaE2364b1179C4F52aBb86c3FAA4C3E2'
)

export default instance