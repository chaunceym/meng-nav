const $siteAll = $('.allSite')
const $lastLi = $siteAll.find('li.last')
const webSiteData = localStorage.getItem('webSiteData')
const data = JSON.parse(webSiteData)
const hashMap = data ||  [
    {
        logo: 'V', bgColor: 'yellow', url: 'https://vuejs.org'
    },
    {
        logo: 'R', bgColor: 'red', url: 'https://reactjs.org'
    },
    {
        logo: 'J', bgColor: 'yellow', url: 'https://juejin.im/timeline'
    },
]

const replaceUrl = (url) => {
    return url
        .replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/,'') // 正则
}

const render = () => {
    $siteAll.find('li:not(.last)').remove()
    hashMap.forEach((node,index) => {
        const $li = $(`<li>
                <div class="site ">
                <div class="logo">${node.logo}</div>
                <div class="link">${replaceUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
                </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', ()=>{
            window.open(node.url, '_self')
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()
$('.addButton').on('click', ()=>{
    let url = window.prompt('请问你想输入的网址是什么？')
    const oldUrl = url
    if(url.indexOf('http') !== 0){
        url = 'https://' + url
    }
    hashMap.push({
        logo: replaceUrl(url)[0].toUpperCase(),
        siteId: 'text',
        url: url
    })
    render()
})

window.onbeforeunload = () => {
    // const string = JSON.stringify(hashMap)
    // localStorage.setItem('webSiteData', string)
}

$(document).on('keypress', (e)=>{
    const {key} = e
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url,'_self')
        }
    }
})