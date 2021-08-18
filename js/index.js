const pickerBtn = $(".picker");
const pickerList = $(".picker-list");
const logo = $(".logo");
const input = $("#search-input");
const button = $(".search");

init = function() {
    /* 搜索类别选择按钮 */
    pickerBtn.click(function() {
        if (pickerList.is(':hidden')) {
            setTimeout(function() {
                pickerList.show();
            }, 100);
        }
    });
    /* 搜索类别选择列表 */
    pickerList.on("click", ">li", function() {
        logo.css("background-image", ('url(img/' + $(this).data("logo") + ')'));
        searchIndex = $(this).index();
        pickerBtn.html($(this).html())
    });
    /* 搜索按钮 */
    button.click(function() {
        if (searchIndex == 0) {
            var open_url = "https://www.baidu.com/s?ie=utf-8&wd=" + input.val();
            window.open(open_url);
        } else {
            var open_url = "http://www.google.com/search?q=" + input.val();
            window.open(open_url);
        }

    });
    /* 文档 */
    $(document).click(function() {
        pickerList.hide();
        // hotList.hide();
    });
    /* 搜索按钮 */
}

const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObjext = JSON.parse(x)
const hashMap = xObjext || [
    { logo: 'G', url: 'https://www.github.com' },
    { logo: 'B', url: 'https://www.bilibili.com' },
    { logo: 'H', url: 'http://www.htmleaf.com/' },
    { logo: 'J', url: 'https://www.jq22.com/' },

]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除 / 开头的内容
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(
            `<li>
                <div class="site">
                    <div class="logo"> ${node.logo} </div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg t="1629011863627" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3204" width="200" height="200"><path d="M853.333333 554.666667H170.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666667h682.666666c23.466667 0 42.666667 19.2 42.666667 42.666667s-19.2 42.666667-42.666667 42.666667z" p-id="3205"></path>
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>                         
                </div>
                 
            </li> `).insertBefore($lastLi)

        $li.on('click', () => {
            window.open(node.url)
        })

        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()

        })

    });

}

render()

$('.addButton').on('click', () => {
    let url = window.prompt("请输入你要添加的网址")
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }

    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    });

    render()

});
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})