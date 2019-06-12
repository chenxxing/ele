import axios from 'axios'

export const GroupCity = () => {
    return axios.get('../../static/groupcity.json')
}
export const Guess = () => {
    return axios.get('../../static/guess.json')
}
export const HotCity = () => {
    return axios.get('../../static/hotcity.json')
}
export const SeachList = (cityid, value) => {
    return axios.get('../../static/seachlist.json')
}