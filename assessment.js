'use strict'

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

function removeAllChildren(element){
    while (element.firstChild){
        element.removeChild(element.firstChild);
    }
}

//ボタンに反応
assessmentButton.onclick = function(){
    const userName = userNameInput.value;
    if (userName.length === 0){
        return;
    } //０文字入力の時は処理を終了する

//診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

//ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue ='https://twitter.com/intent/tweet?button_hashtag='
      + encodeURIComponent('あなたのいいところ')
      +'&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className ='twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText ='tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widhets.js');
    tweetDivided.appendChild(script);

};

//enterキーにも反応
userNameInput.onkeydown =(event) =>　{
    if (event.key === 'enter'){
        assessmentButton.onclick();
    }
};

//診断結果リスト
const answers=[
    '{userName}のいいところは１です。{userName}の１は素敵です。',
    '{userName}のいいところは２です。{userName}の２は素敵です。',
    '{userName}のいいところは３です。{userName}の３は素敵です。',
    '{userName}のいいところは４です。{userName}の４は素敵です。',
    '{userName}のいいところは５です。{userName}の５は素敵です。',
    '{userName}のいいところは６です。{userName}の６は素敵です。',
    '{userName}のいいところは７です。{userName}の７は素敵です。',
    '{userName}のいいところは８です。{userName}の８は素敵です。',
    '{userName}のいいところは９です。{userName}の９は素敵です。',
    '{userName}のいいところは１０です。{userName}の１０は素敵です。',
    '{userName}のいいところは１１です。{userName}の１１は素敵です。',
    '{userName}のいいところは１２です。{userName}の１２は素敵です。',
    '{userName}のいいところは１３です。{userName}の１３は素敵です。',
    '{userName}のいいところは１４です。{userName}の１４は素敵です。',
    '{userName}のいいところは１５です。{userName}の１５は素敵です。',
    '{userName}のいいところは優しさです。'
];

/**
 * 名前の文字列を渡すと診断結果を返すプログラム
 * @param {string} userName ユーザーの名前
 * @returns  {string} 診断結果
*/

function assessment(userName){
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++){
        sumOfCharCode =　sumOfCharCode + userName.charCodeAt(i);
    }
    //剰余類で診断する
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    //ユーザー名を置き換える
    result = result.replace(/\{userName\}/g, userName);
    return result;
}
