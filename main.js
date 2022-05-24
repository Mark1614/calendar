let currentTime = new Date()
render(currentTime)
//点击上个月
g('#preMonth').onclick = () => {
    //本月月初减一天
    const firstDayOfCurrentMonth = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1)
    render(new Date(firstDayOfCurrentMonth - 86400 * 1000))
}
//点击下个月
g('#nextMonth').onclick = () => {
    //先得到下月初
    const firstDayOfNextMonth = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 1)
    render(firstDayOfNextMonth)
}
//点击今天
g('#today').onclick = () => {
    render(new Date())
}
//帮助函数
function g(selector) {
    return document.querySelector(selector)
}
function gs(selector) {
    return document.querySelectorAll(selector)
}
function render(time) {
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    initTime()
    generateDays()
    currentTime = time
    function initTime() {
        const time = g('#time')
        time.textContent = `${year}年${month}月`
    }

    function generateDays() {
        //月初
        const firstDayOfCurrentMonth = new Date(year, month - 1, 1)
        console.log('月初：' + firstDayOfCurrentMonth)
        //本月月初是星期几
        let weekdayOfFirstDayOfCurrentMonth = firstDayOfCurrentMonth.getDay()
        console.log('月初是星期' + weekdayOfFirstDayOfCurrentMonth)
        const day = g('#day')
        day.innerHTML = ''
        let n = 0
        //下个月月初减去1天得到上个月的月末
        const nextMonthFirst = new Date(new Date(year, month - 1 + 1, 1) - 86400 * 1000)
        console.log('月末是' + nextMonthFirst)
        //月末是几号
        const monthLast = nextMonthFirst.getDate()
        console.log('月末是' + monthLast + '号')
        //月末星期几
        const nextMonthFirstDay = nextMonthFirst.getDay()
        console.log('月末是星期' + nextMonthFirstDay)
        const days = monthLast
        const now = new Date()
        let selectedLi
        //铺垫前面
        if (weekdayOfFirstDayOfCurrentMonth == 0) {
            weekdayOfFirstDayOfCurrentMonth = 7
        }
        for (let i = 1; i < weekdayOfFirstDayOfCurrentMonth; i++) {

            const li = document.createElement('li')
            const d = new Date(firstDayOfCurrentMonth - 86400 * 1000 * i)
            li.textContent = d.getDate()
            li.classList.add('calendar-days-disabled')
            day.prepend(li)
            n += 1
        }
        for (let i = 1; i <= days; i++) {
            const li = document.createElement('li')
            li.textContent = i
            if (i === now.getDate() && month === now.getMonth() + 1 && year === now.getFullYear()) {
                li.classList.add('calendar-days-today')
            }
            li.onclick = () => {
                if (selectedLi != null) {
                    selectedLi.classList.remove('calendar-days-selected')
                }
                li.classList.add('calendar-days-selected')
                selectedLi = li
            }
            day.append(li)
            n += 1
        }
        //铺垫后面
        let i = nextMonthFirstDay + 1
        for (let j = 0; j < 42 - n; j++) {
            const delta = i - nextMonthFirstDay
            const li = document.createElement('li')
            const d = new Date(nextMonthFirst - 0 + 86400 * 1000 * delta)
            li.textContent = d.getDate()
            li.classList.add('calendar-days-disabled')
            day.append(li)
            i++
        }
    }

}