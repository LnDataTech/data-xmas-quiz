let currentIndex = 0;
let sentTimes = 0;
const itemsContainer = document.querySelector(".items");
let itemDivs;
const backwardButton = document.querySelector("button[onclick='backward()']");
const forwardButton = document.querySelector("button[onclick='foward()']");
const current = document.querySelector(".current");

function backward() {
    if (currentIndex > 0) {
        currentIndex--;
        scrollToCurrentIndex();
    }
}

function foward() {
    if (currentIndex < itemDivs.length) {
        currentIndex++;
        scrollToCurrentIndex();
    }
}
//  隱藏/顯示按鈕功能
const hideButton = () => {
    current.innerText = currentIndex < 16 ? `${currentIndex + 1}/16` : ""; //  更新目前題號
    backwardButton.style.opacity = currentIndex === 0 ? "0" : "1"; //  如果是第一題，隱藏「上一題」按鈕
    forwardButton.style.opacity = currentIndex === itemDivs.length - 1 ? "0" : "1"; //  如果是最後一題，隱藏「下一題」按鈕

    //  檢查是否已選擇答案，如果已選擇則啟用「下一題」按鈕
    if (currentIndex < itemDivs.length - 1) {
        const requiredButtonsSelected = Array.from({length: 4}, (_, i) => `b${15 - currentIndex}${String.fromCharCode(97 + i)}`)
            .some(id => document.getElementById(id).classList.contains("selected"));
        forwardButton.disabled = !requiredButtonsSelected;
    }
}

function scrollToCurrentIndex() {
    const itemWidth = itemDivs[currentIndex].offsetWidth;
    const scrollPosition = itemWidth * currentIndex;
    itemsContainer.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
    });
    hideButton();
}

itemsContainer.addEventListener("scroll", function () {
    currentIndex = Math.round(itemsContainer.scrollLeft / itemDivs[0].offsetWidth);
    hideButton();
});

const questions = {
    "最後，你突然想到數據分析也許可以這麼應用於聖誕節…": [
        "預測熱門禮物",
        "優化禮物生產和派送",
        "分析聖誕活動的參與度",
        "提升顧客的聖誕購物體驗", 15],
    "你說，這趟旅程中其實認識很多新朋友，並且你對…印象最深": [
        "機智勇敢的魔法黑貓",
        "善良貼心的雪花精靈",
        "熱情活潑的糖果仙子",
        "穩重內斂的聖誕樹人", 14],    
    "你成功完成任務，回到家中與伴侶團聚。你會如何回憶這趟旅程？": [
        "寫一篇遊記，記錄你的冒險經歷",
        "整理你的照片和影片，製作成紀念冊",
        "與朋友分享你的故事，並展示你帶回來的紀念品",
        "思考你從這次旅程中學到了什麼", 13],
    "在飛行途中，你遇到暴風雪。你會如何應對？": [
        "降低飛行高度，尋找安全的降落地點",
        "利用氣象數據，預測暴風雪的走向",
        "向聖誕老人求助",
        "鼓勵馴鹿，一起克服困難", 12],
    "你需要駕駛馴鹿雪橇，將禮物送到世界各地。你會選擇哪種駕駛策略？": [
        "規劃好路線，按部就班地飛行",
        "根據天氣狀況，靈活調整飛行路線",
        "測試馴鹿的能力，例如飛行速度、耐力、特殊魔法等行",
        "相信馴鹿的經驗，讓牠們帶路與判斷。", 11],
    "聖誕老人希望你能幫忙優化禮物派送路線，你會先怎麼做？": [
        "分析各地區的禮物需求量和距離",
        "研究並考慮交通工具的承載量和速度",
        "設計最佳的派送路線，節省時間和成本",
        "利用科技工具，例如 GPS 導航系統", 10],
    "你來到聖誕老人的禮物工廠，發現禮物生產線出現故障。你會如何解決？": [
        "檢查生產線的每個環節，找出故障原因",
        "收集生產數據，分析故障發生的規律",
        "向工廠的精靈請教，了解生產流程",
        " 嘗試重新啟動生產線，看看能否恢復正常", 9],
    "在迷宮中，你遇到一群迷路的小精靈。你會如何幫助祂們？": [
        "詢問祂們迷路的原因，分析祂們走過的路徑",
        "帶領祂們一起尋找出口",
        "教祂們使用地圖和指南針",
        "安慰祂們，並分享你的蛋糕", 8],
    "你來到聖誕世界，發現自己身處一個巨大的聖誕樹迷宮。你會如何找到出口？": [
        "觀察迷宮的結構，尋找規律。",
        "尋找有無指南針或地圖導航",
        "爬到樹頂，俯瞰整個迷宮",
        "跟著感覺走，相信自己的直覺", 7],
    "你最後買了一個蛋糕。回家路上，一個神秘人將一封邀請函交到你手上，原來是聖誕老人邀請你到聖誕世界幫忙，並答應給你超棒的聖誕禮物。你會怎麼做？": [
        "立刻回覆，迫不及待地想要去冒險",
        "仔細閱讀邀請函，確認細節和注意事項",
        "上網搜尋聖誕世界的資料，做好準備",
        "打給伴侶尋問他的意見", 6],
    "下班後，你想去買聖誕禮物給伴侶，你會...": [
        "目標明確，直接跑去買",
        "上網仔細搜尋評價",
        "先去到店裡面再挑",
        "找朋友一起去或詢問別人意見",5],
    "下班時，發現做整天的報告忘記儲存，你會...": [
        "加班做完",
        "隨便啦，明天再說",
        "自暴自棄，覺得非常崩潰",
        "雖然機會不大，想辦法復原", 4],
    "開會時，被主管罵了，說你的分析結果有問題。這時候你會...": [
        "據理力爭，證明自己是對的",
        "默默忍受，今天早點下班",
        "冷靜思辨，討論更好的做法",
        "回去沉澱，下次準備更充足", 3],
    "因為是聖誕節，所以要分析的資料量特別大，你會..": [
        "仔細檢查，確認清理乾淨與正確",
        "看同事是否有空可以協助",
        "設定自動化，省力完成工作",
        "重新規劃進度，看看有沒有更好的方法", 2],
    "準備出門上班，到公司後你發現忘記帶電腦充電線，你會...": [
        "馬上回家拿",
        "覺得沒差",
        "跟同事借",
        "中午午休再回去", 1],
    "平安夜早晨，你想做的第一件事是?": [
        "刷牙洗臉",
        "來個早餐",
        "檢查手機",
        "關掉鬧鐘", 0],
}

const leftElement = document.getElementById("left");

const start = () => {
    document.getElementById("start").classList.add("too");
    const ahhhh = document.querySelector(".ahhhh");
    const keysArray = Object.keys(questions);
    const selectedKeys = [];

    for (let i = 0; i < keysArray.length; i++) {
        var divElement = document.createElement("div");
        divElement.innerHTML = `
            <h4 class="questions">${keysArray[i]}</h4>
            <button id="b${i}a" onclick="select(${i}, 'a')" class="q${questions[keysArray[i]][4]}">${questions[keysArray[i]][0]}</button>
            <button id="b${i}b" onclick="select(${i}, 'b')" class="q${questions[keysArray[i]][4]}">${questions[keysArray[i]][1]}</button>
            <button id="b${i}c" onclick="select(${i}, 'c')" class="q${questions[keysArray[i]][4]}">${questions[keysArray[i]][2]}</button>
            <button id="b${i}d" onclick="select(${i}, 'd')" class="q${questions[keysArray[i]][4]}">${questions[keysArray[i]][3]}</button>
        `;
        leftElement.insertAdjacentElement("afterend", divElement);
    }
    itemDivs = document.querySelectorAll(".items div");
    

    scrollToCurrentIndex();
    ahhhh.innerText = "."
    setTimeout(function () {
        ahhhh.innerText = ".."
    }, 1000);
    setTimeout(function () {
        ahhhh.innerText = "..."
    }, 1500);
    setTimeout(function () {
        document.getElementById("start").classList.remove("too");
        document.getElementById("start").classList.add("started");
    }, 2000);
}

// 初始化角色分數
let roleScores = {
    "聖誕企鵝": 0,
    "聖誕薑餅人": 0,
    "聖誕雪人": 0,
    "聖誕麋鹿": 0,
    "聖誕老人": 0,
    "隱藏角色": 0,
};

// 記錄每題選擇的選項
const selectedOptions = new Array(15).fill(null);

// 處理選擇邏輯
const select = (e, option) => {
    // 移除該題的所有選項的 "selected" 樣式
    document.getElementById(`b${e}a`).classList.remove("selected");
    document.getElementById(`b${e}b`).classList.remove("selected");
    document.getElementById(`b${e}c`).classList.remove("selected");
    document.getElementById(`b${e}d`).classList.remove("selected");

    // 新增選中的 "selected" 樣式
    document.getElementById(`b${e}${option}`).classList.add("selected");

    // 更新該題的選擇記錄
    selectedOptions[e] = `b${e}${option}`;

    // 清零角色分數，重新計算
    for (const role in roleScores) {
        roleScores[role] = 0;
    }

    // 計算每題選擇的分數
    selectedOptions.forEach((optionId) => {
        if (optionId && optionScores[optionId]) {
            for (const role in optionScores[optionId]) {
                roleScores[role] += optionScores[optionId][role];
            }
        }
    });

    // 顯示每個角色的分數
    console.log("各角色分數：", roleScores);

    // 前往下一題
    foward();
};


let user = "";
const resultPage = document.getElementById("result");

// 定義每個選項對應的角色分數
const optionScores = {
    "b15a": { "聖誕雪人": 1, "聖誕薑餅人": 0, "聖誕企鵝": 0, "聖誕麋鹿": 2, "聖誕老人": 0 , "隱藏角色": 0},
    "b15b": { "聖誕雪人": 0, "聖誕薑餅人": 0, "聖誕企鵝": 2, "聖誕麋鹿": 0, "聖誕老人": 0 , "隱藏角色": 1},
    "b15c": { "聖誕雪人": 2, "聖誕薑餅人": 1, "聖誕企鵝": 0, "聖誕麋鹿": 0, "聖誕老人": 1 , "隱藏角色": 0},
    "b15d": { "聖誕雪人": 0, "聖誕薑餅人": 0, "聖誕企鵝": 1, "聖誕麋鹿": 0, "聖誕老人": 2 , "隱藏角色": 0},
    "b14a": { "聖誕雪人": 0, "聖誕薑餅人": 1, "聖誕企鵝": 0, "聖誕麋鹿": 3, "聖誕老人": 1 , "隱藏角色": 0},
    "b14b": { "聖誕雪人": 0, "聖誕薑餅人": 0, "聖誕企鵝": 0, "聖誕麋鹿": 0, "聖誕老人": 0 , "隱藏角色": 2},
    "b14c": { "聖誕雪人": 1, "聖誕薑餅人": 2, "聖誕企鵝": 0, "聖誕麋鹿": 2, "聖誕老人": 3 , "隱藏角色": 0},
    "b14d": { "聖誕雪人": 2, "聖誕薑餅人": 1, "聖誕企鵝": 1, "聖誕麋鹿": 0, "聖誕老人": 0 , "隱藏角色": 1},
    "b13a": { "聖誕雪人": 1, "聖誕薑餅人": 2, "聖誕企鵝": 3, "聖誕麋鹿": 0, "聖誕老人": 0 , "隱藏角色": 0},
    "b13b": { "聖誕雪人": 0, "聖誕薑餅人": 2, "聖誕企鵝": 2, "聖誕麋鹿": 1, "聖誕老人": 1 , "隱藏角色": 2},
    "b13c": { "聖誕雪人": 3, "聖誕薑餅人": 1, "聖誕企鵝": 2, "聖誕麋鹿": 2, "聖誕老人": 1 , "隱藏角色": 0},
    "b13d": { "聖誕雪人": 1, "聖誕薑餅人": 1, "聖誕企鵝": 1, "聖誕麋鹿": 3, "聖誕老人": 2 , "隱藏角色": 0},
    "b12a": { "聖誕雪人": 0, "聖誕薑餅人": 0, "聖誕企鵝": 2, "聖誕麋鹿": 1, "聖誕老人": 1 , "隱藏角色": 3},
    "b12b": { "聖誕雪人": 2, "聖誕薑餅人": 1, "聖誕企鵝": 0, "聖誕麋鹿": 0, "聖誕老人": 0 , "隱藏角色": 0},
    "b12c": { "聖誕雪人": 0, "聖誕薑餅人": 0, "聖誕企鵝": 0, "聖誕麋鹿": 2, "聖誕老人": 2 , "隱藏角色": 0},
    "b12d": { "聖誕雪人": 3, "聖誕薑餅人": 2, "聖誕企鵝": 1, "聖誕麋鹿": 0, "聖誕老人": 1 , "隱藏角色": 0},
    "b11a": { "聖誕雪人": 3, "聖誕薑餅人": 2, "聖誕企鵝": 1, "聖誕麋鹿": 2, "聖誕老人": 1 , "隱藏角色": 0},
    "b11b": { "聖誕雪人": 0, "聖誕薑餅人": 1, "聖誕企鵝": 0, "聖誕麋鹿": 0, "聖誕老人": 0 , "隱藏角色": 2},
    "b11c": { "聖誕雪人": 1, "聖誕薑餅人": 1, "聖誕企鵝": 0, "聖誕麋鹿": 2, "聖誕老人": 0 , "隱藏角色": 3},
    "b11d": { "聖誕雪人": 2, "聖誕薑餅人": 0, "聖誕企鵝": 3, "聖誕麋鹿": 0, "聖誕老人": 1 , "隱藏角色": 0},
    "b10a": { "聖誕雪人": 1, "聖誕薑餅人": 2, "聖誕企鵝": 0, "聖誕麋鹿": 1, "聖誕老人": 0 , "隱藏角色": 2},
    "b10b": { "聖誕雪人": 1, "聖誕薑餅人": 3, "聖誕企鵝": 2, "聖誕麋鹿": 1, "聖誕老人": 0 , "隱藏角色": 0},
    "b10c": { "聖誕雪人": 1, "聖誕薑餅人": 0, "聖誕企鵝": 1, "聖誕麋鹿": 0, "聖誕老人": 1 , "隱藏角色": 0},
    "b10d": { "聖誕雪人": 0, "聖誕薑餅人": 1, "聖誕企鵝": 0, "聖誕麋鹿": 2, "聖誕老人": 2 , "隱藏角色": 1},
    "b9a": { "聖誕雪人": 0, "聖誕薑餅人": 1, "聖誕企鵝": 3, "聖誕麋鹿": 0, "聖誕老人": 2 , "隱藏角色": 3},
    "b9b": { "聖誕雪人": 2, "聖誕薑餅人": 2, "聖誕企鵝": 1, "聖誕麋鹿": 2, "聖誕老人": 1 , "隱藏角色": 0},
    "b9c": { "聖誕雪人": 1, "聖誕薑餅人": 0, "聖誕企鵝": 0, "聖誕麋鹿": 3, "聖誕老人": 0 , "隱藏角色": 0},
    "b9d": { "聖誕雪人": 0, "聖誕薑餅人": 1, "聖誕企鵝": 0, "聖誕麋鹿": 1, "聖誕老人": 2 , "隱藏角色": 1},
    "b8a": { "聖誕雪人": 2, "聖誕薑餅人": 3, "聖誕企鵝": 2, "聖誕麋鹿": 1, "聖誕老人": 0 , "隱藏角色": 0},
    "b8b": { "聖誕雪人": 1, "聖誕薑餅人": 1, "聖誕企鵝": 1, "聖誕麋鹿": 2, "聖誕老人": 3 , "隱藏角色": 0},
    "b8c": { "聖誕雪人": 0, "聖誕薑餅人": 2, "聖誕企鵝": 0, "聖誕麋鹿": 3, "聖誕老人": 1 , "隱藏角色": 0},
    "b8d": { "聖誕雪人": 1, "聖誕薑餅人": 0, "聖誕企鵝": 2, "聖誕麋鹿": 0, "聖誕老人": 1 , "隱藏角色": 3},
    "b7a": { "聖誕雪人": 1, "聖誕薑餅人": 3, "聖誕企鵝": 0, "聖誕麋鹿": 0, "聖誕老人": 2 , "隱藏角色": 0},
    "b7b": { "聖誕雪人": 0, "聖誕薑餅人": 1, "聖誕企鵝": 2, "聖誕麋鹿": 2, "聖誕老人": 2 , "隱藏角色": 0},
    "b7c": { "聖誕雪人": 0, "聖誕薑餅人": 1, "聖誕企鵝": 1, "聖誕麋鹿": 1, "聖誕老人": 3 , "隱藏角色": 0},
    "b7d": { "聖誕雪人": 0, "聖誕薑餅人": 0, "聖誕企鵝": 1, "聖誕麋鹿": 1, "聖誕老人": 1 , "隱藏角色": 2},
    "b6a": { "聖誕雪人": 3, "聖誕薑餅人": 2, "聖誕企鵝": 1, "聖誕麋鹿": 3, "聖誕老人": 2 , "隱藏角色": 0},
    "b6b": { "聖誕雪人": 1, "聖誕薑餅人": 3, "聖誕企鵝": 2, "聖誕麋鹿": 0, "聖誕老人": 1 , "隱藏角色": 0},
    "b6c": { "聖誕雪人": 0, "聖誕薑餅人": 1, "聖誕企鵝": 1, "聖誕麋鹿": 2, "聖誕老人": 3 , "隱藏角色": 0},
    "b6d": { "聖誕雪人": 2, "聖誕薑餅人": 0, "聖誕企鵝": 3, "聖誕麋鹿": 1, "聖誕老人": 0 , "隱藏角色": 1},
    "b5a": { "聖誕雪人": 0, "聖誕薑餅人": 2, "聖誕企鵝": 0, "聖誕麋鹿": 1, "聖誕老人": 2 , "隱藏角色": 0},
    "b5b": { "聖誕雪人": 1, "聖誕薑餅人": 1, "聖誕企鵝": 2, "聖誕麋鹿": 2, "聖誕老人": 1 , "隱藏角色": 0},
    "b5c": { "聖誕雪人": 3, "聖誕薑餅人": 1, "聖誕企鵝": 2, "聖誕麋鹿": 2, "聖誕老人": 1 , "隱藏角色": 0},
    "b5d": { "聖誕雪人": 2, "聖誕薑餅人": 0, "聖誕企鵝": 3, "聖誕麋鹿": 0, "聖誕老人": 0 , "隱藏角色": 0},
    "b4a": { "聖誕雪人": 3, "聖誕薑餅人": 1, "聖誕企鵝": 0, "聖誕麋鹿": 2, "聖誕老人": 0 , "隱藏角色": 0},
    "b4b": { "聖誕雪人": 0, "聖誕薑餅人": 1, "聖誕企鵝": 0, "聖誕麋鹿": 3, "聖誕老人": 2 , "隱藏角色": 2},
    "b4c": { "聖誕雪人": 2, "聖誕薑餅人": 2, "聖誕企鵝": 3, "聖誕麋鹿": 1, "聖誕老人": 1 , "隱藏角色": 2},
    "b4d": { "聖誕雪人": 1, "聖誕薑餅人": 0, "聖誕企鵝": 1, "聖誕麋鹿": 0, "聖誕老人": 2 , "隱藏角色": 3},
    "b3a": { "聖誕雪人": 2, "聖誕薑餅人": 0, "聖誕企鵝": 0, "聖誕麋鹿": 3, "聖誕老人": 1 , "隱藏角色": 0},
    "b3b": { "聖誕雪人": 3, "聖誕薑餅人": 1, "聖誕企鵝": 3, "聖誕麋鹿": 0, "聖誕老人": 0 , "隱藏角色": 0},
    "b3c": { "聖誕雪人": 0, "聖誕薑餅人": 1, "聖誕企鵝": 0, "聖誕麋鹿": 2, "聖誕老人": 2 , "隱藏角色": 1},
    "b3d": { "聖誕雪人": 0, "聖誕薑餅人": 0, "聖誕企鵝": 0, "聖誕麋鹿": 0, "聖誕老人": 3 , "隱藏角色": 2},
    "b2a": { "聖誕雪人": 2, "聖誕薑餅人": 0, "聖誕企鵝": 1, "聖誕麋鹿": 1, "聖誕老人": 0 , "隱藏角色": 2},
    "b2b": { "聖誕雪人": 1, "聖誕薑餅人": 3, "聖誕企鵝": 0, "聖誕麋鹿": 2, "聖誕老人": 1 , "隱藏角色": 2},
    "b2c": { "聖誕雪人": 0, "聖誕薑餅人": 0, "聖誕企鵝": 0, "聖誕麋鹿": 1, "聖誕老人": 3 , "隱藏角色": 2},
    "b2d": { "聖誕雪人": 1, "聖誕薑餅人": 1, "聖誕企鵝": 3, "聖誕麋鹿": 0, "聖誕老人": 0 , "隱藏角色": 3},
    "b1a": { "聖誕雪人": 1, "聖誕薑餅人": 1, "聖誕企鵝": 3, "聖誕麋鹿": 3, "聖誕老人": 1 , "隱藏角色": 2},
    "b1b": { "聖誕雪人": 0, "聖誕薑餅人": 3, "聖誕企鵝": 0, "聖誕麋鹿": 1, "聖誕老人": 2 , "隱藏角色": 0},
    "b1c": { "聖誕雪人": 0, "聖誕薑餅人": 1, "聖誕企鵝": 0, "聖誕麋鹿": 0, "聖誕老人": 2 , "隱藏角色": 3},
    "b1d": { "聖誕雪人": 3, "聖誕薑餅人": 1, "聖誕企鵝": 1, "聖誕麋鹿": 1, "聖誕老人": 0 , "隱藏角色": 0},
    "b0a": { "聖誕雪人": 2, "聖誕薑餅人": 1, "聖誕企鵝": 3, "聖誕麋鹿": 0, "聖誕老人": 1 , "隱藏角色": 1},
    "b0b": { "聖誕雪人": 3, "聖誕薑餅人": 0, "聖誕企鵝": 2, "聖誕麋鹿": 0, "聖誕老人": 1 , "隱藏角色": 0},
    "b0c": { "聖誕雪人": 0, "聖誕薑餅人": 3, "聖誕企鵝": 0, "聖誕麋鹿": 1, "聖誕老人": 2 , "隱藏角色": 0},
    "b0d": { "聖誕雪人": 0, "聖誕薑餅人": 2, "聖誕企鵝": 1, "聖誕麋鹿": 0, "聖誕老人": 2 , "隱藏角色": 0},
};

const sendTo = () => {

    //  找出最高分的角色
    let highestScore = 0;
    let highestScoreRole = "";
    for (const role in roleScores) {
        if (roleScores[role] > highestScore) {
            highestScore = roleScores[role];
            highestScoreRole = role;
        }
    }
    console.log("最高分的角色：", highestScoreRole);

    //  顯示結果
    const text = highestScoreRole;
    resultPage.innerHTML = `
        <div class="wrap">
            <h2>${user}的數據聖誕角色是：<br class="mobile">${text}</h2>
            <img id="image" src="assets/數據${text}.png" alt="你是${text}">
            <div class="disclaimer">測驗結果僅供參考</div>
            <div class="buttons">
                <p>
                    最後，恭喜你完成任務，聖誕老人依照約定送了一份驚喜禮包給你，趕快打開看看吧！歡迎你再多測試幾次，或是分享給朋友一起來玩喔！
                </p>
                <button class="gift" onclick="openGiftLink()"><a id="gift-link" href="https://docs.google.com/forms/d/e/1FAIpQLSdx-fXbe8DhSQQh4fa44UgMkWThh0iH-qGb3wzOwLZrsrJCtQ/viewform?usp=header" target="_blank">打開禮物</a></button>
            </div>
            <div class="buttons">
                <button onclick="location.reload()"><i class="fas fa-redo"></i>  再玩一次  </button>
                <button onclick="showModal()"><i class="fas fa-share-alt"></i>  邀請好友  </button>
                <div id="social-share-modal" class="modal">
                    <div class="modal-content">
                        <span class="close-button" onclick="closeModal()">&times;</span>
                        <h3>分享給別人來玩</h3>
                        <a href="https://social-plugins.line.me/lineit/share?url=https://lndatatech.github.io/data-xmas-quiz/" target="_blank" class="social-share-button" data-platform="line">
                            <i class="fab fa-line"></i>  LINE  </a>
                        <a href="https://www.facebook.com/sharer.php?u=https://lndatatech.github.io/data-xmas-quiz/" target="_blank" class="social-share-button" data-platform="facebook">
                            <i class="fab fa-facebook"></i>  Facebook  </a>
                        <a href="https://twitter.com/intent/tweet?text=超好玩的心理測驗&url=https://lndatatech.github.io/data-xmas-quiz/&via=LnData_Official" target="_blank" class="social-share-button" data-platform="twitter">
                            <i class="fab fa-twitter"></i>  Twitter  </a>
                        <a href="https://wa.me/?text=%E6%88%91%E5%9C%A8%E8%81%96%E8%AA%95%E7%AF%80%E7%8E%A9%E4%BA%86%E4%B8%80%E5%80%8B%E6%9C%89%E8%B6%A3%E7%9A%84%E6%B8%AC%E9%A9%97%EF%BC%8C%E4%BD%A0%E4%B9%9F%E4%BE%86%E8%A9%A6%E8%A9%A6%E7%9C%8B%EF%BC%81https://lndatatech.github.io/data-xmas-quiz/" target="_blank" class="social-share-button" data-platform="whatsapp">
                            <i class="fab fa-whatsapp"></i>  WhatsApp  </a>
                        <a href="https://www.pinterest.com/pin/create/button/?u=https://lndatatech.github.io/data-xmas-quiz/&media=https://lndatatech.github.io/data-xmas-quiz/assets/bg.png&description=聖誕數據心理測驗" target="_blank" class="social-share-button" data-platform="pinterest">
                            <i class="fab fa-pinterest"></i>  Pinterest  </a>
                        <button onclick="copyUrl()">
                            <i class="fas fa-link"></i>  複製網址  </button>
                        <button onclick="shareResult()">
                            <i class="fas fa-ellipsis-h"></i>  更多+  </button>
                    </div>
                </div>
            </div>
            <hr style="margin-top:20px">
            <div class="about-us">
                <h3>關於我們</h3>
                <h4>LnData 麟數據科技</h4>
                <img src="./assets/lndata_logo.png" class="lndatalogo">
                <p>LnData 是台灣的數據顧問公司，藉由多元先進的各類數據服務，協助企業進行數據採集、數據清洗、數據治理到最後的數據應用，將最真實且完整的數據運用在每次商業決策中，取得市場先機。
                </p>
                <a href="https://www.lndata.com/?utm_source=quiz&utm_campaign=2024-xmas" target="_blank">了解更多</a>
            </div>
            <hr>
            <div class="recommended-reading">
                <h3>你可能有興趣</h3>
                <ul>
                    <li><a href="https://www.104.com.tw/company/1a2x6bjpwh" target="_blank">加入我們</a></li>
                    <li><a href="https://lndatatech.github.io/taiwan-career/" target="_blank">台灣職場生態數據專題</a></li>
                    <li><a href="https://lndatatech.github.io/taiwan-drink/" target="_blank">台灣手搖飲數據專題</a></li>
                </ul>
            </div>
        </div>
        
    `;

    // 將 #result 的 display 屬性設定為 flex
    resultPage.style.display = 'flex'; 
}

//  結束測驗功能
const end = () => {
    user = document.getElementById("name").value; //  取得使用者輸入的姓名
    if (user === "") { //  檢查是否已輸入姓名
        alert("請輸入名字?"); //  顯示提示訊息
        return; //  停止執行
    }
    sendTo(); //  呼叫 sendTo() 函式，計算結果並顯示

    canvas.style.display = 'none';
}

// 分享結果函式
function shareResult() {
    if (navigator.share) {
        navigator.share({
            title: '聖誕數據奇幻之旅',
            text: '我發現我的數據天賦是...',
            url: window.location.href
        })
        .then(() => console.log('分享成功'))
        .catch((error) => console.log('分享失敗', error));
    } else {
        //  如果瀏覽器不支援 Web Share API，顯示其他分享選項
        alert("您的瀏覽器不支援分享功能，請複製網址手動分享。");
    }
}

function copyUrl() {
    const url = window.location.href; // 取得目前網址
  
    // 建立一個暫時的 textarea 元素
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = url;
    document.body.appendChild(tempTextArea);
  
    // 選擇 textarea 中的文字
    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999); // 兼容行動裝置
  
    // 執行複製命令
    document.execCommand("copy");
  
    // 移除暫時的 textarea 元素
    document.body.removeChild(tempTextArea);
  
    // 顯示複製成功的訊息
    alert("網址已複製到剪貼簿！");
  }

// 顯示 modal
function showModal() {
    document.getElementById("social-share-modal").style.display = "block";
}

// 關閉 modal
function closeModal() {
    document.getElementById("social-share-modal").style.display = "none";
}

document.getElementById("name").addEventListener("input", function () {
    var full = this.value.match(/[^\x00-\x80]/g);
    if (this.value.length + full.length > 16) this.value = this.value.slice(0, this.value.length - 1);
})

const canvas = document.getElementById('snowfall-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowflakes = []; // 存放雪花物件的陣列

// 載入 SVG 雪花圖案
const svgSnowflake = new Image();
svgSnowflake.src = './assets/snow.svg'; // 將路徑替換為您的 SVG 檔案路徑

// 雪花物件
function Snowflake() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height; // 限制雪花落下的範圍
    this.size = Math.random() * 2 + 1;
    this.speed = Math.random() * 1 + 0.1;
    this.opacity = Math.random() * 0.5 + 0.5;
    this.useSvg = Math.random() < 0.2; // 50% 的機率使用 SVG 圖案

    this.draw = function () {
        if (this.useSvg) {
            // 繪製 SVG 圖案
            const size = this.size * 4; // 調整 SVG 圖案的大小
            ctx.drawImage(svgSnowflake, this.x - size / 2, this.y - size / 2, size, size);
        } else {
            // 繪製圓形圖案
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    this.update = function () {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -this.size;
        }
        this.draw();
    }
}

// 建立雪花物件
for (let i = 0; i < 80; i++) {
    snowflakes.push(new Snowflake());
}

// 動畫迴圈
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snowflakes.forEach(snowflake => snowflake.update());
}

animate();

// 獲取音樂控制按鈕和背景音樂元素
const musicToggleButton = document.getElementById('music-toggle-button');
const backgroundMusic = document.getElementById('background-music');

// 新增音樂控制按鈕的點擊事件
musicToggleButton.addEventListener('click', () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    musicToggleButton.innerHTML = '<i class="fas fa-volume-up"></i>'; // 顯示音量開啟 icon
  } else {
    backgroundMusic.pause();
    musicToggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>'; // 顯示音量關閉 icon
  }
});

function openGiftLink() {
    document.getElementById('gift-link').click();
  }