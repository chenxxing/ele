//设置本地存储
export const setstore = (name,content) => {
    if(!name){
        return ;
    }
    if(typeof content !== 'string'){
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name,content)
}
//获取本地存储
export const getstore = (name) => {
    if(!name) return ;
    return window.localStorage.getItem(name)
}

//删除本地存储

export const removestore = name => {
    if(!name) return ;
    window.localStorage.removeItem(name);
}
