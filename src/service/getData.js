import axios from 'axios'

export const GroupCity = () => {
    return axios.get('static/groupcity.json')
}
export const Guess = () => {
    return axios.get('static/guess.json')
}
export const HotCity = () => {
    return axios.get('static/hotcity.json')
}
export const SeachList = (cityid, value) => {
    return axios.get('static/seachlist.json')
}
export const msiteFoodTypes = (geohash) => {
    return axios.get('static/shoptype.json')
}
export const restaurants = () => {
    return axios.get('static/restaurants.json')
}
export const taurants = () => {
    return axios.get('static/taurants.json')
}
export const category = () => {
    return axios.get('static/category.json')
}