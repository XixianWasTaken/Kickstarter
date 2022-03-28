import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xdC78724E8Cd1dC47ed194C7A8682f8c54d3d02a1'
)

export default instance