const problems = [
    { 
        question: "変数 'message' に 'Hello, World!' という文字列を代入し、コンソールに出力してください。", 
        answer: "const message = 'Hello, World!';\nconsole.log(message);" 
    },
    { 
        question: "変数 'a' が 10 より大きい場合に 'OK' とコンソールに出力する if文を書いてください。", 
        answer: "const a = 15;\nif (a > 10) {\n  console.log('OK');\n}" 
    }
    // ... 他の問題を追加
];

let currentProblemIndex = 0;

function loadProblem() {
    const problem = problems[currentProblemIndex];
    document.getElementById('question').textContent = problem.question;
    document.getElementById('user-code').value = ''; // 入力欄をクリア
    document.getElementById('result').textContent = '';
}

function checkCode() {
    const problem = problems[currentProblemIndex];
    const userInput = document.getElementById('user-code').value.trim();
    // 比較を簡単にするため、改行やスペースを調整してから比較する方が実用的です
    const expectedAnswer = problem.answer.trim();
    
    const resultElement = document.getElementById('result');
    resultElement.classList.remove('correct', 'incorrect'); // 既存のクラスをクリア

    // シンプルな文字列比較
    if (userInput.replace(/\s+/g, '') === expectedAnswer.replace(/\s+/g, '')) {
        resultElement.textContent = '✅ 正解です！';
        resultElement.classList.add('correct'); // 緑色を適用
        // 次の問題に進むロジックなどをここに追加
        // currentProblemIndex = (currentProblemIndex + 1) % problems.length;
        // loadProblem();
    } else {
        resultElement.textContent = '❌ 不正解です。もう一度確認しましょう。';
        resultElement.classList.add('incorrect'); // 赤色を適用
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadProblem();
    document.getElementById('check-button').addEventListener('click', checkCode);
});